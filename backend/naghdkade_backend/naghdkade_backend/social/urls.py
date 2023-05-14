
from django.urls import path
from .apis import PostApi, PostDetailApi, PostFollowerApi, PostMeApi, PostUserApi

urlpatterns = [
    path('', PostApi.as_view(), name="post-list"),
    path('<int:post_id>/', PostDetailApi.as_view(), name="post-detail"),
    path('me/', PostMeApi.as_view(), name="post-me_list"),
    path('following/', PostFollowerApi.as_view(), name="post-following_list"),
    path('<int:user_id>/', PostUserApi.as_view(), name="post-user_list"),
]