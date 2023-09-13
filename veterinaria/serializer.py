from rest_framework import serializers
from .models import Veterinaria, Franquicia, Insumos, FechasCalendario, TablaMedica, RegistroDeOperaciones, RegistroVacunasSuministradas

class VeterinariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veterinaria
        fields = '__all__'

class FranquiciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franquicia
        fields = '__all__'

class InsumosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumos
        fields = '__all__'

class FechasCalendarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = FechasCalendario
        fields = '__all__'

class TablaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TablaMedica
        fields = '__all__'

class RegistroDeOperacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroDeOperaciones
        fields = '__all__'

class RegistroVacunasSuministradasSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroVacunasSuministradas
        fields = '__all__'