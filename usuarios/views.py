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

    def get_queryset(self):
        queryset = UsuarioVeterinario.objects.all()
        
        if(self.request.query_params):
            vet = self.request.query_params['vet']
            queryset = UsuarioVeterinario.objects.filter(veterinaria_idveterinaria = vet)

        return queryset