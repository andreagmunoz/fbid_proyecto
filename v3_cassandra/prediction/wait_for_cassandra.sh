#!/bin/bash
# wait_for_cassandra.sh

# Esperar a que Cassandra esté listo
until cqlsh cassandra -e "describe keyspaces" > /dev/null 2>&1; do
  echo "Esperando Cassandra..."
  sleep 5
done

# Una vez Cassandra está disponible, ejecutar la aplicación Flask
exec "$@"
