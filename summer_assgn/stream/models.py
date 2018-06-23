from django.db import models

# Create your models here.
class hosts(models.Model):
    uname=models.CharField(max_length=100)
