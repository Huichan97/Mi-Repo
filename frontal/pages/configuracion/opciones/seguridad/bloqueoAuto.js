import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importar Picker desde el paquete correcto
import styles from '../../../styles';

const BloqueoAuto = () => {
  // Estado para el switch de activación del bloqueo automático
  const [bloqueoActivado, setBloqueoActivado] = useState(true);

  // Estado para el tiempo de bloqueo automático
  const [tiempoBloqueo, setTiempoBloqueo] = useState('1 mes'); // Valor predeterminado

  // Función para manejar el cambio del switch
  const toggleBloqueo = () => setBloqueoActivado(previousState => !previousState);

  // Función para confirmar la selección del tiempo de bloqueo
  const confirmarTiempoBloqueo = () => {
    Alert.alert(
      'Confirmación',
      `El tiempo de bloqueo automático se ha configurado a ${tiempoBloqueo}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Bloqueo Automático</Text>

      {/* Switch para activar o desactivar el bloqueo automático */}
      <View style={styles.switchContainer}>
        <Text style={styles.optionDescription}>Activar Bloqueo Automático</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={bloqueoActivado ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleBloqueo}
          value={bloqueoActivado}
        />
      </View>

      {/* Mostrar opciones de tiempo solo si el bloqueo está activado */}
      {bloqueoActivado && (
        <View>
          <Text style={styles.optionDescription}>Selecciona el tiempo de bloqueo:</Text>

          {/* Selector de tiempo de bloqueo */}
          <Picker
            selectedValue={tiempoBloqueo}
            style={styles.picker}
            onValueChange={(itemValue) => setTiempoBloqueo(itemValue)}
          >
            <Picker.Item label="1 semana" value="1 semana" />
            <Picker.Item label="2 semanas" value="2 semanas" />
            <Picker.Item label="1 mes" value="1 mes" />
            <Picker.Item label="3 meses" value="3 meses" />
            <Picker.Item label="6 meses" value="6 meses" />
            <Picker.Item label="1 año" value="1 año" />
          </Picker>

          {/* Botón para confirmar la selección */}
          <TouchableOpacity style={styles.button} onPress={confirmarTiempoBloqueo}>
            <Text style={styles.buttonText}>Confirmar Tiempo de Bloqueo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BloqueoAuto;
