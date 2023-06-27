from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from naghdkade_backend.common.utils import inline_model_serializer
from naghdkade_backend.api.mixins import ApiAuthMixin

from naghdkade_backend.cinema.models import Movie, TVSeries, Genre

from naghdkade_backend.cinema.selectors import get_movie_list, get_series_list, get_movie_detail, get_series_detail

from drf_spectacular.utils import extend_schema


class MovieApi(ApiAuthMixin, APIView):

    class OutPutMovieSerializer(serializers.ModelSerializer):

        class Meta:
            model = Movie
            fields = ('id', 'title', 'release_date', 'poster')


    @extend_schema(responses=OutPutMovieSerializer, tags=['Movie'])
    def get(self, request):
        query = get_movie_list()
        return Response(self.OutPutMovieSerializer(query, many=True, context={"request": request}).data)



class MovieDetailApi(ApiAuthMixin, APIView):

    class OutPutMovieDetailSerializer(serializers.ModelSerializer):

        genres = inline_model_serializer(
            serializer_model=Genre,
            serializer_name='genre_movie_serializer',
            model_fields=['name',]
        )(many=True)


        class Meta:
            model = Movie
            fields = ['title', 'release_date', 'genres', 'duration', 'link', 'poster', 'summary']


    @extend_schema(responses=OutPutMovieDetailSerializer, tags=['Movie'])
    def get(self, request, movie_id):
        query = get_movie_detail(movie_id=movie_id)
        if not query:
            return Response('object does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response(self.OutPutMovieDetailSerializer(query, context={"request": request}).data)


class TVSeriesApi(ApiAuthMixin, APIView):
    class OutPutSeriesSerializer(serializers.ModelSerializer):

        class Meta:
            model = TVSeries
            fields = ('id', 'title', 'start_date', 'poster')


    @extend_schema(responses=OutPutSeriesSerializer, tags=['Series'])
    def get(self, request):
        query = get_series_list()
        return Response(self.OutPutSeriesSerializer(query, many=True, context={"request": request}).data)



class TVSeriesDetailApi(ApiAuthMixin, APIView):

    class OutPutSeriesDetailSerializer(serializers.ModelSerializer):

        genres = inline_model_serializer(
            serializer_model=Genre,
            serializer_name='genre_movie_serializer',
            model_fields=['name',]
        )(many=True)

        class Meta:
            model = TVSeries
            fields = ['title', 'start_date', 'end_date', 'genres', 'link', 'poster', 'summary']


    @extend_schema(responses=OutPutSeriesDetailSerializer, tags=['Series'])
    def get(self, request, series_id):
        query = get_series_detail(series_id=series_id)
        if not query:
            return Response('object does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response(self.OutPutSeriesDetailSerializer(query, context={"request": request}).data)


