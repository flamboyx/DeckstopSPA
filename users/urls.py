from django.urls import path
from users import views as usersView

urlpatterns = [
    path('', usersView.login, name='login')
]
