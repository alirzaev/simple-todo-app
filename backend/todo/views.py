from rest_framework import generics, permissions

from todo.permissions import IsOwner

from .models import Todo
from .serializers import TodoListSerializer, TodoDetailSerializer


class ListTodo(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    serializer_class = TodoListSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    serializer_class = TodoDetailSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user.id)
