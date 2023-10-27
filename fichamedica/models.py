from django.db import models
from veterinaria.models import TablaMedica

# Create your models here.
class FichaMedica(models.Model):
    idfichamedica = models.IntegerField(db_column='idFichaMedica', primary_key=True)  # Field name made lowercase.
    tablamedica_idtablamedica = models.ForeignKey(TablaMedica, on_delete= models.CASCADE, db_column='TablaMedica_idTablaMedica')  # Field name made lowercase.
    sucursalveterinaria = models.CharField(db_column='sucursalVeterinaria', max_length=45)  # Field name made lowercase.
    veterinarioacargo = models.CharField(db_column='veterinarioACargo', max_length=45)  # Field name made lowercase.
    fechaconsulta = models.DateTimeField(db_column='fechaConsulta')  # Field name made lowercase.
    operación = models.BooleanField(db_column='operación', default=False)
    frecuenciarespiratoria = models.CharField(db_column='frecuenciaRespiratoria', max_length=45)  # Field name made lowercase.
    frecuenciacardiaca = models.CharField(db_column='frecuenciaCardiaca', max_length=45)  # Field name made lowercase.
    peso = models.CharField(db_column='peso', max_length=45)
    edad = models.CharField(db_column='Edad', max_length=45)  # Field name made lowercase.
    hospitalización = models.BooleanField(db_column='hospitalización', default=False)
    sedación = models.BooleanField(db_column='sedación', default=False)
    temperatura = models.CharField(db_column='temperatura', max_length=45)
    fechaultimamod = models.DateTimeField(db_column='fechaUltimaMod', blank=True, null=True)  # Field name made lowercase.
    flagmodificacion = models.BooleanField(db_column='flagModificacion', default=False, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'fichamedica'

class FichaHospitalizacion(models.Model):
    idfichahospitalización = models.IntegerField(db_column='idFichaHospitalización', primary_key=True)  # Field name made lowercase.
    motivohospitalización = models.TextField(db_column='motivoHospitalización')  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.
    fechaultimamod = models.DateTimeField(db_column='fechaUltimaMod', blank=True, null=True)  # Field name made lowercase.
    flagmodificacion = models.BooleanField(db_column='flagModificacion', default=False, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'fichahospitalización'


class FichaOperacion(models.Model):
    idfichaoperación = models.IntegerField(db_column='idFichaOperación', primary_key=True)  # Field name made lowercase.
    diagnostico = models.TextField(db_column='diagnostico', max_length=4000)
    cirugiaarealizar = models.CharField(db_column='cirugiaARealizar', max_length=45)  # Field name made lowercase.
    autorizaciontutor = models.IntegerField(db_column='autorizacionTutor')  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.
    fechaultimamod = models.DateTimeField(db_column='fechaUltimaMod', blank=True, null=True)  # Field name made lowercase.
    flagmodificacion = models.BooleanField(db_column='flagModificacion', default=False, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'fichaoperación'


class Fichasedacion(models.Model):
    idfichasedación = models.IntegerField(db_column='idFichaSedación', primary_key=True)  # Field name made lowercase.
    autorizacióntutor = models.IntegerField(db_column='autorizaciónTutor')  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'fichasedación'

        
class RecetaMedica(models.Model):
    idrecetamedica = models.IntegerField(db_column='idRecetaMedica', primary_key=True)  # Field name made lowercase.
    rutveterinario = models.CharField(db_column='rutVeterinario', max_length=13)  # Field name made lowercase.
    prescripcion = models.TextField(db_column='prescripcion', max_length=4000)
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'recetamedica'

        
class VacunasSuministradasConsulta(models.Model):
    idvacunassuministradas = models.IntegerField(db_column='idVacunasSuministradas', primary_key=True)  # Field name made lowercase.
    nombrevacuna = models.CharField(db_column='nombreVacuna', max_length=45)  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'vacunassuministradasconsulta'
        

class MedicamentosConsulta(models.Model):
    idmedicamentosconsulta = models.IntegerField(db_column='idMedicamentosConsulta', primary_key=True)  # Field name made lowercase.
    nombremedicamentos = models.CharField(db_column='nombreMedicamentos', max_length=45)  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'medicamentosconsulta'
        

class TratamientosConsulta(models.Model):
    idtratamientosconsulta = models.IntegerField(db_column='idTratamientosConsulta', primary_key=True)  # Field name made lowercase.
    nombretratamientos = models.CharField(db_column='nombreTratamientos', max_length=45)  # Field name made lowercase.
    caudadelavisita = models.TextField(db_column='caudaDeLaVisita', max_length=4000)  # Field name made lowercase.
    fichamedica_idfichamedica = models.ForeignKey(FichaMedica, on_delete= models.CASCADE, db_column='FichaMedica_idFichaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'fichamedica'
        managed = False
        db_table = 'tratamientosconsulta'