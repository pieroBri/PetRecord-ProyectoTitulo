from django.urls import path, include
from rest_framework import routers
from .views import VeterinariaView, FranquiciaView, InsumosView, MedicamentosView, FechasCalendarioView, TablaMedicaView, RegistroDeOperacionesView, RegistroVacunasSuministradasView, RegistroDeVentasView, ProductosVentaView

router = routers.DefaultRouter()

router.register(r'Veterinarias', VeterinariaView)
router.register(r'Franquicias', FranquiciaView)
router.register(r'Insumos', InsumosView)
router.register(r'Medicamentos', MedicamentosView)
router.register(r'Fechas_calendarios', FechasCalendarioView)
router.register(r'Tablas_medicas', TablaMedicaView)
router.register(r'Registros_operaciones', RegistroDeOperacionesView)
router.register(r'Registros_vacunas_suministradas', RegistroVacunasSuministradasView)
router.register(r'Registros_de_ventas', RegistroDeVentasView)
router.register(r'Productos_venta', ProductosVentaView)

urlpatterns = [
    path("API/", include(router.urls))
]
