from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist


from naghdkade_backend.social.models import User, Post
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