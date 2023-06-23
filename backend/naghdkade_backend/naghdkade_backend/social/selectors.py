from collections import namedtuple

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from naghdkade_backend.cinema.models import Movie, TVSeries
from naghdkade_backend.social.models import User, Post, Comment, Follow, Rating



def get_post_list() -> QuerySet:
    return Post.objects.all().order_by('created_at')[:20]

def get_post_detail(*, post_id: int) -> Post  | None:
    try:
        return Post.objects.get(id=post_id)
    except ObjectDoesNotExist as ex:
        return None
    
def get_post_me_list(*, user : User):
    return Post.objects.filter(user= user)

def get_post_follower_list(*, user: User):
    followings = user.followings.all()
    following_users = User.objects.filter(followers__in=followings)

    return Post.objects.filter(user__in= following_users)

def get_post_movie_list(*, user : User, movie_id: int):
    return Post.objects.filter(movie__id= movie_id)

def get_post_series_list(*, user : User, series_id:int):
    return Post.objects.filter(tv_series__id= series_id)

def get_post_user_list(*, user_id):
    user = User.objects.get(id= user_id)

    return Post.objects.filter(user= user)


def get_follower_list(*, user):
    followers = user.followers.all()
    follower_users = User.objects.filter(followings__in=followers)
    return follower_users

def get_following_list(*, user):
    followings = user.followings.all()
    following_users = User.objects.filter(followers__in=followings)
    return following_users

def get_follow_list(*, user: User):
    
    followers = get_follower_list(user)
    followings = get_following_list(user)

    query = {
        'followers': followers,
        'followings': followings
    }

    return query


def get_comment_list(*, user: User, post_id: int):

    return Comment.objects.filter(post__id= post_id)

def get_rating_list(*, user: User, post_id: int):

    return Rating.objects.filter(post__id= post_id)