from django.contrib import admin
from .models import Veterinaria, Franquicia, Insumos, Calendario, FechasSolicitadas, TablaMedica, RegistroDeOperaciones, RegistroVacunasSuministradas
# Register your models here.

admin.site.register(Franquicia)
admin.site.register(Veterinaria)
admin.site.register(Insumos)
admin.site.register(Calendario)
admin.site.register(FechasSolicitadas)
admin.site.register(TablaMedica)
admin.site.register(RegistroDeOperaciones)
admin.site.register(RegistroVacunasSuministradas)