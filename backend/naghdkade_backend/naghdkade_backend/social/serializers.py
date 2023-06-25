from djoser.serializers import UserSerializer
from rest_framework import serializers

from .models import User
from naghdkade_backend.cinema.models import *

from naghdkade_backend.common.utils import inline_model_serializer



class CustomUserSerializer(UserSerializer):
    image = serializers.ImageField()

    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name','bio', 'image')


class GeneralMovieSerializer(serializers.ModelSerializer):

    genres = inline_model_serializer(
        serializer_model= Genre,
        serializer_name= 'generalGenreSerializer',
        model_fields=('name',)
    )(many=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genres', 'release_date')


class GeneralSeriesSerializer(serializers.ModelSerializer):

    genres = inline_model_serializer(
        serializer_model= Genre,
        serializer_name= 'generalGenreSerializer',
        model_fields=('name',)
    )(many=True)

    class Meta:
        model = TVSeries
        fields = ('id', 'title', 'genres', 'start_date')