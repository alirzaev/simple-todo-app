from django.db.models import fields
from rest_framework import serializers

from .models import Todo


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo

        fields = ('id', 'title', 'created_at', 'updated_at',)


class TodoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo

        fields = ('id', 'title', 'body', 'created_at', 'updated_at',)
