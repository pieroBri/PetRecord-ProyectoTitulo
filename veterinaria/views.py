from rest_framework import viewsets
from .serializer import VeterinariaSerializer, FranquiciaSerializer, InsumosSerializer, MedicamentosSerializer, FechasCalendarioSerializer, TablaMedicaSerializer, RegistroDeOperacionesSerializer, RegistroVacunasSuministradasSerializer
from .models import Veterinaria, Franquicia, Insumos, Medicamentos, FechasCalendario, TablaMedica, RegistroDeOperaciones, RegistroVacunasSuministradas
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

class MedicamentosView(viewsets.ModelViewSet):
    serializer_class = MedicamentosSerializer
    queryset = Medicamentos-object.all()
    
    def get_queryset(self):
        queryset = Medicamentos.objects.all()
        

        if(self.request.query_params):
            vet = self.request.query_params['id']
            queryset = Medicamentos.objects.filter(veterinaria_idveterinaria = vet)
        
        
        return queryset
    
class FechasCalendarioView(viewsets.ModelViewSet):
    serializer_class = FechasCalendarioSerializer
    queryset = FechasCalendario.objects.all()

    def get_queryset(self):
        queryset = FechasCalendario.objects.all()
        if(self.request.query_params):
            date = self.request.query_params.get('date',None)
            comp = self.request.query_params.get('comp', None)
            vet = self.request.query_params.get('vet', None)
            ow = self.request.query_params.get('ow', None)
            if(vet):
                date = [date+'%']
                queryset = FechasCalendario.objects.raw("SELECT * from FechasCalendario WHERE RutVet = %s AND FechaInicial LIKE %s", [vet, date])
            elif(ow):
                if(comp):
                    queryset = FechasCalendario.objects.raw("SELECT * from FechasCalendario WHERE RutDueño = %s AND CAST(FechaInicial as date) >= CAST(%s as date)", [ow,comp])
                else:
                    date = [date+'%']
                    queryset = FechasCalendario.objects.raw("SELECT * from FechasCalendario WHERE RutDueño = %s AND FechaInicial LIKE %s", [ow, date])
        return queryset

class TablaMedicaView(viewsets.ModelViewSet):
    serializer_class = TablaMedicaSerializer
    queryset = TablaMedica.objects.all()

    def get_queryset(self):
        queryset = TablaMedica.objects.all()
        if(self.request.query_params):
            vet = self.request.query_params.get('vet')
            pet = self.request.query_params.get('pet')
            queryset = TablaMedica.objects.filter(veterinaria_idveterinaria = vet, mascota_idmascota = pet)
                
        return queryset

class RegistroDeOperacionesView(viewsets.ModelViewSet):
    serializer_class = RegistroDeOperacionesSerializer
    queryset = RegistroDeOperaciones.objects.all()

class RegistroVacunasSuministradasView(viewsets.ModelViewSet):
    serializer_class = RegistroVacunasSuministradasSerializer
    queryset = RegistroVacunasSuministradas.objects.all()