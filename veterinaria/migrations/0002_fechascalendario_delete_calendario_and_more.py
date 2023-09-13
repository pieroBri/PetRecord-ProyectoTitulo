# Generated by Django 4.2.3 on 2023-09-04 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veterinaria', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FechasCalendario',
            fields=[
                ('idfechascalendario', models.CharField(db_column='idFechasCalendario', max_length=45, primary_key=True, serialize=False)),
                ('fechainicial', models.DateTimeField(db_column='FechaInicial')),
                ('fechafinal', models.DateTimeField(db_column='FechaFinal')),
                ('rutVet', models.CharField(db_column='RutVet', max_length=13)),
                ('rutDueno', models.CharField(db_column='RutDueño', max_length=13)),
                ('numerodecontacto', models.CharField(db_column='NumeroDeContacto', max_length=12)),
                ('nombremascota', models.CharField(db_column='nombreMascota', max_length=45)),
            ],
            options={
                'db_table': 'fechascalendario',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Calendario',
        ),
        migrations.DeleteModel(
            name='FechasSolicitadas',
        ),
    ]
