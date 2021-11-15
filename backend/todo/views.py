from django.db.transaction import atomic

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from todo.permissions import IsOwner

from .models import Todo
from .serializers import TodoListSerializer, TodoDetailSerializer, TodoRankListSerializer


class ListTodo(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    serializer_class = TodoListSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id, done=False).order_by('-rank')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ListDoneTodo(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    serializer_class = TodoListSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id, done=True)


class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    serializer_class = TodoDetailSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id)


class RankListTodo(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    @atomic
    def put(self, request, format=None):
        ranks = TodoRankListSerializer(data=request.data, many=True)
        ranks.is_valid(raise_exception=True)

        updates = []
        for obj in ranks.validated_data:
            todo = Todo.objects.get(pk=obj['id'])
            todo.rank = obj['rank']
            updates.append(todo)
        Todo.objects.bulk_update(updates, ['rank'])

        return Response(status=status.HTTP_204_NO_CONTENT)
