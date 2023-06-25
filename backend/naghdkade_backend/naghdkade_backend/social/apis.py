from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

from django.core.validators import MinLengthValidator


from naghdkade_backend.api.mixins import ApiAuthMixin
from naghdkade_backend.common.utils import inline_model_serializer

from naghdkade_backend.social.models import User, Follow, Post, Rating, Comment
from naghdkade_backend.cinema.models import Movie, TVSeries

from naghdkade_backend.social.selectors import get_post_list, get_post_detail, get_post_me_list,\
                                                get_post_follower_list, get_post_user_list, get_follow_list,\
                                                get_comment_list, get_rating_list, get_post_movie_list,\
                                                get_post_series_list

from naghdkade_backend.social.services import create_post, delete_post, update_post, create_follow, create_comment,\
                                                delete_follow, create_rating

from naghdkade_backend.social.permissions import IsOwnerOrReadOnly

from .serializers import GeneralMovieSerializer, GeneralSeriesSerializer
from drf_spectacular.utils import extend_schema


class PostApi(ApiAuthMixin, APIView):
    class OutPutPostSerializer(serializers.ModelSerializer):
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username', 'image', 'id']
        )()
        movie = GeneralMovieSerializer()
        tv_series = GeneralSeriesSerializer()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series',)

    class InputPostSerializer(serializers.ModelSerializer):

        class Meta:
            model = Post
            exclude = ['id', 'user', 'created_at']


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
            model_fields=['username', 'image','id' ]
        )()
        movie = GeneralMovieSerializer()
        tv_series = GeneralSeriesSerializer()

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
            model_fields=['username', 'image', 'id' ]
        )()
        movie = GeneralMovieSerializer()
        tv_series = GeneralSeriesSerializer()

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
            model_fields=['username', 'image', 'id' ]
        )()
        movie = GeneralMovieSerializer()
        tv_series = GeneralSeriesSerializer()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie', 'tv_series')


    @extend_schema(responses=OutPutPostFollowerSerializer, tags=['Post'])
    def get(self, request, user_id):
        query = get_post_user_list(user_id = user_id)
        return Response(self.OutPutPostFollowerSerializer(query, many=True, context={"request": request}).data)


class PostMovieApi(ApiAuthMixin, APIView):
    class OutPutPostMovieSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username', 'image', 'id' ]
        )()

        movie = GeneralMovieSerializer()

        class Meta:
            model = Post
            fields = ('id', 'user', 'movie')


    @extend_schema(responses=OutPutPostMovieSerializer, tags=['Post'])
    def get(self, request, movie_id):
        query = get_post_movie_list(movie_id = movie_id)
        return Response(self.OutPutPostMovieSerializer(query, many=True, context={"request": request}).data)


class PostSeriesApi(ApiAuthMixin, APIView):
    class OutPutPostSeriesSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_user_serializer',
            model_fields=['username', 'image', 'id' ]
        )()

        tv_series = GeneralSeriesSerializer()


        class Meta:
            model = Post
            fields = ('id', 'user', 'tv_series')


    @extend_schema(responses=OutPutPostSeriesSerializer, tags=['Post'])
    def get(self, request, series_id):
        query = get_post_series_list(series_id = series_id)
        return Response(self.OutPutPostSeriesSerializer(query, many=True, context={"request": request}).data)


class PostDetailApi(ApiAuthMixin, APIView):
    permission_classes = [IsOwnerOrReadOnly, ]

    class OutPutPostDetailSerializer(serializers.ModelSerializer):

        user = inline_model_serializer(
            serializer_model=User,
            model_fields=['username', 'image', 'id'],
            serializer_name='post_detail_user_serializer'
        )()
        movie = GeneralMovieSerializer()
        tv_series = GeneralSeriesSerializer()


        class Meta:
            model = Post
            fields = ['user', 'movie', 'tv_series', 'content', 'created_at', 'mean_rating']



    class InputPostDetailSerializer(serializers.ModelSerializer):

        class Meta:
            model = Post
            exclude = ['id', 'user', 'created_at', 'tv_series', 'movie']

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



class FollowApi(ApiAuthMixin, APIView):
    class OutPutFollowSerializer(serializers.Serializer):
        
        followers = inline_model_serializer(
            serializer_model=User,
            serializer_name='follower_serializer',
            model_fields=['id', 'username', 'image' ]
        )(many=True)
        
        followings = inline_model_serializer(
            serializer_model=User,
            serializer_name='following_serializer',
            model_fields=['id', 'username', 'image' ]
        )(many=True)


    class InputFollowSerializer(serializers.ModelSerializer):

        class Meta:
            model = Follow
            fields = ['following',]


    @extend_schema(responses=OutPutFollowSerializer, tags=['Follow'])
    def get(self, request):
        query = get_follow_list(user= request.user)
        return Response(self.OutPutFollowSerializer(query, context={"request": request}).data)

    @extend_schema(request=InputFollowSerializer,
                   responses=OutPutFollowSerializer,
                   tags=['Follow'])
    def post(self, request):
        serializer = self.InputFollowSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = create_follow(data=serializer.validated_data, user=request.user)
        if not query:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_201_CREATED)
    

class followDetailApi(ApiAuthMixin, APIView):
    permission_classes = [IsOwnerOrReadOnly, ]

    
    @extend_schema(tags=['Follow'])
    def delete(self, request, user_id):
        query = delete_follow(user_id=user_id, user= request.user)
        if not query:
            return Response('object does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)



class CommentApi(ApiAuthMixin, APIView):
    class OutPutCommentSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_comment_serializer',
            model_fields=['id', 'username', 'image' ]
        )()


        class Meta:
            model = Comment
            fields = ('user', 'content', 'created_at')


    class InputCommentSerializer(serializers.ModelSerializer):

        class Meta:
            model = Comment
            fields = ['content',]


    @extend_schema(responses=OutPutCommentSerializer, tags=['Comment'])
    def get(self, request, post_id):
        query = get_comment_list(user= request.user, post_id= post_id)
        return Response(self.OutPutCommentSerializer(query, many=True, context={"request": request}).data)

    @extend_schema(request=InputCommentSerializer,
                   responses=OutPutCommentSerializer,
                   tags=['Comment'])
    def post(self, request, post_id):
        serializer = self.InputCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = create_comment(data=serializer.validated_data, user=request.user, post_id= post_id)
        return Response(self.OutPutCommentSerializer(query, context={"request": request}).data)
    


class RatingApi(ApiAuthMixin, APIView):
    class OutPutRatingSerializer(serializers.ModelSerializer):
        
        user = inline_model_serializer(
            serializer_model=User,
            serializer_name='post_rating_serializer',
            model_fields=['id', 'username', 'image' ]
        )()


        class Meta:
            model = Rating
            fields = ('user', 'value', )


    class InputRatingSerializer(serializers.ModelSerializer):

        class Meta:
            model = Rating
            fields = ['value',]


    @extend_schema(responses=OutPutRatingSerializer, tags=['Rating'])
    def get(self, request, post_id):
        query = get_rating_list(user= request.user, post_id= post_id)
        return Response(self.OutPutRatingSerializer(query, many=True, context={"request": request}).data)

    @extend_schema(request=InputRatingSerializer,
                   responses=OutPutRatingSerializer,
                   tags=['Rating'])
    def post(self, request, post_id):
        serializer = self.InputRatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = create_rating(data=serializer.validated_data, user=request.user, post_id= post_id)
        return Response(self.OutPutRatingSerializer(query, context={"request": request}).data)
    

