from django.contrib.auth import views,login as loginu, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.shortcuts import render, redirect
from steam.models import hosts
from django.http import HttpResponse,JsonResponse
from steam.serializers import userserializer
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.sessions.backends.db import SessionStore
from inspect import getmembers
from pprint import pprint
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            user.is_active=False
            user.save()
            return redirect(home)
    else:
        form = UserCreationForm()
    return render(request, 'steam/signup.html', {'form': form})

def home(request):
    return render(request,'steam/home.html')

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=raw_password)
            loginu(request,user)
            request.session['username']=username
            return redirect('steam:home2')
    else:
        form = AuthenticationForm()
    return render(request, 'steam/login.html', {'form': form})

def home2(request):
    return render(request,'steam/home2.html')

@method_decorator(csrf_exempt)
def adminpageapi(request):
    j=json.loads(request.body);
    ssid=j['sessionid']
    s=SessionStore(session_key=ssid)
    print(s['username'])
    serializer=userserializer(User.objects.all().filter(~Q(username=s['username'])),many=True)
    print(serializer.data)
    return JsonResponse(serializer.data,safe=False)

@method_decorator(csrf_exempt)
def approveuserapi(request):
    j=json.loads(request.body)
    uname=j['uname']
    user=User.objects.get(username=uname)
    user.is_active=True
    user.save()
    print(user)
    return HttpResponse('')

@method_decorator(csrf_exempt)
def deleteuserapi(request):
    j=json.loads(request.body)
    uname=j['uname']
    user=User.objects.get(username=uname)
    user.delete()
    print("hi")
    return HttpResponse('')

@method_decorator(csrf_exempt)
def makehost(request):
    j=json.loads(request.body);
    ssid=j['sessionid']
    s=SessionStore(session_key=ssid)
    h1=hosts(uname=s['username'])
    h1.save()
    return HttpResponse('')

@method_decorator(csrf_exempt)
def removehost(request):
    j=json.loads(request.body);
    ssid=j['sessionid']
    s=SessionStore(session_key=ssid)
    h1=hosts.objects.get(uname=s['username'])
    h1.delete()
    return HttpResponse('')
                              
