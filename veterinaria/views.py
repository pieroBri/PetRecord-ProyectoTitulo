from rest_framework import viewsets
from .serializer import VeterinariaSerializer, FranquiciaSerializer, InsumosSerializer, CalendarioSerializer, FechasSolicitadasSerializer, TablaMedicaSerializer, RegistroDeOperacionesSerializer, RegistroVacunasSuministradasSerializer
from .models import Veterinaria, Franquicia, Insumos, Calendario, FechasSolicitadas, TablaMedica, RegistroDeOperaciones, RegistroVacunasSuministradas
# Create your views here.

class VeterinariaView(viewsets.ModelViewSet):
    serializer_class = VeterinariaSerializer
    queryset = Veterinaria.objects.all()

class FranquiciaView(viewsets.ModelViewSet):
    serializer_class = FranquiciaSerializer
    queryset = Franquicia.objects.all()

class InsumosView(viewsets.ModelViewSet):
    serializer_class = InsumosSerializer
    queryset = Insumos.objects.all()

class CalendarioView(viewsets.ModelViewSet):
    serializer_class = CalendarioSerializer
    queryset = Calendario.objects.all()

class FechasSolicitadasView(viewsets.ModelViewSet):
    serializer_class = FechasSolicitadasSerializer
    queryset = FechasSolicitadas.objects.all()

class TablaMedicaView(viewsets.ModelViewSet):
    serializer_class = TablaMedicaSerializer
    queryset = TablaMedica.objects.all()

class RegistroDeOperacionesView(viewsets.ModelViewSet):
    serializer_class = RegistroDeOperacionesSerializer
    queryset = RegistroDeOperaciones.objects.all()

class RegistroVacunasSuministradasView(viewsets.ModelViewSet):
    serializer_class = RegistroVacunasSuministradasSerializer
    queryset = RegistroVacunasSuministradas.objects.all()