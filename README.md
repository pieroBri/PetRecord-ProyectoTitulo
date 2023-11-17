# PetRecord-ProyectoTitulo
Proyecto de título de Piero Brichetto y Sebastian Montiel.

## Requisitos
1. Python
2. Node.js
3. Mysql

## Tecnologías utilizadas
1. Django
2. Rest-framework
3. Pillow
4. ReactJs
5. Tailwind

## Instalación
1. Clona este repositorio.
2. Desde la ruta base del proyecto ejecutar el comando de `pip install -r requirements.txt`
3. Ejecuta `npm install` para instalar las dependencias.

## Configuración Base de datos
1. Con la herramienta de mysql workbench se abre el modelo proporcionado
2. En las opciones de database clickear en `Forward Engineer` y continuar para subirlo a la instancia local
3. En caso de ser necesario, en la carpeta 📁Backend -> settings.py [En la seccion de databeses configurar al usuario y contraseña referentes a la base de datos, por deafualt es el root]

## Ejecución
1. En la ruta base del proyecto ejecutar el comando `pyhton manage.py runserver` para ejecutar el localhost del backend.
2. En la ruta Client (`cd Client`) ejecutar el comando `npm run dev` para ejecutar el localhost del frontend.
3. Visitar el enlace de [localhost:5173]
