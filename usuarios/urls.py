from django.urls import path, include
from rest_framework import routers
from .views import UserDuenoView, UserVetView

router = routers.DefaultRouter()

router.register(r'UserDueño', UserDuenoView)
router.register(r'UserVet', UserVetView)

urlpatterns = [
    path('API/', include(router.urls))
]