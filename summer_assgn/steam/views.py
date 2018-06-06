from django.contrib.auth import views,login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
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
            return HttpResponse(authenticate(username=username, password=raw_password))
    else:
        form = UserCreationForm()
    return render(request, 'steam/signup.html', {'form': form})
def adminlogin(request):
    return HttpResponse("still left")

def home(request):
    return render(request,'steam/home.html')

def login(request):
    return HttpResponse("still left")
