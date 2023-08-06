from django.urls import path, include
from rest_framework import routers
from .views import MascotaView, AlergiasView

router = routers.DefaultRouter()

router.register(r'Mascotas', MascotaView)
router.register(r'Alergias', AlergiasView)

urlpatterns = [
    path('API/', include(router.urls))
]
