from rest_framework import serializers
from .models import UsuarioDueno, UsuarioVeterinario

class UsuarioDuenoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioDueno
        fields = '__all__'
        
class UsuarioVeterinarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioVeterinario
        fields = '__all__'