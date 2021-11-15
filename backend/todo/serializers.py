from django.db.models import fields
from rest_framework import serializers

from .models import Todo


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo

        fields = ('id', 'title', 'done', 'rank', 'created_at', 'updated_at',)


class TodoDetailSerializer(serializers.ModelSerializer):
    body = serializers.CharField(allow_blank=True)

    class Meta:
        model = Todo

        fields = ('id', 'title', 'body', 'done', 'rank', 'created_at', 'updated_at',)


class TodoRankListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    
    class Meta:
        model = Todo

        fields = ('id', 'rank',)
