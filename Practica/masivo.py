import os
import requests
import exifread

def extraer_metadatos_exif(ruta_imagen):
    with open(ruta_imagen, 'rb') as archivo_imagen:
        metadatos = exifread.process_file(archivo_imagen)
    return metadatos

def convertir_coordenadas_gps(coordenadas, referencia):
    grados = float(coordenadas[0].num) / float(coordenadas[0].den)
    minutos = float(coordenadas[1].num) / float(coordenadas[1].den) / 60
    segundos = float(coordenadas[2].num) / float(coordenadas[2].den) / 3600
    decimal = grados + minutos + segundos
    if referencia in ['S', 'W']: 
        decimal = -decimal
    return decimal

def filtrar_metadatos(metadatos, ruta_imagen):
    datetime = metadatos.get('Image DateTime', 'No disponible')

    # Extraer coordenadas GPS en formato decimal
    latitud = longitud = 'No disponible'
    if 'GPS GPSLatitude' in metadatos and 'GPS GPSLatitudeRef' in metadatos:
        latitud = convertir_coordenadas_gps(metadatos['GPS GPSLatitude'].values, metadatos['GPS GPSLatitudeRef'].printable)
    if 'GPS GPSLongitude' in metadatos and 'GPS GPSLongitudeRef' in metadatos:
        longitud = convertir_coordenadas_gps(metadatos['GPS GPSLongitude'].values, metadatos['GPS GPSLongitudeRef'].printable)

    nombre_archivo = os.path.basename(ruta_imagen)

    metadatos_filtrados = {
        'Nombre del archivo': nombre_archivo,
        'Fecha y hora': datetime,
        'Latitud': latitud,
        'Longitud': longitud
    }
    return metadatos_filtrados

def verificar_url(url_completa):
    try:
        respuesta = requests.head(url_completa)
        if respuesta.status_code == 200:
            return True
        else:
            return False
    except requests.ConnectionError:
        return False

def generar_query_insert(metadatos_filtrados, url_completa):
    metadatos_filtrados['URL'] = url_completa
    columnas = ', '.join(f"`{clave}`" for clave in metadatos_filtrados.keys())
    valores = ', '.join(f"'{valor}'" for valor in metadatos_filtrados.values())
    query = f"INSERT INTO `files` ({columnas}) VALUES ({valores});"
    return query

def guardar_en_txt(nombre_archivo, lineas):
    # Crear la carpeta si no existe
    carpeta = os.path.dirname(nombre_archivo)
    if not os.path.exists(carpeta):
        os.makedirs(carpeta)

    # Leer contenido existente para evitar duplicados
    if os.path.isfile(nombre_archivo):
        with open(nombre_archivo, 'r') as archivo:
            contenido_existente = set(archivo.readlines())
    else:
        contenido_existente = set()

    # Agregar líneas nuevas evitando duplicados
    with open(nombre_archivo, 'a') as archivo:
        for linea in lineas:
            if linea + '\n' not in contenido_existente:
                archivo.write(linea + '\n')
            else:
                print(f"Advertencia: La línea ya existe en {nombre_archivo} y no se añadirá de nuevo.")

def procesar_carpeta(carpeta, base_url):
    consultas_ejecutadas = []
    consultas_no_ejecutadas = []

    # Obtener el nombre de la carpeta como fecha para el nombre del archivo
    fecha = os.path.basename(carpeta)

    for archivo in os.listdir(carpeta):
        ruta_imagen = os.path.join(carpeta, archivo)
        # Verificar si el archivo es una imagen
        if not os.path.isfile(ruta_imagen) or not archivo.lower().endswith(('.jpg', '.jpeg', '.png', '.tiff')):
            consultas_no_ejecutadas.append(f"{archivo} - No es un archivo válido o no existe.")
            continue

        print(f"\nProcesando: {archivo}")
        # Paso 1: Extraer todos los metadatos
        try:
            metadatos = extraer_metadatos_exif(ruta_imagen)
        except Exception as e:
            consultas_no_ejecutadas.append(f"{archivo} - Error al extraer metadatos: {str(e)}")
            continue

        # Paso 2: Filtrar los metadatos que se necesitan
        metadatos_filtrados = filtrar_metadatos(metadatos, ruta_imagen)

        # Paso 3: Generar el URL completo
        nombre_archivo = metadatos_filtrados['Nombre del archivo']
        url_completa = f"{base_url}{nombre_archivo}"

        # Paso 4: Verificar si el URL está accesible
        if verificar_url(url_completa):
            # Paso 5: Generar la consulta SQL si el URL es válido
            query = generar_query_insert(metadatos_filtrados, url_completa)
            consultas_ejecutadas.append(query)
        else:
            consultas_no_ejecutadas.append(f"{archivo} - URL no válida o inaccesible.")
    
    guardar_en_txt(f"{fecha}/querys_ejecutadas.txt", consultas_ejecutadas)
    guardar_en_txt(f"{fecha}/querys_no_ejecutadas.txt", consultas_no_ejecutadas)

    return consultas_ejecutadas, consultas_no_ejecutadas

# URL base
base_url = "https://plataformamonitoreo.blob.core.windows.net/electrogas/"

# Solicitar la ruta de la carpeta al usuario
ruta_carpeta = input("Introduce la ruta de la carpeta: ")

# Procesar la carpeta y generar las consultas para las imágenes válidas y las que fallaron
consultas_ejecutadas, consultas_no_ejecutadas = procesar_carpeta(ruta_carpeta, base_url)

# Mostrar el resumen en la consola
print("\nResumen de las consultas:")
print(f"Consultas ejecutadas correctamente: {len(consultas_ejecutadas)}")
print(f"Consultas no ejecutadas: {len(consultas_no_ejecutadas)}")
print(f"Los resultados han sido guardados en '{os.path.basename(ruta_carpeta)}/querys_ejecutadas.txt' y '{os.path.basename(ruta_carpeta)}/querys_no_ejecutadas.txt'.")
