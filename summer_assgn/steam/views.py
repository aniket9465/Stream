from django.contrib.auth import views,login as loginu, authenticate
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
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
            return home2(request)
    else:
        form = AuthenticationForm()
    return render(request, 'steam/login.html', {'form': form})

def home2(request):
    return render(request,'steam/home2.html')
