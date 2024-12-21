from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import base64
import cv2
import numpy as np
import joblib
from keras_facenet import FaceNet
import os
from django.http import JsonResponse


# Create your views here.
pklPath = os.path.join(os.path.dirname(__file__), 'svm_face_recognition_model.pkl')
labelEncoderPath = os.path.join(os.path.dirname(__file__), 'label_encoder.pkl')
svm_model = joblib.load(pklPath)
label_encoder = joblib.load(labelEncoderPath)
embedder = FaceNet()


@api_view(['POST'])
def detect(request):
    try:
        # Parse JSON data
        data = request.data
        image_base64 = data.get("image")
        if not image_base64:
            return Response({"error": "No image provided."}, status=400)

        # Decode the image
        image = decode_image(image_base64)

        # Get the embedding
        embedding = get_embeddings(image)
        if embedding is None:
            return Response({"error": "No face detected."}, status=400)

        # Predict the label
        predictions = svm_model.predict_proba([embedding])[0]
        predicted_index = np.argmax(predictions)
        predicted_class = label_encoder.inverse_transform([predicted_index])[0]
        confidence = predictions[predicted_index]

        if confidence < 0.5:
            return JsonResponse({
                "predicted_class": "Unknown",
                "confidence": confidence * 100,
            })


        return JsonResponse({
            "predicted_class": predicted_class,
            "confidence": confidence * 100,
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_embeddings(image):
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detections = embedder.extract(img_rgb, threshold=0.95)
    return detections[0]['embedding'] if detections else None


def decode_image(image_base64):
    img_data = base64.b64decode(image_base64.split(",")[1])
    np_array = np.frombuffer(img_data, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image
