<<<<<<< HEAD
# Generated by Django 4.1.7 on 2023-06-25 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0003_movie_poster_tvseries_poster'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='summary',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tvseries',
            name='summary',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
=======
# Generated by Django 4.0.7 on 2023-06-25 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0003_movie_poster_tvseries_poster'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='summary',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tvseries',
            name='summary',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
>>>>>>> a648375e0b7b8c8fc490d5a53610cafa3b0aa51f
