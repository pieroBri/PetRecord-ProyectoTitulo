from django.db import models
from usuarios.models import UsuarioDueno

# Create your models here.
class Mascota(models.Model):
    idmascota = models.CharField(db_column='idMascota', primary_key=True, max_length=15)  # Field name made lowercase.
    nombremascota = models.CharField(db_column='nombreMascota', max_length=45)  # Field name made lowercase.
    especie = models.CharField(max_length=45)
    color = models.CharField(max_length=45)
    raza = models.CharField(max_length=45)
    fechadenacimiento = models.DateField(db_column='FechaDeNacimiento')  # Field name made lowercase.
    usuariodueño_rut = models.ForeignKey(UsuarioDueno, on_delete= models.CASCADE, db_column='UsuarioDueño_rut')  # Field name made lowercase.

    class Meta:
        app_label = 'mascota'
        managed = False
        db_table = 'mascota'
        
class Alergias(models.Model):
    idalergias = models.CharField(db_column='idAlergias', primary_key=True, max_length=45)  # Field name made lowercase.
    nombrealergia = models.CharField(db_column='nombreAlergia', max_length=45)  # Field name made lowercase.
    mascota_idmascota = models.ForeignKey(Mascota, on_delete= models.CASCADE, db_column='Mascota_idMascota')  # Field name made lowercase.

    class Meta:
        app_label = 'mascota'
        managed = False
        db_table = 'alergias'