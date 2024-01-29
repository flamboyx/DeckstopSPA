from django.urls import path, include

from . import api

urlpatterns = [
    path('', api.score_list, name='score_list'),
    path('create/', api.score_create, name='score_create'),
    path('hiscore/', api.get_hiscore, name='get_hiscore'),
]