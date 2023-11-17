from django.db import models
from mascota.models import Mascota

# Create your models here.
class Franquicia(models.Model):
    idfranquicia = models.IntegerField(db_column='idFranquicia', primary_key=True)  # Field name made lowercase.
    nombrefranquicia = models.CharField(db_column='nombreFranquicia', max_length=45, unique=True)  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'franquicia'
        

class Veterinaria(models.Model):
    idveterinaria = models.IntegerField(db_column='idVeterinaria', primary_key=True)  # Field name made lowercase. The composite primary key (idVeterinaria, nombreVeterinaria) found, that is not supported. The first column is selected.
    nombreveterinaria = models.CharField(db_column='nombreVeterinaria', unique=True, max_length=45)  # Field name made lowercase.
    direccion = models.CharField(db_column='Direccion', unique=True, max_length=45)  # Field name made lowercase.
    franquicia_idfranquicia = models.ForeignKey(Franquicia, on_delete= models.CASCADE, db_column='Franquicia_idFranquicia', null=True, blank=True)  # Field name made lowercase. dejar como null = TRUE cambiar en bd

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'veterinaria'
        

class Insumos(models.Model):
    idinsumos = models.IntegerField(db_column='idInsumos', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='nombre', max_length=50)
    cantidad = models.IntegerField(db_column='cantidad')
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'insumos'
        
class Medicamentos(models.Model):
    idmedicamentos = models.IntegerField(db_column='idMedicamentos', primary_key=True)
    nombre = models.CharField(db_column='nombre', max_length=45)
    valor = models.IntegerField(db_column='valor')
    cantidad = models.IntegerField(db_column='cantidad')
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')
    
    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'medicamentos'

class FechasCalendario(models.Model):
    idfechascalendario = models.IntegerField(db_column='idFechasCalendario', primary_key=True)  # Field name made lowercase.
    fechainicial = models.DateTimeField(db_column='FechaInicial')  # Field name made lowercase. Comentar error mañana que ya es tarde la vda
    fechafinal = models.DateTimeField(db_column='FechaFinal')  # Field name made lowercase.
    rutVet = models.CharField(db_column='RutVet', max_length=13)  # Field name made lowercase.
    rutDueno = models.CharField(db_column='RutDueño', max_length=13)
    numerodecontacto = models.CharField(db_column='NumeroDeContacto', max_length=12)  # Field name made lowercase.
    nombremascota = models.CharField(db_column='nombreMascota', max_length=45)  # Field name made lowercase.
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'fechascalendario'
        

class TablaMedica(models.Model):
    idtablamedica = models.IntegerField(db_column='idTablaMedica', primary_key=True)  # Field name made lowercase.
    mascota_idmascota = models.ForeignKey(Mascota, on_delete= models.CASCADE, db_column='Mascota_idMascota')  # Field name made lowercase.
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'tablamedica'
        

class RegistroDeOperaciones(models.Model):
    idregistrodeoperaciones = models.IntegerField(db_column='idRegistroDeOperaciones', primary_key=True)  # Field name made lowercase.
    operación = models.CharField(db_column='operación', max_length=45)
    tablamedica_idtablamedica = models.ForeignKey(TablaMedica, on_delete= models.CASCADE, db_column='TablaMedica_idTablaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'registrodeoperaciones'


class RegistroVacunasSuministradas(models.Model):
    idvacunassuministradas = models.IntegerField(db_column='idVacunasSuministradas', primary_key=True)  # Field name made lowercase.
    nombrevacuna = models.CharField(db_column='nombreVacuna', max_length=45)  # Field name made lowercase.
    tablamedica_idtablamedica = models.ForeignKey(TablaMedica, on_delete= models.CASCADE, db_column='TablaMedica_idTablaMedica')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'registrovacunassuministradas'

class RegistroDeVentas(models.Model):
    idregistrodeventas = models.IntegerField(db_column='idRegistroDeVentas', primary_key=True)
    fecha = models.DateTimeField(db_column='fecha')
    valortotal =models.IntegerField(db_column='valorTotal')
    rutDueno = models.CharField(db_column='rutDueño', max_length=13)
    nombreDueno = models.CharField(db_column='nombreDueño', max_length=45)
    telefono = models.CharField(db_column='telefono', max_length=45)
    correo = models.CharField(db_column='correo', max_length=45, blank=True, null=True)
    veterinaria_idveterinaria = models.ForeignKey(Veterinaria, on_delete= models.CASCADE, db_column='Veterinaria_idVeterinaria')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'RegistroDeVentas'

class ProductosVenta(models.Model):    
    idproductosventa = models.IntegerField(db_column='idProductosVenta', primary_key=True)
    nombreproducto = models.CharField(db_column='nombreProducto', max_length=45)
    cantidad = models.CharField(db_column='cantidad', max_length=45)
    valor =models.IntegerField(db_column='valor')
    registrodeventas_idregistrodeventas = models.ForeignKey(RegistroDeVentas, on_delete= models.CASCADE, db_column='RegistroDeVentas_idRegistroDeVentas')  # Field name made lowercase.

    class Meta:
        app_label = 'veterinaria'
        managed = False
        db_table = 'productosventa'
