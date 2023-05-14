from collections import namedtuple

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from naghdkade_backend.cinema.models import Movie, TVSeries
from naghdkade_backend.social.models import User, Post



def get_post_list() -> QuerySet:
    return Post.objects.all()

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

def get_post_user_list(*, user_id):
    user = User.objects.get(id= user_id)

    return Post.objects.filter(user= user)