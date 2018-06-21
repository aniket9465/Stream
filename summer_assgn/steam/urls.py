from django.urls import path
from steam.views import *
app_name= 'steam'
urlpatterns=[
        path('signup/',signup,name='signup'),
        path('home/',home,name='home'),
        path('home2/',home2,name='home2'),
        path('login/',login,name='login'),
        path('adminpageapi/',adminpageapi,name='adminpageapi'),
        path('approveuserapi/',approveuserapi,name='approveuserapi'),
        path('deleteuserapi/',deleteuserapi,name='deleteuserapi'),
        path('makehost/',makehost,name='makehost'),
        path('removehost/',removehost,name='removehost'),
        ]
