from rest_framework import viewsets
from .models import Mascota, Alergias
from .serializer import MascotaSerializer, AlergiasSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
# Create your views here.

@csrf_exempt
def postFoto(request, id):
    print(request.FILES)
    try:
        foto = request.FILES['agregarEditarFoto']
        pet = Mascota.objects.get(idmascota = id)
        ruta_foto = 'Media/'+str(pet.imagen)
        
        import os
        if(str(pet.imagen) != ''):
            if(ruta_foto != 'Media/Media/noImage.png'):
                try:
                    os.remove(ruta_foto)
                except OSError as e: # name the Exception `e`
                    print ("Failed with:", e.strerror) # look what it says
    except:
        foto = pet.imagen
        pet.imagen = foto
        pet.save()
        return 
    pet.imagen = foto
    pet.save()
    return JsonResponse({'mensaje': 'Imagen subida con éxito'}, status=201) 


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