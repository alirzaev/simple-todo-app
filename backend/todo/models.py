from django.contrib.auth import get_user_model
from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200)

    body = models.TextField(default='')

    created_at = models.DateTimeField(auto_now_add=True)
    
    updated_at = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title
