# Generated by Django 4.0.7 on 2023-06-25 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0005_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='value',
            field=models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]),
        ),
    ]
