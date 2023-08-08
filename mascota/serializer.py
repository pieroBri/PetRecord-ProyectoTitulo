from rest_framework import serializers
from .models import Mascota, Alergias

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = '__all__'
        
class AlergiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alergias
        fields = '__all__'