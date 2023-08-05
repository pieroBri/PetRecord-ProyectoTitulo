from rest_framework import routers
from django.urls import path, include
from .views import FichaHospitalizacionView, FichaMedicaView, FichaOperacionView, FichasedacionView, MedicamentosConsultaView, RecetaMedicaView, TablaMedicaView, TratamientosConsultaView, VacunasSuministradasConsultaView

router = routers.DefaultRouter()

router.register(r'FichasHospitalizacion', FichaHospitalizacionView)
router.register(r'FichasMedica', FichaMedicaView)
router.register(r'FichasOperacion', FichaOperacionView)
router.register(r'FichasSedacion', FichasedacionView)
router.register(r'MedicamentosConsultas', MedicamentosConsultaView)
router.register(r'RecetasMedica', RecetaMedicaView)
router.register(r'TablasMedica', TablaMedicaView)
router.register(r'TratamientosConsultas', TratamientosConsultaView)
router.register(r'VacunasSuministradasConsultas', VacunasSuministradasConsultaView)

urlpatterns = [
    path('API/', include(router.urls))
]