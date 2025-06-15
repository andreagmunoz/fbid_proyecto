FROM bde2020/spark-worker:3.3.0-hadoop3.3

# Cambiar al usuario root para permitir la instalación de paquetes
USER root

# Instalar OpenJDK 8
RUN apk update && \
    apk add openjdk8

# Establecer las variables de entorno para Java y Spark
ENV JAVA_HOME="/usr/lib/jvm/java-8-openjdk"
ENV SPARK_HOME="/spark"
ENV PATH="$JAVA_HOME/bin:$SPARK_HOME/bin:$PATH"

# Verificar la instalación de Java
RUN java -version

# Verificar la instalación de Spark (ver versión de Spark)
RUN $SPARK_HOME/bin/spark-submit --version
RUN $SPARK_HOME/bin/spark-submit --version
