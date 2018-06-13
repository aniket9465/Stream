from django.urls import path
from steam.views import *
app_name= 'steam'
urlpatterns=[
        path('signup/',signup,name='signup'),
        path('home/',home,name='home'),
        path('login/',login,name='login'),
        path('adminpageapi/',adminpageapi,name='adminpageapi'),
        ]
