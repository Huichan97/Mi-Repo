import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles';

const PrivacidadDatos = () => {
  const [camaraPermitido, setCamaraPermitido] = useState(false);
  const [ubicacionPermitido, setUbicacionPermitido] = useState(false);
  const [archivosPermitido, setArchivosPermitido] = useState(false);
  const [microfonoPermitido, setMicrofonoPermitido] = useState(false);
  const [contactosPermitido, setContactosPermitido] = useState(false);

  const handlePermisoAlert = (permiso, estado, setEstado) => {
    Alert.alert(
      `Permiso para ${permiso}`,
      `El permiso para ${permiso} está ${estado ? 'Activado' : 'Desactivado'}. ¿Quieres cambiar el estado?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: estado ? 'Desactivar' : 'Activar',
          onPress: () => setEstado(!estado),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacidad de Datos</Text>

      {/* Permiso para la cámara */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePermisoAlert('Cámara', camaraPermitido, setCamaraPermitido)}
      >
        <Text style={styles.buttonText}>Permiso para Cámara</Text>
        <Text style={styles.optionDescription}>
          Estado: {camaraPermitido ? 'Activo' : 'Desactivado'}
        </Text>
      </TouchableOpacity>

      {/* Permiso para la ubicación */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePermisoAlert('Ubicación', ubicacionPermitido, setUbicacionPermitido)}
      >
        <Text style={styles.buttonText}>Permiso para Ubicación</Text>
        <Text style={styles.optionDescription}>
          Estado: {ubicacionPermitido ? 'Activo' : 'Desactivado'}
        </Text>
      </TouchableOpacity>

      {/* Permiso para archivos locales */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePermisoAlert('Archivos Locales', archivosPermitido, setArchivosPermitido)}
      >
        <Text style={styles.buttonText}>Permiso para Archivos Locales</Text>
        <Text style={styles.optionDescription}>
          Estado: {archivosPermitido ? 'Activo' : 'Desactivado'}
        </Text>
      </TouchableOpacity>

      {/* Permiso para el micrófono */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePermisoAlert('Micrófono', microfonoPermitido, setMicrofonoPermitido)}
      >
        <Text style={styles.buttonText}>Permiso para Micrófono</Text>
        <Text style={styles.optionDescription}>
          Estado: {microfonoPermitido ? 'Activo' : 'Desactivado'}
        </Text>
      </TouchableOpacity>

      {/* Permiso para contactos */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePermisoAlert('Contactos', contactosPermitido, setContactosPermitido)}
      >
        <Text style={styles.buttonText}>Permiso para Contactos</Text>
        <Text style={styles.optionDescription}>
          Estado: {contactosPermitido ? 'Activo' : 'Desactivado'}
        </Text>
      </TouchableOpacity>

      {/* Otras opciones de privacidad */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Otras Opciones de Privacidad</Text>
        <Text style={styles.optionDescription}>Consulta otras configuraciones de privacidad.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrivacidadDatos;
