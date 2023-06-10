
from django.urls import path
from .apis import MovieApi, MovieDetailApi, TVSeriesApi, TVSeriesDetailApi

urlpatterns = [
    path('movies/', MovieApi.as_view(), name="movie-list"),
    path('movies/<int:movie_id>/', MovieDetailApi.as_view(), name="movie-detail"),
   
    path('series/', TVSeriesApi.as_view(), name="series-list"),
    path('series/<int:series_id>/', TVSeriesDetailApi.as_view(), name="series-detail"),
]