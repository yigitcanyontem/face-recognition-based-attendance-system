from django.urls import path
from . import views

urlpatterns = [
    path('/detect', views.detect, name='detect'),
    path('/auth/login', views.login, name='login'),
]
