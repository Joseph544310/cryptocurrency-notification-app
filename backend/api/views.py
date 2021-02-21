from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from .models import Alert, Currency
from .serializers import UserSerializer, AlertSerializer, LoginSerializer, CurrencySerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


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
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Alert.objects.filter(user=user.id)


class CurrencyList(ListAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = (AllowAny,)

    
# Login API
class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = Token.objects.create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

class LogoutAPI(GenericAPIView):
    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


# @require_POST
# @csrf_exempt
# def login_view(request):
#     body = json.loads(request.body)
#     email = body.get('email')
#     password = body.get('password')

#     if email is None or password is None:
#         return JsonResponse({'Success': False, 'message': 'Please provide email and password.'}, status=400)

#     user = authenticate(email=email, password=password)

#     if user is None:
#         return JsonResponse({'Success': False, 'message': 'Invalid credentials.'}, status=401)

#     login(request, user)
#     return JsonResponse({'success': True})


# def logout_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'Success': False, 'message': 'You\'re not logged in.'}, status=400)

#     logout(request)
#     return JsonResponse({'Success': True})


# def user_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'Success': False})

#     return JsonResponse({'Success': True, 'user': request.user.email})