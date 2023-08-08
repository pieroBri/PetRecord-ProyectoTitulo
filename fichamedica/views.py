from rest_framework import viewsets
from .models import FichaHospitalizacion, FichaMedica, FichaOperacion, Fichasedacion, MedicamentosConsulta, RecetaMedica, TablaMedica, TratamientosConsulta, VacunasSuministradasConsulta
from .serializer import FichaHospitalizacionSerializer, FichaMedicaSerializer, FichaOperacionSerializer, FichasedacionSerializer, MedicamentosConsultaSerializer, RecetaMedicaSerializer, TablaMedicaSerializer, TratamientosConsultaSerializer, VacunasSuministradasConsultaSerializer
# Create your views here.

class FichaHospitalizacionView(viewsets.ModelViewSet):
    serializer_class = FichaHospitalizacionSerializer
    queryset = FichaHospitalizacion.objects.all()

class FichaMedicaView(viewsets.ModelViewSet):
    serializer_class = FichaMedicaSerializer
    queryset = FichaMedica.objects.all()

class FichaOperacionView(viewsets.ModelViewSet):
    serializer_class = FichaOperacionSerializer
    queryset = FichaOperacion.objects.all()

class FichasedacionView(viewsets.ModelViewSet):
    serializer_class = FichasedacionSerializer
    queryset = Fichasedacion.objects.all()

class MedicamentosConsultaView(viewsets.ModelViewSet):
    serializer_class = MedicamentosConsultaSerializer
    queryset = MedicamentosConsulta.objects.all()

class RecetaMedicaView(viewsets.ModelViewSet):
    serializer_class = RecetaMedicaSerializer
    queryset = RecetaMedica.objects.all()

class TablaMedicaView(viewsets.ModelViewSet):
    serializer_class = TablaMedicaSerializer
    queryset = TablaMedica.objects.all()

class TratamientosConsultaView(viewsets.ModelViewSet):
    serializer_class = TratamientosConsultaSerializer
    queryset = TratamientosConsulta.objects.all()

class VacunasSuministradasConsultaView(viewsets.ModelViewSet):
    serializer_class = VacunasSuministradasConsultaSerializer
    queryset = VacunasSuministradasConsulta.objects.all()