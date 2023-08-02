from django.db import models
from mascota.models import Mascota

# Create your models here.
class Franquicia(models.Model):
    idfranquicia = models.CharField(db_column='idFranquicia', primary_key=True, max_length=45)  # Field name made lowercase.
    nombrefranquicia = models.CharField(db_column='nombreFranquicia', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'franquicia'
        

class Veterinaria(models.Model):
    idveterinaria = models.CharField(db_column='idVeterinaria', primary_key=True, max_length=45)  # Field name made lowercase. The composite primary key (idVeterinaria, nombreVeterinaria) found, that is not supported. The first column is selected.
    nombreveterinaria = models.CharField(db_column='nombreVeterinaria', unique=True, max_length=45)  # Field name made lowercase.
    direccion = models.CharField(db_column='Direccion', unique=True, max_length=45)  # Field name made lowercase.
    franquicia_idfranquicia = models.ForeignKey(Franquicia, on_delete= models.CASCADE, db_column='Franquicia_idFranquicia')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'veterinaria'
        unique_together = (('idveterinaria', 'nombreveterinaria'),)
        

class Insumos(models.Model):
    idinsumos = models.CharField(db_column='idInsumos', primary_key=True, max_length=45)  # Field name made lowercase.
    nombre = models.CharField(max_length=50)
    valor = models.DecimalField(max_digits=10, decimal_places=0)
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.
    veterinaria_nombreveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_nombreVeterinaria', to_field='nombreveterinaria', related_name='insumos_veterinaria_nombreveterinaria_set')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'insumos'
        

class Calendario(models.Model):
    idcalendario = models.CharField(db_column='idCalendario', primary_key=True, max_length=45)  # Field name made lowercase.
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.
    veterinaria_nombreveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_nombreVeterinaria', to_field='nombreveterinaria', related_name='calendario_veterinaria_nombreveterinaria_set')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'calendario'


class FechasSolicitadas(models.Model):
    idfechassolicitadas = models.CharField(db_column='idFechasSolicitadas', primary_key=True, max_length=45)  # Field name made lowercase.
    fechainicial = models.DateTimeField(db_column='FechaInicial')  # Field name made lowercase.
    fechafinal = models.DateTimeField(db_column='FechaFinal')  # Field name made lowercase.
    rut = models.CharField(db_column='Rut', max_length=10)  # Field name made lowercase.
    numerodecontacto = models.CharField(db_column='NumeroDeContacto', max_length=12)  # Field name made lowercase.
    nombremascota = models.CharField(db_column='nombreMascota', max_length=45)  # Field name made lowercase.
    calendario_idcalendario = models.ForeignKey(Calendario, on_delete= models.CASCADE, db_column='Calendario_idCalendario')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'fechassolicitadas'
        

class TablaMedica(models.Model):
    idtablamedica = models.CharField(db_column='idTablaMedica', primary_key=True, max_length=45)  # Field name made lowercase.
    mascota_idmascota = models.ForeignKey(Mascota, on_delete= models.CASCADE, db_column='Mascota_idMascota')  # Field name made lowercase.
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.
    veterinaria_nombreveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_nombreVeterinaria', to_field='nombreveterinaria', related_name='tablamedica_veterinaria_nombreveterinaria_set')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'tablamedica'
        

class RegistroDeOperaciones(models.Model):
    idregistrodeoperaciones = models.CharField(db_column='idRegistroDeOperaciones', primary_key=True, max_length=45)  # Field name made lowercase.
    operación = models.CharField(max_length=45)
    tablamedica_idtablamedica = models.ForeignKey(TablaMedica, on_delete= models.CASCADE, db_column='TablaMedica_idTablaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'registrodeoperaciones'


class RegistroVacunasSuministradas(models.Model):
    idvacunassuministradas = models.CharField(db_column='idVacunasSuministradas', primary_key=True, max_length=45)  # Field name made lowercase.
    nombrevacuna = models.CharField(db_column='nombreVacuna', max_length=45)  # Field name made lowercase.
    tablamedica_idtablamedica = models.ForeignKey(TablaMedica, on_delete= models.CASCADE, db_column='TablaMedica_idTablaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'registrovacunassuministradas'