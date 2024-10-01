import requests
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime

# Conexión a la base de datos MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="earthalert"
)
cursor = conn.cursor()

# Hacer la solicitud a la página web
url = "https://www.sismologia.cl/informacion/grandes-terremotos.html"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Encontrar la tabla
table = soup.find('table')

# Extraer los datos de cada fila
rows = table.find_all('tr')[1:]  # Saltar el encabezado

for row in rows:
    cols = row.find_all('td')
    
    # Extraer y limpiar los datos
    fecha = cols[0].text.strip()
    hora = cols[1].text.strip()
    lat = cols[2].text.strip()
    lon = cols[3].text.strip()
    magnitud_ms = cols[4].text.strip().replace(',', '.') if cols[4].text.strip() != '-' else None
    magnitud_mw = cols[5].text.strip().replace(',', '.') if cols[5].text.strip() != '-' else None
    profundidad = cols[6].text.strip().replace(',', '.') if cols[6].text.strip() != '-' else None
    efecto = cols[7].text.strip()
    
    # Convertir la fecha al formato 'YYYY-MM-DD'
    try:
        fecha = datetime.strptime(fecha, '%d/%m/%Y').strftime('%Y-%m-%d')
    except ValueError as e:
        print(f"Error con la fecha {fecha}: {e}")
        continue
    
    # Convertir los valores a los formatos apropiados
    try:
        lat = float(lat)
        lon = float(lon)
        if magnitud_ms: magnitud_ms = float(magnitud_ms)
        if magnitud_mw: magnitud_mw = float(magnitud_mw)
        if profundidad: profundidad = float(profundidad)
    except ValueError as e:
        print(f"Error con los datos numéricos: {e}")
        continue

    # Verificar si el registro ya existe
    cursor.execute('''
        SELECT COUNT(*) FROM Sismos
        WHERE Fecha = %s AND Hora = %s AND Lat = %s AND Lon = %s AND Magnitud_Ms = %s AND Magnitud_MW = %s AND Profundidad = %s AND Efecto = %s
    ''', (fecha, hora, lat, lon, magnitud_ms, magnitud_mw, profundidad, efecto))
    
    if cursor.fetchone()[0] == 0:
        # Insertar los datos en la tabla MySQL si no existe
        cursor.execute('''
            INSERT INTO Sismos (Fecha, Hora, Lat, Lon, Magnitud_Ms, Magnitud_MW, Profundidad, Efecto)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (fecha, hora, lat, lon, magnitud_ms, magnitud_mw, profundidad, efecto))
        print(f"Insertado: {fecha}, {hora}, {lat}, {lon}, {magnitud_ms}, {magnitud_mw}, {profundidad}, {efecto}")
    else:
        print(f"Duplicado: {fecha}, {hora}, {lat}, {lon}, {magnitud_ms}, {magnitud_mw}, {profundidad}, {efecto}")

# Confirmar los cambios en la base de datos
conn.commit()

# Cerrar la conexión
cursor.close()
conn.close()
