from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    duration = models.PositiveIntegerField()  # Duration in minutes
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title


class TVSeries(models.Model):
    title = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title


class Episode(models.Model):
    title = models.CharField(max_length=100)
    season_number = models.PositiveIntegerField()
    episode_number = models.PositiveIntegerField()
    series = models.ForeignKey(TVSeries, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.series} - S{self.season_number}E{self.episode_number}: {self.title}"
