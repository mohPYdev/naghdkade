from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

from django.core.validators import MinLengthValidator


from naghdkade_backend.api.mixins import ApiAuthMixin
from naghdkade_backend.common.utils import inline_model_serializer

from naghdkade_backend.social.models import User, Follow, Post, Like, Rating, Goal
from naghdkade_backend.cinema.models import Movie, TVSeries

from naghdkade_backend.social.selectors import get_post_list, get_post_detail, get_post_me_list,\
                                                get_post_follower_list, get_post_user_list
from naghdkade_backend.social.services import create_post, delete_post, update_post

from naghdkade_backend.social.permissions import IsOwnerOrReadOnly


from drf_spectacular.utils import extend_schema


class PostApi(ApiAuthMixin, APIView):
    class OutPutPostSerializer(serializers.ModelSerializer):
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username',  ]
        )()
        movie = inline_model_serializer(
            serializer_model=Movie,
            serializer_name='post_movie_serializer',
            model_fields=['title', 'genres']
        )()
        tv_series = inline_model_serializer(
            serializer_model=TVSeries,
            serializer_name='post_series_serializer',
            model_fields=['title', 'genres']
        )()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series')

    class InputPostSerializer(serializers.ModelSerializer):

        class Meta:
            model = Post
            exclude = ['id', 'user', 'created_at', 'movie', 'tv_series']


    @extend_schema(responses=OutPutPostSerializer, tags=['Post'])
    def get(self, request):
        query = get_post_list()
        return Response(self.OutPutPostSerializer(query, many=True, context={"request": request}).data)

    @extend_schema(request=InputPostSerializer,
                   responses=OutPutPostSerializer,
                   tags=['Post'])
    def post(self, request):
        serializer = self.InputPostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = create_post(data=serializer.validated_data, user=request.user)
        return Response(self.OutPutPostSerializer(post, context={"request": request}).data)


class PostMeApi(ApiAuthMixin, APIView):
    class OutPutPostMeSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username',  ]
        )()
        movie = inline_model_serializer(
            serializer_model=Movie,
            serializer_name='post_movie_serializer',
            model_fields=['title', 'genres']
        )()
        tv_series = inline_model_serializer(
            serializer_model=TVSeries,
            serializer_name='post_series_serializer',
            model_fields=['title', 'genres']
        )()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series')


    @extend_schema(responses=OutPutPostMeSerializer, tags=['Post'])
    def get(self, request):
        query = get_post_me_list(user= request.user)
        return Response(self.OutPutPostMeSerializer(query, many=True, context={"request": request}).data)


class PostFollowerApi(ApiAuthMixin, APIView):
    class OutPutPostFollowerSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username',  ]
        )()
        movie = inline_model_serializer(
            serializer_model=Movie,
            serializer_name='post_movie_serializer',
            model_fields=['title', 'genres']
        )()
        tv_series = inline_model_serializer(
            serializer_model=TVSeries,
            serializer_name='post_series_serializer',
            model_fields=['title', 'genres']
        )()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series')


    @extend_schema(responses=OutPutPostFollowerSerializer, tags=['Post'])
    def get(self, request):
        query = get_post_follower_list(user = request.user)
        return Response(self.OutPutPostFollowerSerializer(query, many=True, context={"request": request}).data)


class PostUserApi(ApiAuthMixin, APIView):
    class OutPutPostFollowerSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username',  ]
        )()
        movie = inline_model_serializer(
            serializer_model=Movie,
            serializer_name='post_movie_serializer',
            model_fields=['title', 'genres']
        )()
        tv_series = inline_model_serializer(
            serializer_model=TVSeries,
            serializer_name='post_series_serializer',
            model_fields=['title', 'genres']
        )()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series')


    @extend_schema(responses=OutPutPostFollowerSerializer, tags=['Post'])
    def get(self, request, user_id):
        query = get_post_user_list(user_id = user_id)
        return Response(self.OutPutPostFollowerSerializer(query, many=True, context={"request": request}).data)


class PostDetailApi(ApiAuthMixin, APIView):
    permission_classes = [IsOwnerOrReadOnly, ]

    class OutPutPostDetailSerializer(serializers.ModelSerializer):

        user = inline_model_serializer(
            serializer_model=User,
            model_fields=['username', ],
            serializer_name='post_detail_user_serializer'
        )()
        movie = inline_model_serializer(
            serializer_model=Movie,
            model_fields=['title', 'release_date', 'genres'],
            serializer_name='post_detail_movie_serializer'
        )()
        tv_series = inline_model_serializer(
            serializer_model=TVSeries,
            model_fields=['title', 'start_date', 'genres' ],
            serializer_name='post_detail_series_serializer'
        )()

        class Meta:
            model = Post
            fields = ['user', 'movie', 'tv_series', 'content', 'created_at']



    class InputPostDetailSerializer(serializers.ModelSerializer):

        class Meta:
            model = Post
            exclude = ['id', 'user', 'created_at']

    @extend_schema(responses=OutPutPostDetailSerializer, tags=['Post'])
    def get(self, request, post_id):
        query = get_post_detail(post_id=post_id)
        if not query:
            return Response('object does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response(self.OutPutPostDetailSerializer(query, context={"request": request}).data)

    @extend_schema(tags=['Post'])
    def delete(self, request, post_id):
        query = delete_post(post_id=post_id)
        if not query:
            return Response('object does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(request=InputPostDetailSerializer,
                   responses=OutPutPostDetailSerializer,
                   tags=['Post'])
    def put(self, request, post_id):

        serializer = self.InputPostDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = get_post_detail(post_id)

        if not post:
            return Response("No post found with this id", status=status.HTTP_404_NOT_FOUND)

        updated_post = update_post(instance=post, data=serializer.validated_data)
        return Response(self.OutPutPostDetailSerializer(updated_post, context={"request": request}).data)

