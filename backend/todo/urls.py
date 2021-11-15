from django.urls import path

from .views import ListDoneTodo, ListTodo, DetailTodo


urlpatterns = [
    path('done/', ListDoneTodo.as_view()),
    path('<int:pk>/', DetailTodo.as_view()),
    path('', ListTodo.as_view()),
]
