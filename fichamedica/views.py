from rest_framework import viewsets
from .models import FichaHospitalizacion, FichaMedica, FichaOperacion, Fichasedacion, MedicamentosConsulta, RecetaMedica, TablaMedica, TratamientosConsulta, VacunasSuministradasConsulta
from .serializer import FichaHospitalizacionSerializer, FichaMedicaSerializer, FichaOperacionSerializer, FichasedacionSerializer, MedicamentosConsultaSerializer, RecetaMedicaSerializer, TablaMedicaSerializer, TratamientosConsultaSerializer, VacunasSuministradasConsultaSerializer
# Create your views here.

class FichaHospitalizacionView(viewsets.ModelViewSet):
    serializer_class = FichaHospitalizacionSerializer
    queryset = FichaHospitalizacion.objects.all()

    def get_queryset(self):
        queryset = FichaHospitalizacion.objects.all()
        if(self.request.query_params):
            pet = self.request.query_params.get('pet', None)
            ficha = self.request.query_params.get('ficha', None)
            if(pet):
                queryset = FichaHospitalizacion.objects.raw("SELECT * from FichaHospitalización as fh join FichaMedica as f on fh.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
            elif(ficha):
                queryset = FichaHospitalizacion.objects.raw("SELECT * from FichaHospitalización as fh join FichaMedica as f on fh.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])

                
        return queryset

class FichaMedicaView(viewsets.ModelViewSet):
    serializer_class = FichaMedicaSerializer
    queryset = FichaMedica.objects.all()

    def get_queryset(self):
        queryset = FichaMedica.objects.all()
        if(self.request.query_params):
            pet = self.request.query_params.get('pet')
            if(pet):
                queryset = FichaMedica.objects.raw("SELECT * from FichaMedica as f join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
            


        return queryset

class FichaOperacionView(viewsets.ModelViewSet):
    serializer_class = FichaOperacionSerializer
    queryset = FichaOperacion.objects.all()

    def get_queryset(self):
        queryset = FichaOperacion.objects.all()
        if(self.request.query_params):
            pet = self.request.query_params.get('pet', None)
            ficha = self.request.query_params.get('ficha', None)
            if(pet):
                queryset = FichaOperacion.objects.raw("SELECT * from FichaOperación as fo join FichaMedica as f on fo.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
            elif(ficha):
                queryset = FichaOperacion.objects.raw("SELECT * from FichaOperación as fo join FichaMedica as f on fo.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])

        return queryset

class FichasedacionView(viewsets.ModelViewSet):
    serializer_class = FichasedacionSerializer
    queryset = Fichasedacion.objects.all()

    def get_queryset(self):
        queryset = Fichasedacion.objects.all()
        if(self.request.query_params):
            pet = self.request.query_params.get('pet', None)
            ficha = self.request.query_params.get('ficha', None)
            if(pet):
                queryset = Fichasedacion.objects.raw("SELECT * from FichaSedación as fs join FichaMedica as f on fs.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
            elif(ficha):
                queryset = Fichasedacion.objects.raw("SELECT * from FichaSedación as fs join FichaMedica as f on fs.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])
        
        return queryset

class MedicamentosConsultaView(viewsets.ModelViewSet):
    serializer_class = MedicamentosConsultaSerializer
    queryset = MedicamentosConsulta.objects.all()

    def get_queryset(self):
        queryset = MedicamentosConsulta.objects.all()
        pet = self.request.query_params.get('pet', None)
        ficha = self.request.query_params.get('ficha', None)
        if(pet):
            queryset = MedicamentosConsulta.objects.raw("SELECT * from MedicamentosConsulta as mc join FichaMedica as f on mc.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
        elif(ficha):
            queryset = MedicamentosConsulta.objects.raw("SELECT * from MedicamentosConsulta as mc join FichaMedica as f on mc.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])
    
        return queryset

class RecetaMedicaView(viewsets.ModelViewSet):
    serializer_class = RecetaMedicaSerializer
    queryset = RecetaMedica.objects.all()

    def get_queryset(self):
        queryset = RecetaMedica.objects.all()
        pet = self.request.query_params.get('pet', None)
        ficha = self.request.query_params.get('ficha', None)
        if(pet):
            queryset = RecetaMedica.objects.raw("SELECT * from RecetaMedica as rc join FichaMedica as f on rc.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
        elif(ficha):
            queryset = RecetaMedica.objects.raw("SELECT * from RecetaMedica as rc join FichaMedica as f on rc.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])
    
        return queryset

class TablaMedicaView(viewsets.ModelViewSet):
    serializer_class = TablaMedicaSerializer
    queryset = TablaMedica.objects.all()

class TratamientosConsultaView(viewsets.ModelViewSet):
    serializer_class = TratamientosConsultaSerializer
    queryset = TratamientosConsulta.objects.all()
        
    def get_queryset(self):
        queryset = TratamientosConsulta.objects.all()
        pet = self.request.query_params.get('pet', None)
        ficha = self.request.query_params.get('ficha', None)
        if(pet):
            queryset = TratamientosConsulta.objects.raw("SELECT * from TratamientosConsulta as tc join FichaMedica as f on tc.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
        elif(ficha):
            queryset = TratamientosConsulta.objects.raw("SELECT * from TratamientosConsulta as tc join FichaMedica as f on tc.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])
    
        return queryset

class VacunasSuministradasConsultaView(viewsets.ModelViewSet):
    serializer_class = VacunasSuministradasConsultaSerializer
    queryset = VacunasSuministradasConsulta.objects.all()

    def get_queryset(self):
        queryset = VacunasSuministradasConsulta.objects.all()
        pet = self.request.query_params.get('pet', None)
        ficha = self.request.query_params.get('ficha', None)
        if(pet):
            queryset = VacunasSuministradasConsulta.objects.raw("SELECT * from VacunasSuministradasConsulta as vsc join FichaMedica as f on vsc.FichaMedica_idFichaMedica = f.idFichaMedica join TablaMedica as t on f.TablaMedica_idTablaMedica = t.idTablaMedica join Mascota as m on t.Mascota_idMascota = m.idMascota WHERE m.idMascota = %s", [pet])
        elif(ficha):
            queryset = VacunasSuministradasConsulta.objects.raw("SELECT * from VacunasSuministradasConsulta as vsc join FichaMedica as f on vsc.FichaMedica_idFichaMedica = f.idFichaMedica WHERE f.idFichaMedica = %s", [ficha])
    
        return queryset