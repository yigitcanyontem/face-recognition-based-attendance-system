from django.urls import path
from .views import FaceRecognitionAPIView

urlpatterns = [
    path('api/face-recognition/', FaceRecognitionAPIView.as_view(), name='face-recognition'),
]
