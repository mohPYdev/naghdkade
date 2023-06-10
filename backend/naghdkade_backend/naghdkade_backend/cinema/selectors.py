from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from naghdkade_backend.cinema.models import Movie, TVSeries



def get_movie_list() -> QuerySet:
    return Movie.objects.all()

def get_movie_detail(*, movie_id: int) -> Movie  | None:
    try:
        return Movie.objects.get(id=movie_id)
    except ObjectDoesNotExist as ex:
        return None

def get_series_list() -> QuerySet:
    return TVSeries.objects.all()

def get_series_detail(*, series_id: int) -> TVSeries  | None:
    try:
        return TVSeries.objects.get(id=series_id)
    except ObjectDoesNotExist as ex:
        return None
