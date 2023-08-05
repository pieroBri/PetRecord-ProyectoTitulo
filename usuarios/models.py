from django.db import models
from django.apps import apps
#from veterinaria.models import Veterinaria

# Create your models here.
class UsuarioDueno(models.Model):
    rut = models.CharField(db_column='rut', primary_key=True, max_length=13)
    contraseña = models.CharField(db_column='contraseña', max_length=45)
    nombres = models.CharField(db_column='nombres', max_length=45)
    apellidos = models.CharField(db_column='apellidos', max_length=45)
    telefono = models.CharField(db_column='telefono', max_length=45, blank=True, null=True)
    direccion = models.CharField(db_column='direccion', max_length=45)
    correo = models.CharField(db_column='correo', max_length=45)

    class Meta:
        app_label = 'usuarios'
        managed = False
        db_table = 'usuariodueño'

class UsuarioVeterinario(models.Model):
    rut = models.CharField(db_column='rut', primary_key=True, max_length=13)
    contraseña = models.CharField(db_column='contraseña', max_length=45)
    nombres = models.CharField(db_column='nombres', max_length=45)
    apellidos = models.CharField(db_column='apellidos', max_length=45)
    telefono = models.CharField(db_column='telefono', max_length=45, blank=True, null=True)
    direccion = models.CharField(db_column='direccion', max_length=45)
    correo = models.CharField(db_column='correo', max_length=45)
    admin = models.BooleanField(db_column='admin', default=False)
    veterinaria_idveterinaria = models.ForeignKey('veterinaria.Veterinaria', on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.

    class Meta:
        app_label = 'usuarios'
        managed = False
        db_table = 'usuarioveterinario'
        
    def get_Model_Veterinaria(self):
        Veterinaria = apps.get_model('veterinaria', 'Veterinaria')
        return Veterinaria.objects.get(id=self.veterinaria_idveterinaria)