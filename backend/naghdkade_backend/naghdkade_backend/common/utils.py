from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.core.exceptions import ImproperlyConfigured

from django.db.models import Model
from rest_framework.utils import model_meta

from rest_framework import serializers


def make_mock_object(**kwargs):
    return type("", (object, ), kwargs)


def get_object(model_or_queryset, **kwargs):
    """
    Reuse get_object_or_404 since the implementation supports both Model && queryset.
    Catch Http404 & return None
    """
    try:
        return get_object_or_404(model_or_queryset, **kwargs)
    except Http404:
        return None


def create_serializer_class(name, fields):
    return type(name, (serializers.Serializer, ), fields)


def inline_serializer(*, fields, data=None, **kwargs):
    serializer_class = create_serializer_class(name='', fields=fields)

    if data is not None:
        return serializer_class(data=data, **kwargs)

    return serializer_class(**kwargs)


def assert_settings(required_settings, error_message_prefix=""):
    """
    Checks if each item from `required_settings` is present in Django settings
    """
    not_present = []
    values = {}

    for required_setting in required_settings:
        if not hasattr(settings, required_setting):
            not_present.append(required_setting)
            continue

        values[required_setting] = getattr(settings, required_setting)

    if not_present:
        if not error_message_prefix:
            error_message_prefix = "Required settings not found."

        stringified_not_present = ", ".join(not_present)

        raise ImproperlyConfigured(f"{error_message_prefix} Could not find: {stringified_not_present}")

    return values



def inline_model_serializer(*, serializer_model: Model, serializer_name: str, model_fields: list | str,
                            serializer_custom_fields: dict | None = None):
    if serializer_custom_fields:
        serializer_custom_fields['Meta'] = type('Meta', (object,), {"model": serializer_model, 'fields': model_fields})
    else:
        serializer_custom_fields = {'Meta': type('Meta', (object,), {"model": serializer_model, 'fields': model_fields})}

    serializer_class = type(serializer_name, (serializers.ModelSerializer,), serializer_custom_fields)

    return serializer_class


def update_model_instance(*, instance: Model, data: dict) -> Model:
    """Updates given model instance using given data"""
    info = model_meta.get_field_info(instance)

    many_to_many_fields = []
    for attr, value in data.items():
        if attr in info.relations and info.relations[attr].to_many:
            many_to_many_fields.append((attr, value))
        else:
            setattr(instance, attr, value)

    instance.save()

    for attr, value in many_to_many_fields:
        field = getattr(instance, attr)
        field.set(value)

    return instance


def create_models_with_many_to_many_fields(*, model: Model, validated_data: dict):
    """Saves many to many fields of given model instance from given data"""

    info = model_meta.get_field_info(model)
    many_to_many = {}
    for field_name, relation_info in info.relations.items():
        if relation_info.to_many and (field_name in validated_data):
            many_to_many[field_name] = validated_data.pop(field_name)

    instance = model.objects.create(**validated_data)

    if many_to_many:
        for field_name, value in many_to_many.items():
            field = getattr(instance, field_name)
            field.set(value)

    return instance
