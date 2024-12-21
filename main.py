import numpy as np
import cv2
from pathlib import Path
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score
from keras_facenet import FaceNet
import joblib
import tensorflow as tf
print(tf.__version__)

faces_data_dir = Path('Faces')

embedder = FaceNet()

# Function to extract embeddings from an image
def get_embeddings(image):
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detections = embedder.extract(img_rgb, threshold=0.95)
    return detections[0]['embedding'] if detections else None

# Function to load dataset and extract embeddings
def load_dataset_and_extract_embeddings(data_dir):
    X, y = [], []
    for person_dir in Path(data_dir).iterdir():
        if person_dir.is_dir():
            label = person_dir.name
            image_files = list(person_dir.glob('*.jpg')) + list(person_dir.glob('*.jpeg')) + list(
                person_dir.glob('*.png'))

            for image_path in image_files:
                img = cv2.imread(str(image_path))
                if img is not None:
                    embeddings = get_embeddings(img)
                    if embeddings is not None:
                        X.append(embeddings)
                        y.append(label)
                    else:
                        print(f"Warning: No embedding found for {image_path}")
                else:
                    print(f"Warning: Unable to read {image_path}")
    return np.array(X), np.array(y)

# Load dataset and extract embeddings
X, y = load_dataset_and_extract_embeddings(faces_data_dir)
print(f"Loaded {len(X)} samples and {len(np.unique(y))} unique labels.")

if X.size == 0 or y.size == 0:
    print("There was an issue with the embedded data set.")
else:
    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    print(f"Encoded labels: {np.unique(y_encoded)}")  # Check encoded labels

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=123)

    # Grid search for hyperparameter tuning
    param_grid = {'C': [0.1, 1, 10, 100], 'kernel': ['linear', 'rbf']}
    grid = GridSearchCV(SVC(probability=True), param_grid, refit=True, verbose=1)
    grid.fit(X_train, y_train)

    # Train the SVM model
    svm_model = grid.best_estimator_
    y_pred = svm_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy of the model: {accuracy * 100:.2f}%")

    # Save the model and label encoder
    joblib.dump(svm_model, 'svm_face_recognition_model.pkl')
    joblib.dump(label_encoder, 'label_encoder.pkl')

# Real-time face recognition
def real_time_face_recognition():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("There was an error opening the webcam.")
        return

    # Load saved model and label encoder
    svm_model = joblib.load('svm_face_recognition_model.pkl')
    label_encoder = joblib.load('label_encoder.pkl')

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Couldn't find the frame")
            break

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        detections = embedder.extract(img_rgb, threshold=0.95)

        for detection in detections:
            x1, y1, width, height = detection['box']
            x2, y2 = x1 + width, y1 + height
            embedding = detection['embedding']

            # Predict the label
            predictions = svm_model.predict_proba([embedding])[0]
            predicted_index = np.argmax(predictions)
            predicted_class = label_encoder.inverse_transform([predicted_index])[0]
            confidence = predictions[predicted_index]

            # Draw rectangle and display label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            label = f"{predicted_class} ({confidence * 100:.2f}%)"
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

        cv2.imshow('Real-Time Face Recognition', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Function to test with a single image
def test_single_image(image_path):
    # Load saved model and label encoder
    svm_model = joblib.load('svm_face_recognition_model.pkl')
    label_encoder = joblib.load('label_encoder.pkl')

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
test_image_path = 'Deniz.jpg'  # Replace with your test image path
test_single_image(test_image_path)

# Uncomment the following line to run real-time face recognition
# real_time_face_recognition()
