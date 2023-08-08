from django.urls import path, include
from rest_framework import routers
from .views import UserDuenoView, UserVetView

router = routers.DefaultRouter()

router.register(r'User_Dueño', UserDuenoView)
router.register(r'User_Vet', UserVetView)

urlpatterns = [
    path('API/', include(router.urls))
]