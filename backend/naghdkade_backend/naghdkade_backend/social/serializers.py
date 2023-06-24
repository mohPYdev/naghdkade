from djoser.serializers import UserSerializer
from rest_framework import serializers

from .models import User

class CustomUserSerializer(UserSerializer):
    image = serializers.ImageField()

    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name','bio', 'image')
