import json
import csv

# Ruta del archivo JSONL y CSV
jsonl_file = 'origin_dest_distances.jsonl'
csv_file = 'origin_dest_distances.csv'

# Abre el archivo JSONL para lectura
with open(jsonl_file, 'r') as infile:
    # Abre el archivo CSV para escritura
    with open(csv_file, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        
        # Escribe el encabezado del CSV
        writer.writerow(['origin', 'destination', 'distance'])
        
        # Lee el archivo JSONL línea por línea
        for line in infile:
            # Convierte cada línea JSON a un diccionario
            data = json.loads(line.strip())
            
            # Escribe los datos en el archivo CSV
            writer.writerow([data['Origin'], data['Dest'], data['Distance']])

print(f"Datos convertidos correctamente a {csv_file}")
