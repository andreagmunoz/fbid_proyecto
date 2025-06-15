# Usa la imagen oficial de Apache Airflow como base
FROM apache/airflow:2.1.4

# Cambiar a usuario root para la instalación de paquetes
USER root

# Instalar ca-certificates-java antes de instalar OpenJDK 11
RUN apt-get update && apt-get install -y \
    ca-certificates-java \
    && update-ca-certificates

# Ahora instalar OpenJDK 11
RUN apt-get install -y \
    openjdk-11-jdk \
    curl \
    wget \
    unzip \
    bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar Apache Spark 3.3.1
RUN wget https://archive.apache.org/dist/spark/spark-3.0.0/spark-3.0.0-bin-hadoop3.2.tgz -P /tmp \
    && tar -xvf /tmp/spark-3.0.0-bin-hadoop3.2.tgz -C /opt \
    && rm /tmp/spark-3.0.0-bin-hadoop3.2.tgz

# Configurar las variables de entorno para Java y Spark
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
# Configura SPARK_HOME y actualiza el PATH
ENV SPARK_HOME=/opt/spark-3.0.0-bin-hadoop3.2
ENV PATH=$SPARK_HOME/bin:$PATH

# Crear directorios necesarios para Airflow
RUN mkdir -p /opt/airflow/dags /opt/airflow/logs /opt/airflow/plugins

# Cambiar de vuelta al usuario airflow
USER airflow

# Copiar los archivos de requisitos si existen
COPY resources/airflow/requirements.txt /opt/airflow/requirements.txt
COPY resources/airflow/constraints.txt /opt/airflow/constraints.txt

# Instalar dependencias de Python de Airflow
RUN pip install -r requirements.txt -c constraints.txt

# Instalar findspark
RUN pip install findspark

# Copiar el script de creación de usuario
COPY init_user.sh /usr/local/bin/init_user.sh

# Volver al usuario root para cambiar permisos en el script
USER root

# Dar permisos de ejecución al script
RUN chmod +x /usr/local/bin/init_user.sh

# Cambiar de vuelta al usuario airflow
USER airflow

# Inicializa la base de datos de Airflow
RUN airflow db init

# Exponer el puerto de la interfaz web de Airflow
EXPOSE 8080

# Comando para ejecutar el servidor web de Airflow y el scheduler
ENTRYPOINT ["bash", "-c", "/usr/local/bin/init_user.sh && airflow webserver --port 8080 & airflow scheduler"]
