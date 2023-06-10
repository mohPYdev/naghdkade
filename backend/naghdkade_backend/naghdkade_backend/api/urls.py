from django.urls import path, include

urlpatterns = [
    path('social/', include(('naghdkade_backend.social.urls', 'social'))),
    path('cinema/', include(('naghdkade_backend.cinema.urls', 'cinema'))),
]
