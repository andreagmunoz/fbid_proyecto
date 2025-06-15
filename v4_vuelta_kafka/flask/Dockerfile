# Usamos la imagen oficial de Python 3.7 como base
FROM python:3.7

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /web

# Copiar el archivo de dependencias de la aplicación Flask
COPY recursos/requirements.txt /web/

# Instalar las dependencias de Python
RUN python -m pip install -r requirements.txt

# Copiar el código de la aplicación Flask
COPY recursos/web /web/

# Exponer el puerto donde la app Flask escuchará
EXPOSE 5000

# Comando para ejecutar la aplicación Flask
CMD ["python", "predict_flask.py"]

