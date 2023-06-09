
from django.urls import path
from .apis import PostApi, PostDetailApi, PostFollowerApi, PostMeApi, PostUserApi,\
                    FollowApi, CommentApi, followDetailApi, RatingApi, PostMovieApi,\
                    PostSeriesApi

urlpatterns = [
    path('posts/', PostApi.as_view(), name="post-list"),
    path('posts/<int:post_id>/', PostDetailApi.as_view(), name="post-detail"),
    path('posts/me/', PostMeApi.as_view(), name="post-me_list"),
    path('posts/following/', PostFollowerApi.as_view(), name="post-following_list"),
    path('posts/user/<int:user_id>/', PostUserApi.as_view(), name="post-user_list"),
    path('posts/movie/<int:movie_id>/', PostMovieApi.as_view(), name="post-movie_list"),
    path('posts/series/<int:series_id>/', PostSeriesApi.as_view(), name="post-series_list"),
    
    path('follow/', FollowApi.as_view(), name="follow_list"),
    path('unfollow/<int:user_id>/', followDetailApi.as_view(), name="follow_detail"),
    
    path('comments/<int:post_id>/', CommentApi.as_view(), name="comment_list"),
    
    path('rating/<int:post_id>/', RatingApi.as_view(), name="rating_list"),

]