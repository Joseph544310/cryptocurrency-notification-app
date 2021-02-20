from rest_framework import serializers
from .models import Alert, User


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['title']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    alerts = serializers.StringRelatedField(many=True, read_only=True)
 
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'alerts']
 
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
 
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        instance.set_password(password)
        instance.save()
        return instance