import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';

const Seguridad = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacidad y Seguridad</Text>

      {/* Verificación en dos pasos */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verificacion')}>
        <Text style={styles.buttonText}>Verificación en Dos Pasos</Text>
        <Text style={styles.optionDescription}>Añade una capa extra de seguridad con códigos enviados a tu correo o teléfono.</Text>
      </TouchableOpacity>

      {/* Bloqueo de aplicación con pin, patrón o huella */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bloqueo')}>
        <Text style={styles.buttonText}>Bloqueo con PIN/Patrón/Huella</Text>
        <Text style={styles.optionDescription}>Configura un PIN, patrón o utiliza tu huella para desbloquear la aplicación.</Text>
      </TouchableOpacity>

      {/* Bloqueo automático */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BloqueoAuto')}>
        <Text style={styles.buttonText}>Bloqueo Automático</Text>
        <Text style={styles.optionDescription}>Configura un tiempo de inactividad tras el cual la aplicación se bloqueará automáticamente.</Text>
      </TouchableOpacity>

      {/* Alerta de seguridad */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlertaSeg')}>
        <Text style={styles.buttonText}>Alertas de Seguridad</Text>
        <Text style={styles.optionDescription}>Recibe notificaciones cuando se detecten intentos de acceso sospechosos.</Text>
      </TouchableOpacity>

      {/* Privacidad de datos */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PrivacidadDatos')}>
        <Text style={styles.buttonText}>Privacidad de Datos</Text>
        <Text style={styles.optionDescription}>Gestiona los permisos de acceso a tus datos personales, como cámara o ubicación.</Text>
      </TouchableOpacity>

      {/* Eliminar cuenta */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Confirmacion')}>
        <Text style={styles.logoutText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Seguridad;
