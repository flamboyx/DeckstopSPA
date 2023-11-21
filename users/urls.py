from django.urls import path
from users import views as usersView

urlpatterns = [
    path('login/', usersView.login, name='login')
]
