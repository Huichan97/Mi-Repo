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
    nombre_archivo = os.path.basename(ruta_imagen)
    datetime = str(metadatos.get('Image DateTime', 'No disponible'))

    # Extraer coordenadas GPS
    latitud = longitud = altitud = 'No disponible'
    if 'GPS GPSLatitude' in metadatos and 'GPS GPSLatitudeRef' in metadatos:
        latitud = convertir_coordenadas_gps(metadatos['GPS GPSLatitude'].values, metadatos['GPS GPSLatitudeRef'].printable)
    if 'GPS GPSLongitude' in metadatos and 'GPS GPSLongitudeRef' in metadatos:
        longitud = convertir_coordenadas_gps(metadatos['GPS GPSLongitude'].values, metadatos['GPS GPSLongitudeRef'].printable)
    if 'GPS GPSAltitude' in metadatos:
        altitud = float(metadatos['GPS GPSAltitude'].values[0].num) / float(metadatos['GPS GPSAltitude'].values[0].den)

    # Obtener ancho y alto de la imagen
    width = metadatos.get('EXIF ExifImageWidth', 'No disponible')
    height = metadatos.get('EXIF ExifImageLength', 'No disponible')

    return {
        'Nombre del archivo': nombre_archivo,
        'Fecha y hora': datetime,
        'Latitud': latitud,
        'Longitud': longitud,
        'Altitud': altitud,
        'Ancho': width,
        'Alto': height
    }

def obtener_info_mapa(ruta_imagen):
    """
    Obtiene latitud, longitud, altitud y calcula el GSD.
    """
    # Extraer metadatos de la imagen
    metadatos = extraer_metadatos_exif(ruta_imagen)
    
    # Filtrar la información necesaria
    latitud, longitud, altitud = filtrar_metadatos(metadatos, ruta_imagen)['Latitud'], \
                                 filtrar_metadatos(metadatos, ruta_imagen)['Longitud'], \
                                 filtrar_metadatos(metadatos, ruta_imagen)['Altitud']
    
    # Obtener la longitud focal y el ancho de la imagen en píxeles
    if 'EXIF FocalLength' in metadatos:
        focal_length = float(metadatos['EXIF FocalLength'].values[0].num) / float(metadatos['EXIF FocalLength'].values[0].den)
    else:
        focal_length = 0

    if 'EXIF ExifImageWidth' in metadatos:
        image_width = int(metadatos['EXIF ExifImageWidth'].values[0])
    else:
        image_width = 0

    # Por si hay que cambiar el tamaño del sensor
    sensor_width = 36.0  # Ancho del sensor en mm

    # Calcular el GSD si es posible
    gsd = (altitud * sensor_width) / (focal_length * image_width) if altitud != 'No disponible' and focal_length and image_width else 'No disponible'

    return {
        'latitud': latitud,
        'longitud': longitud,
        'altitud': altitud,
        'gsd': gsd
    }

def generar_urls(fecha, nombre_archivo):
    partes_fecha = fecha.split('_')
    if len(partes_fecha) == 3:
        fecha_convertida = f"{partes_fecha[2]}/{partes_fecha[1]}/{partes_fecha[0]}"
    else:
        fecha_convertida = fecha

    url_completo = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/catalina.helmke%40kauel.com/{fecha_convertida}/{nombre_archivo}"
    url_completo_low = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/catalina.helmke%40kauel.com/{fecha_convertida}/low_{nombre_archivo}"
    url_simple = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/{nombre_archivo}"
    url_simple_low = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/low_{nombre_archivo}"

    return url_completo, url_completo_low, url_simple, url_simple_low

def verificar_url(url):
    try:
        respuesta = requests.head(url)
        return respuesta.status_code == 200
    except requests.ConnectionError:
        return False

def generar_query(datos_mapa, metadatos, urls):
    latitud, longitud, altitud = datos_mapa['latitud'], datos_mapa['longitud'], datos_mapa['altitud']
    gsd = datos_mapa['gsd']
    name = metadatos['Nombre del archivo']
    date = metadatos['Fecha y hora'].split()[0] if 'Fecha y hora' in metadatos else 'No disponible'
    datetime = metadatos['Fecha y hora']
    width = metadatos['Ancho']
    height = metadatos['Alto']
    
    # Validar URL y definir URL y low_url
    url = urls[0] if verificar_url(urls[0]) else (urls[2] if verificar_url(urls[2]) else 'NULL')
    low_url = urls[1] if verificar_url(urls[1]) else 'NULL'

    query = f"""
    INSERT INTO `files` 
    (`id`, `name`, `user_id`, `place_id`, 
    `latitude`, `longitude`, `altitude`, 
    `rel_alt`, `date`, `datetime`, 
    `url`, `low_url`, `heading`, 
    `gsd`, `width`, `height`, 
    `travel`, `origin`, `url_img_IA`, 
    `created_at`, `updated_at`, `deleted_at`)
    VALUES (
        NULL, '{name}', '77', '1', 
        '{latitud}', '{longitud}', '{altitud}', 
        NULL, '{date}', '{datetime}', 
        '{url}', '{low_url}', NULL, 
        '{gsd}', '{width}', '{height}', 
        NULL, 'manual', NULL, 
        '{datetime}', '{datetime}', NULL
    );
    """
    return query

def procesar_carpeta(carpeta, archivo_salida):
    fecha = os.path.basename(carpeta)
    consultas = []

    for archivo in os.listdir(carpeta):
        ruta_imagen = os.path.join(carpeta, archivo)
        if not os.path.isfile(ruta_imagen) or not archivo.lower().endswith(('.jpg', '.jpeg')):
            continue

        metadatos = extraer_metadatos_exif(ruta_imagen)
        datos_mapa = obtener_info_mapa(ruta_imagen)
        urls = generar_urls(fecha, archivo)
        metadatos_filtrados = filtrar_metadatos(metadatos, ruta_imagen)
        query = generar_query(datos_mapa, metadatos_filtrados, urls)
        consultas.append(query)

    # Guardar las consultas en el archivo de salida
    with open(archivo_salida, 'w') as file:
        for consulta in consultas:
            file.write(consulta + '\n')

    print(f"Consultas guardadas en {archivo_salida}")

if __name__ == '__main__':
    carpeta = input("Introduce la ruta de la carpeta: ")
    archivo_salida = input("Introduce el nombre del archivo de salida: ")
    procesar_carpeta(carpeta, archivo_salida)
