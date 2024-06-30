from django.urls import path
from . import views

urlpatterns = [
    path('searchEvents/', views.getEvents),
    path('eventDetails/', views.getEventDetails),
    path('keywordSuggestions/', views.getKeywordSuggestions)
]