from django.urls import path
from .views import *

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<str:pk>', UserDetail.as_view()),
    path('alerts/', AlertList.as_view()),
    path('alerts/<str:pk>', AlertDetail.as_view()),
    path('auth/login', LoginAPI.as_view()),
]