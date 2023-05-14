from django.urls import path, include

urlpatterns = [
    path('social/', include(('naghdkade_backend.social.urls', 'social')))
]
