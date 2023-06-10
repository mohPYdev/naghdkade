# Generated by Django 4.1.7 on 2023-06-10 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0002_movie_link_tvseries_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='poster',
            field=models.ImageField(null=True, upload_to='movies/'),
        ),
        migrations.AddField(
            model_name='tvseries',
            name='poster',
            field=models.ImageField(null=True, upload_to='series/'),
        ),
    ]
