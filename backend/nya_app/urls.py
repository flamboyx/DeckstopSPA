from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('account.urls')),
    path('api/scoreboard/', include('scoreboard.urls')),
    path('admin/', admin.site.urls),
]
