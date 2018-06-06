from django.urls import path
from steam.views import *
app_name= 'steam'
urlpatterns=[
        path('adminlogin/',adminlogin,name='adminlogin'),
        path('signup/',signup,name='signup'),
        path('home/',home,name='home'),
        path('login/',login,name='login'),
        ]
