from rest_framework import routers
from django.urls import path, include
from .views import FichaHospitalizacionView, FichaMedicaView, FichaOperacionView, FichasedacionView, MedicamentosConsultaView, RecetaMedicaView, TablaMedicaView, TratamientosConsultaView, VacunasSuministradasConsultaView

router = routers.DefaultRouter()

router.register(r'Fichas_hospitalización', FichaHospitalizacionView)
router.register(r'Fichas_medicas', FichaMedicaView)
router.register(r'Fichas_operación', FichaOperacionView)
router.register(r'Fichas_sedación', FichasedacionView)
router.register(r'Medicamentos_consultas', MedicamentosConsultaView)
router.register(r'Recetas_medicas', RecetaMedicaView)
router.register(r'Tablas_medicas', TablaMedicaView)
router.register(r'Tratamientos_consultas', TratamientosConsultaView)
router.register(r'Vacunas_suministradas_consultas', VacunasSuministradasConsultaView)

urlpatterns = [
    path('API/', include(router.urls))
]