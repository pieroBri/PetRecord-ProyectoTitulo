from rest_framework import viewsets
from .models import Mascota, Alergias
from .serializer import MascotaSerializer, AlergiasSerializer

# Create your views here.
class MascotaView(viewsets.ModelViewSet):
    serializer_class = MascotaSerializer
    queryset = Mascota.objects.all()
    
class AlergiasView(viewsets.ModelViewSet):
    serializer_class = AlergiasSerializer
    queryset = Alergias.objects.all()