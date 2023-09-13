from rest_framework import viewsets
from .serializer import VeterinariaSerializer, FranquiciaSerializer, InsumosSerializer, FechasCalendarioSerializer, TablaMedicaSerializer, RegistroDeOperacionesSerializer, RegistroVacunasSuministradasSerializer
from .models import Veterinaria, Franquicia, Insumos, FechasCalendario, TablaMedica, RegistroDeOperaciones, RegistroVacunasSuministradas
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


    def get_queryset(self):
        queryset = Insumos.objects.all()
        

        if(self.request.query_params):
            vet = self.request.query_params['id']
            queryset = Insumos.objects.filter(veterinaria_idveterinaria = vet)
        
        
        return queryset

class FechasCalendarioView(viewsets.ModelViewSet):
    serializer_class = FechasCalendario
    queryset = FechasCalendario.objects.all()

class TablaMedicaView(viewsets.ModelViewSet):
    serializer_class = TablaMedicaSerializer
    queryset = TablaMedica.objects.all()

class RegistroDeOperacionesView(viewsets.ModelViewSet):
    serializer_class = RegistroDeOperacionesSerializer
    queryset = RegistroDeOperaciones.objects.all()

class RegistroVacunasSuministradasView(viewsets.ModelViewSet):
    serializer_class = RegistroVacunasSuministradasSerializer
    queryset = RegistroVacunasSuministradas.objects.all()