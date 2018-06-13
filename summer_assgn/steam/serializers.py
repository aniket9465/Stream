from rest_framework import serializers
from django.contrib.auth.models import User
class userserializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','is_staff','is_active')
