import os
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

def filtrar_metadatos(metadatos):
    latitud = longitud = altitud = 'No disponible'
    
    # Extraer coordenadas GPS en formato decimal
    if 'GPS GPSLatitude' in metadatos and 'GPS GPSLatitudeRef' in metadatos:
        latitud = convertir_coordenadas_gps(metadatos['GPS GPSLatitude'].values, metadatos['GPS GPSLatitudeRef'].printable)
    if 'GPS GPSLongitude' in metadatos and 'GPS GPSLongitudeRef' in metadatos:
        longitud = convertir_coordenadas_gps(metadatos['GPS GPSLongitude'].values, metadatos['GPS GPSLongitudeRef'].printable)
    if 'GPS GPSAltitude' in metadatos:
        altitud = float(metadatos['GPS GPSAltitude'].values[0].num) / float(metadatos['GPS GPSAltitude'].values[0].den)
    return latitud, longitud, altitud

def calcular_gsd(altitud, sensor_width, focal_length, image_width):
    gsd = (altitud * sensor_width) / (focal_length * image_width)
    return gsd

def obtener_info_mapa(ruta_imagen):
    # Extraer metadatos de la imagen
    metadatos = extraer_metadatos_exif(ruta_imagen)
    
    # Filtrar la información necesaria
    latitud, longitud, altitud = filtrar_metadatos(metadatos)
    
    # Obtener la longitud focal y el ancho de la imagen en píxeles
    if 'EXIF FocalLength' in metadatos:
        focal_length = float(metadatos['EXIF FocalLength'].values[0].num) / float(metadatos['EXIF FocalLength'].values[0].den)
    else:
        focal_length = 0

    if 'EXIF ExifImageWidth' in metadatos:
        image_width = int(metadatos['EXIF ExifImageWidth'].values[0])
    else:
        image_width = 0

    sensor_width = 36.0  # Ancho del sensor en mm

    gsd = calcular_gsd(altitud, sensor_width, focal_length, image_width) if altitud != 'No disponible' and focal_length and image_width else 'No disponible'

    return {
        'latitud': latitud,
        'longitud': longitud,
        'altitud': altitud,
        'gsd': gsd
    }

def procesar_carpeta(carpeta):
    resultados = []
    for archivo in os.listdir(carpeta):
        ruta_imagen = os.path.join(carpeta, archivo)
        if os.path.isfile(ruta_imagen) and archivo.lower().endswith(('.jpg', '.jpeg')):
            # Obtener la información del mapa para cada imagen
            info_mapa = obtener_info_mapa(ruta_imagen)
            resultados.append({
                'archivo': archivo,
                'latitud': info_mapa['latitud'],
                'longitud': info_mapa['longitud'],
                'altitud': info_mapa['altitud'],
                'gsd': info_mapa['gsd']
            })
    return resultados

def procesar_imagen(ruta_imagen):
    # Obtener la información del mapa para la imagen proporcionada
    info_mapa = obtener_info_mapa(ruta_imagen)
    resultado = {
        'archivo': os.path.basename(ruta_imagen),
        'latitud': info_mapa['latitud'],
        'longitud': info_mapa['longitud'],
        'altitud': info_mapa['altitud'],
        'gsd': info_mapa['gsd']
    }
    return resultado

if __name__ == '__main__':
    # Preguntar al usuario si quiere analizar una carpeta o una imagen
    opcion = input("¿Qué quieres analizar? (carpeta/imagen): ").strip().lower()

    if opcion == 'carpeta':
        ruta_carpeta = input("Introduce la ruta de la carpeta: ").strip()
        resultados = procesar_carpeta(ruta_carpeta)

        # Mostrar los resultados en la consola
        for resultado in resultados:
            print(f"Archivo: {resultado['archivo']}")
            print(f"Latitud: {resultado['latitud']}")
            print(f"Longitud: {resultado['longitud']}")
            print(f"Altitud: {resultado['altitud']} metros")
            if resultado['gsd'] != 'No disponible':
                print(f"GSD: {resultado['gsd']:.6f} metros por píxel")
            else:
                print("GSD: No se pudo calcular el GSD")
            print("="*50)

    elif opcion == 'imagen':
        ruta_imagen = input("Introduce la ruta de la imagen: ").strip()
        resultado = procesar_imagen(ruta_imagen)

        # Mostrar el resultado en la consola
        print(f"Archivo: {resultado['archivo']}")
        print(f"Latitud: {resultado['latitud']}")
        print(f"Longitud: {resultado['longitud']}")
        print(f"Altitud: {resultado['altitud']} metros")
        if resultado['gsd'] != 'No disponible':
            print(f"GSD: {resultado['gsd']:.6f} metros por píxel")
        else:
            print("GSD: No se pudo calcular el GSD")
        print("="*50)

    else:
        print("Opción no válida. Por favor, elige 'carpeta' o 'imagen'.")
