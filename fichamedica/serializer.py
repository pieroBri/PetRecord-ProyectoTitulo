from rest_framework import serializers
from .models import FichaHospitalizacion, FichaMedica, FichaOperacion, Fichasedacion, MedicamentosConsulta, RecetaMedica, TablaMedica, TratamientosConsulta, VacunasSuministradasConsulta

class FichaHospitalizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaHospitalizacion
        fields = '__all__'

class FichaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaMedica
        fields = '__all__'

class FichaOperacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaOperacion
        fields = '__all__'

class FichasedacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fichasedacion
        fields = '__all__'

class MedicamentosConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicamentosConsulta
        fields = '__all__'

class RecetaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecetaMedica
        fields = '__all__'

class TablaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TablaMedica
        fields = '__all__'

class TratamientosConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TratamientosConsulta
        fields = '__all__'

class VacunasSuministradasConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacunasSuministradasConsulta
        fields = '__all__'