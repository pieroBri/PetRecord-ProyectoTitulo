from django.contrib import admin
from .models import FichaMedica, FichaOperacion, FichaHospitalizacion, Fichasedacion, RecetaMedica, VacunasSuministradasConsulta, MedicamentosConsulta, TratamientosConsulta
# Register your models here.

admin.site.register(FichaMedica)
admin.site.register(FichaOperacion)
admin.site.register(FichaHospitalizacion)
admin.site.register(Fichasedacion)
admin.site.register(RecetaMedica)
admin.site.register(VacunasSuministradasConsulta)
admin.site.register(MedicamentosConsulta)
admin.site.register(TratamientosConsulta)