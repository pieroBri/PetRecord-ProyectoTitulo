from rest_framework import viewsets
from .models import Mascota, Alergias
from .serializer import MascotaSerializer, AlergiasSerializer

# Create your views here.
class MascotaView(viewsets.ModelViewSet):
    serializer_class = MascotaSerializer
    queryset = Mascota.objects.all()

    def get_queryset(self):
        queryset = Mascota.objects.all()
        

        if(self.request.query_params):
            rut = self.request.query_params['id']
            queryset = Mascota.objects.filter(usuariodueño_rut = rut)
        
        
        return queryset
    
class AlergiasView(viewsets.ModelViewSet):
    serializer_class = AlergiasSerializer
    queryset = Alergias.objects.all()

    def get_queryset(self):
        queryset = Alergias.objects.all()
        

        if(self.request.query_params):
            mascota = self.request.query_params['id']
            queryset = Alergias.objects.filter(mascota_idmascota = mascota)
        
        
        return queryset