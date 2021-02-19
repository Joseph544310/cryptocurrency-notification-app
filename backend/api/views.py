from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Alert
from .serializers import UserSerializer, AlertSerializer


class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
 

class AlertList(ListCreateAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = (IsAuthenticated,)
 
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
 
    def get_queryset(self):
        user = self.request.user
        return Alert.objects.filter(user=user.id)
 

class AlertDetail(RetrieveUpdateDestroyAPIView):
    queryset = Alert.objects.filter(user=request.user.id)
    serializer_class = AlertSerializer
    permission_classes = (IsAuthenticated,)
