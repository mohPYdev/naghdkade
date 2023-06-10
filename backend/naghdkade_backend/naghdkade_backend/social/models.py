from django.contrib.auth.models import AbstractUser
from django.db import models

from naghdkade_backend.cinema.models import Movie, TVSeries
from statistics import mean


class User(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='users/', null=True)


    def __str__(self):
        return self.username


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True)
    tv_series = models.ForeignKey(TVSeries, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post {self.id} by {self.user.username}"
    
    @property
    def mean_rating(self) -> float:
        ratings = Rating.objects.filter(post= self)
        mean = mean([r.value for r in ratings])
        return float(mean)


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"


# class Like(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.user.username} likes Post {self.post.id}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment {self.id} by {self.user.username} on Post {self.post.id}"


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    value = models.IntegerField(choices=[(i, i) for i in range(1, 5)])

    def __str__(self):
        return f"{self.user.username} rates Post {self.post.id} with {self.value}"
    
