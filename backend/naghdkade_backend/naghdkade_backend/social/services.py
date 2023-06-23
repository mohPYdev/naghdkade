from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist


from naghdkade_backend.social.models import User, Post, Follow, Comment, Rating
from naghdkade_backend.cinema.models import Movie, TVSeries
from naghdkade_backend.common.utils import update_model_instance


# post services

@transaction.atomic()
def create_post(*, data: dict(),  user: User ) -> Post:
    
    post = Post.objects.create(**data, user=user)
    return post

@transaction.atomic()
def update_post(*, instance: Post, data: dict() ) -> Post:   
    return update_model_instance(instance=instance, data=data)


@transaction.atomic
def delete_post(*, post_id: int) -> None:
    try:
        return Post.objects.get(id=post_id).delete()
    except ObjectDoesNotExist:
        return None
    

@transaction.atomic()
def create_follow(*, data: dict(),  user: User ) -> Follow:
    
    follow = Follow.objects.create(**data, follower=user)
    return follow


@transaction.atomic
def delete_follow(*, user_id: int, user: User) -> None:
    try:
        following = User.objects.get(id=user_id)
        return Follow.objects.get(follower= user, following=following).delete()
    except ObjectDoesNotExist:
        return None
    

@transaction.atomic()
def create_comment(*, data: dict(),  user: User, post_id: int ) -> Comment:
    
    post = Post.objects.get(id= post_id)
    comment = Comment.objects.create(**data, post= post, user=user)
    return comment


@transaction.atomic()
def create_rating(*, data: dict(),  user: User, post_id: int ) -> Rating:
    
    post = Post.objects.get(id= post_id)
    rating = Rating.objects.create(**data, post= post, user=user)
    return rating


