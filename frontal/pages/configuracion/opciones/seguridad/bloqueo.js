import React, { useState } from 'react';
import { View, Text, Switch, Alert, TouchableOpacity } from 'react-native';
import styles from '../../../styles';

const Bloqueo = () => {
  // Estado para el switch de activación de cada sistema de seguridad
  const [pinActivado, setPinActivado] = useState(false);
  const [patronActivado, setPatronActivado] = useState(false);
  const [huellaActivado, setHuellaActivado] = useState(false);

  // Funciones para manejar los switches
  const togglePin = () => setPinActivado(previousState => !previousState);
  const togglePatron = () => setPatronActivado(previousState => !previousState);
  const toggleHuella = () => setHuellaActivado(previousState => !previousState);

  // Función para manejar el mensaje si algún sistema está desactivado
  const mostrarAlertaSeguridad = () => {
    Alert.alert(
      'Importante',
      'Esta es una aplicación donde puedes ser tú mismo, por lo mismo queremos que te mantengas lo más seguro posible ante cualquier actividad mal intencionada por terceros.',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloqueo con PIN/Patrón/Huella</Text>

      {/* Switch para activar o desactivar PIN */}
      <View style={styles.switchContainer}>
        <Text style={styles.optionDescription}>Activar PIN</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={pinActivado ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={togglePin}
          value={pinActivado}
        />
      </View>

      {/* Switch para activar o desactivar Patrón */}
      <View style={styles.switchContainer}>
        <Text style={styles.optionDescription}>Activar Patrón</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={patronActivado ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={togglePatron}
          value={patronActivado}
        />
      </View>

      {/* Switch para activar o desactivar Huella */}
      <View style={styles.switchContainer}>
        <Text style={styles.optionDescription}>Activar Huella</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={huellaActivado ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleHuella}
          value={huellaActivado}
        />
      </View>

      {/* Si todos los sistemas están desactivados, muestra la leyenda */}
      {!pinActivado && !patronActivado && !huellaActivado && (
        <View style={styles.alertContainer}>
          <Text style={[styles.optionDescription, { textAlign: 'left', color: '#333' }]}>
            Esta es una aplicación donde puedes ser tú mismo, por lo mismo queremos que te mantengas lo más seguro posible ante cualquier actividad mal intencionada por terceros.
          </Text>

          {/* Botón para mostrar alerta con mensaje de seguridad */}
          <TouchableOpacity style={styles.button} onPress={mostrarAlertaSeguridad}>
            <Text style={styles.buttonText}>Más información</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Bloqueo;
