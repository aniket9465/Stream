from django.conf.urls import url
from django.urls import path
from . import consumers
websocket_urlpatterns = [
        url('onlinehosts/',consumers.onlinehosts),
        url('videoplayer/',consumers.videoplayer),
        ]
