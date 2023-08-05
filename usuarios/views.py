from rest_framework import viewsets, generics
from .serializer import UsuarioDuenoSerializer, UsuarioVeterinarioSerializer
from .models import UsuarioDueno, UsuarioVeterinario

# Create your views here.
class UserDuenoView(viewsets.ModelViewSet):
    serializer_class = UsuarioDuenoSerializer
    queryset = UsuarioDueno.objects.all()
    
class UserVetView(viewsets.ModelViewSet):
    serializer_class = UsuarioVeterinarioSerializer
    queryset = UsuarioVeterinario.objects.all()