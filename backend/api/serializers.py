from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['id', 'currency', 'direction', 'type', 'amount']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    alerts = serializers.StringRelatedField(many=True, read_only=True)
 
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'alerts']
 
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
 
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")