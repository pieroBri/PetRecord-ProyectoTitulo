from django.urls import path, include
from rest_framework import routers
from .views import VeterinariaView, FranquiciaView, InsumosView, CalendarioView, FechasSolicitadasView, TablaMedicaView, RegistroDeOperacionesView, RegistroVacunasSuministradasView

router = routers.DefaultRouter()

router.register(r'veterinarias', VeterinariaView)
router.register(r'franquicias', FranquiciaView)
router.register(r'insumos', InsumosView)
router.register(r'calendarios', CalendarioView)
router.register(r'fechas-solicitadas', FechasSolicitadasView)
router.register(r'tablas-medicas', TablaMedicaView)
router.register(r'registros-operaciones', RegistroDeOperacionesView)
router.register(r'registros-vacunas-suministradas', RegistroVacunasSuministradasView)

urlpatterns = [
    path("API/", include(router.urls))
]
