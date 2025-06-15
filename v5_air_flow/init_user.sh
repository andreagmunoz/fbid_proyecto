#!/bin/bash

# Inicializa la base de datos de Airflow
airflow db init

# Verificar si el usuario admin ya existe antes de crear uno nuevo
if ! airflow users list | grep -q "admin"; then
    # Crea un usuario sin interacción (sin getpass)
    airflow users create \
        --username admin \
        --firstname Jack \
        --lastname Sparrow \
        --role Admin \
        --email example@mail.org \
        --password '123'  # Puedes poner la contraseña aquí
else
    echo "El usuario 'admin' ya existe, no se creará nuevamente."
fi

# Luego, ejecuta el servidor web y el scheduler
exec "$@"
