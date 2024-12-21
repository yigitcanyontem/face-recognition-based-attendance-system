import cv2
import joblib
import numpy as np
from keras_facenet import FaceNet

# Load the trained SVM model and label encoder
svm_model = joblib.load('svm_face_recognition_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# Initialize FaceNet for embedding extraction
embedder = FaceNet()

# Function to extract embeddings from an image
def get_embeddings(image):
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detections = embedder.extract(img_rgb, threshold=0.95)
    return detections[0]['embedding'] if detections else None

# Function to test with a single image
def test_single_image(image_path):
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        print("Error: Unable to load the image.")
        return

    # Get the embedding for the image
    embedding = get_embeddings(img)
    if embedding is None:
        print("No face detected in the image.")
        return

    # Predict the label
    predictions = svm_model.predict_proba([embedding])[0]
    predicted_index = np.argmax(predictions)
    predicted_class = label_encoder.inverse_transform([predicted_index])[0]
    confidence = predictions[predicted_index]

    print(f"Predicted: {predicted_class} with {confidence * 100:.2f}% confidence")

# Test image
test_image_path = 'test/enis2.png'  # Replace with your test image path
test_single_image(test_image_path)
