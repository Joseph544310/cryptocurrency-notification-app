from django.urls import path
from views import *

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<str:pk>', views.UserDetail.as_view()),
    path('alerts/', views.AlertList.as_view()),
    path('alerts/<str:pk>', views.AlertDetail.as_view()),
    
]