import os
import requests
import exifread

def extraer_metadatos_exif(ruta_imagen):
    """Extrae todos los metadatos EXIF de la imagen."""
    with open(ruta_imagen, 'rb') as archivo_imagen:
        metadatos = exifread.process_file(archivo_imagen)
    return metadatos

def convertir_coordenadas_gps(coordenadas, referencia):
    """Convierte coordenadas GPS a formato decimal."""
    grados = float(coordenadas[0].num) / float(coordenadas[0].den)
    minutos = float(coordenadas[1].num) / float(coordenadas[1].den) / 60
    segundos = float(coordenadas[2].num) / float(coordenadas[2].den) / 3600
    decimal = grados + minutos + segundos
    if referencia in ['S', 'W']: 
        decimal = -decimal
    return decimal

def filtrar_metadatos(metadatos):
    datetime = metadatos.get('Image DateTime', 'No disponible')

    # Extraer coordenadas GPS en formato decimal
    latitud = longitud = 'No disponible'
    if 'GPS GPSLatitude' in metadatos and 'GPS GPSLatitudeRef' in metadatos:
        latitud = convertir_coordenadas_gps(metadatos['GPS GPSLatitude'].values, metadatos['GPS GPSLatitudeRef'].printable)
    if 'GPS GPSLongitude' in metadatos and 'GPS GPSLongitudeRef' in metadatos:
        longitud = convertir_coordenadas_gps(metadatos['GPS GPSLongitude'].values, metadatos['GPS GPSLongitudeRef'].printable)

    nombre_archivo = os.path.basename(ruta_imagen)

    # Crear el diccionario con los datos filtrados
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

def imprimir_metadatos(metadatos_filtrados):
    print("Metadatos seleccionados:")
    print("="*50)
    for clave, valor in metadatos_filtrados.items():
        print(f"{clave}: {valor}")

# URL base
base_url = "https://plataformamonitoreo.blob.core.windows.net/electrogas/"


ruta_imagen = input("Introduce la ruta de la imagen: ")

if not os.path.isfile(ruta_imagen):
    print("No puedo generar el script porque el archivo no existe.")
else:
    # Paso 1: Extraer todos los metadatos
    metadatos = extraer_metadatos_exif(ruta_imagen)

    # Paso 2: Filtrar los metadatos que se necesitan
    metadatos_filtrados = filtrar_metadatos(metadatos)

    # Paso 3: Generar el URL completo
    nombre_archivo = metadatos_filtrados['Nombre del archivo']
    url_completa = f"{base_url}{nombre_archivo}"

    # Paso 4: Verificar si el URL está accesible
    if verificar_url(url_completa):
        # Paso 5: Generar la consulta SQL si el URL es válido
        query = generar_query_insert(metadatos_filtrados, url_completa)
        # Imprimir los metadatos y la consulta generada
        imprimir_metadatos(metadatos_filtrados)
        print("\nConsulta SQL generada:")
        print(query)
    else:
        print("No puedo generar el script porque el URL no es válido.")
