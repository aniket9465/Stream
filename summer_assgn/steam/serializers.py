from rest_framework import serializers
from django.contrib.auth.models import User
from  steam.models import hosts
class userserializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','is_staff','is_active')
class onlinehostsserializer(serializers.ModelSerializer):
    class Meta:
        model=hosts
        fields=("__all__")
