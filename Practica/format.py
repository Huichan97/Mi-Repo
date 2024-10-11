import os
import requests

def verificar_url(url_completa):
    try:
        respuesta = requests.head(url_completa)
        return respuesta.status_code == 200
    except requests.ConnectionError:
        return False

def generar_urls(fecha, nombre_archivo):
    
    # Convertir la fecha de formato 'dd_mm_aaaa' a 'aaaa/mm/dd'
    partes_fecha = fecha.split('_')
    if len(partes_fecha) == 3:
        fecha_convertida = f"{partes_fecha[2]}/{partes_fecha[1]}/{partes_fecha[0]}"
    else:
        fecha_convertida = fecha  # En caso de que no esté en el formato esperado

    # Generar URLs en los formatos solicitados
    url_completo = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/catalina.helmke%40kauel.com/{fecha_convertida}/{nombre_archivo}"
    url_completo_low = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/catalina.helmke%40kauel.com/{fecha_convertida}/low_{nombre_archivo}"
    url_simple = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/{nombre_archivo}"
    url_simple_low = f"https://plataformamonitoreo.blob.core.windows.net/electrogas/low_{nombre_archivo}"

    return url_completo, url_completo_low, url_simple, url_simple_low

def validar_imagen(fecha, nombre_archivo, validados):
    url_completo, url_completo_low, url_simple, url_simple_low = generar_urls(fecha, nombre_archivo)

    # Validar en formato completo
    if verificar_url(url_completo):
        print(f"Imagen validada en formato completo:       {url_completo}")
        validados['completo'].append(nombre_archivo)
        return True
    else:
        print(f"Imagen no encontrada en formato completo:  {url_completo}")

    # Validar en formato completo_low
    if verificar_url(url_completo_low):
        print(f"Imagen validada en formato completo_low:   {url_completo_low}")
        validados['completo_low'].append(nombre_archivo)
        return True
    else:
        print(f"Imagen no encontrada en formato completo_low: {url_completo_low}")

    # Validar en formato simple
    if verificar_url(url_simple):
        print(f"Imagen validada en formato simple:         {url_simple}")
        validados['simple'].append(nombre_archivo)
        return True
    else:
        print(f"Imagen no encontrada en formato simple:    {url_simple}")

    # Validar en formato simple_low
    if verificar_url(url_simple_low):
        print(f"Imagen validada en formato simple_low:     {url_simple_low}")
        validados['simple_low'].append(nombre_archivo)
        return True
    else:
        print(f"Imagen no encontrada en formato simple_low: {url_simple_low}")

    print(f"No se pudo validar la imagen {nombre_archivo}, no aparece en los URLs (Error 404)")
    return False

def procesar_carpeta(carpeta):
    consulta_no_ejec = []
    validados = {
        'completo': [],
        'completo_low': [],
        'simple': [],
        'simple_low': []
    }

    # Obtener la fecha de la carpeta
    fecha = os.path.basename(carpeta)

    for archivo in os.listdir(carpeta):
        ruta_imagen = os.path.join(carpeta, archivo)

        if not os.path.isfile(ruta_imagen) or not archivo.lower().endswith(('.jpg', '.jpeg')):
            consulta_no_ejec.append(f"{archivo} - No es un archivo válido o no existe.")
            continue

        # Validar la imagen en los diferentes formatos
        if not validar_imagen(fecha, archivo, validados):
            consulta_no_ejec.append(f"{archivo} - Imagen no encontrada en los URLs proporcionados.")

    return validados, consulta_no_ejec

if __name__ == '__main__':
    # preguntas reutilizables
    while True:
        # pasar la ruta
        ruta_carpeta = input("Introduce la ruta de la carpeta: ")

        # resumen de validaciones
        validados, consultas_no_ejecutadas = procesar_carpeta(ruta_carpeta)

        print("\nResumen de las validaciones:")
        print(f"Imágenes en formato completo validados:       {len(validados['completo'])}")
        print(f"Imágenes en formato completo_low validados:   {len(validados['completo_low'])}")
        print(f"Imágenes en formato simple validados:         {len(validados['simple'])}")
        print(f"Imágenes en formato simple_low validados:     {len(validados['simple_low'])}")
        print(f"Imágenes no validadas:                        {len(consultas_no_ejecutadas)}")

        if consultas_no_ejecutadas:
            print("\nDetalles de las imágenes no validadas:")
            for error in consultas_no_ejecutadas:
                print(error)

        # siguiente ronda?
        respuesta = input("\n¿Quieres comprobar otra carpeta? (s/n): ").strip().lower()
        if respuesta != 's':
            print("Programa finalizado.")
            break