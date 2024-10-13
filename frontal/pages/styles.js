import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Contenedor principal (fondo general)
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#002b55", // Fondo general
  },

  // Contenedor para acciones críticas (Eliminar, Cerrar cuenta)
  containerCritical: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2e2e2e", // Fondo más oscuro para acciones críticas
  },

  // Contenedor personalizable (para futuras funcionalidades)
  containerPers: {
    flex: 1,
    padding: 20,
    // Este fondo será personalizable en futuras implementaciones
  },

  // Títulos generales
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },

  // Botones reutilizables (color normal celeste o cyan)
  button: {
    backgroundColor: "#00bcd4", // Color celeste para navegaciones y acciones no drásticas
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  // Botón para acciones críticas (Eliminar, Cerrar cuenta)
  buttonCritical: {
    backgroundColor: "#ff0000", // Rojo para acciones como eliminar o cerrar cuenta
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },

  // Botón para acciones modificables (Modificar, Ajustes)
  buttonModify: {
    backgroundColor: "#ffeb3b", // Amarillo para modificaciones u otros
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },

  // Texto para los botones
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  // Estilos para opciones de configuración
  optionsContainer: {
    flex: 1,
  },
  optionDescription: {
    fontSize: 14,
    color: "#f0f0f0",
    marginTop: 5,
  },

  // Cabecera para la pantalla de configuración
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  // Estilo específico para la pantalla de configuración
  configHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff6f00",
    textAlign: "center",
    marginBottom: 30,
  },

  // Estilo para los inputs (AgregarTestigo y similares)
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  // Tarjetas reutilizables
  card: {
    backgroundColor: "#rgb(5, 140, 230)", // Azul claro para tarjetas
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#rgb(255, 255, 255)", // Texto blanco en las tarjetas
  },

  // Estilo para la imagen del perfil
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: "center", // Centrar la imagen
  },

  // Para la funcionalidad de bloqueoAuto
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  // Estilo para el Picker
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 20,
  },

  // Alerta (amarillo claro para advertencias o información)
  alertContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffeeba", // Amarillo claro para alertas
    borderRadius: 10,
  },

  // Estilo para los gestos de contraseña
  gesturePassword: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default styles;
