import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importar Picker desde el paquete correcto
import styles from '../../../styles';

const BloqueoAuto = () => {
  const [bloqueoActivado, setBloqueoActivado] = useState(true);
  const [tiempoBloqueo, setTiempoBloqueo] = useState('30'); // Valor predeterminado en segundos
  const [temporizadorActivo, setTemporizadorActivo] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  // Función para manejar el cambio del switch
  const toggleBloqueo = () => setBloqueoActivado(previousState => !previousState);

  // Función para confirmar la selección del tiempo de bloqueo
  const confirmarTiempoBloqueo = () => {
    Alert.alert(
      'Confirmación',
      `El tiempo de bloqueo automático se ha configurado a ${tiempoBloqueo} segundos.`,
      [{ text: 'OK' }]
    );
  };

  // Función para iniciar sesión (activar el temporizador)
  const iniciarSesion = () => {
    setSesionIniciada(true);
    setTemporizadorActivo(true);
    iniciarTemporizador();
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    Alert.alert(
      'Sesión Cerrada',
      'La sesión ha sido cerrada automáticamente por inactividad.',
      [{ text: 'OK' }]
    );
    setSesionIniciada(false);
    setTemporizadorActivo(false);
  };

  // Función que maneja el temporizador
  const iniciarTemporizador = () => {
    if (bloqueoActivado) {
      let tiempoRestante = parseInt(tiempoBloqueo);
      const intervalId = setInterval(() => {
        tiempoRestante -= 1;
        if (tiempoRestante <= 0) {
          clearInterval(intervalId);
          cerrarSesion(); // Cerrar la sesión cuando el tiempo llega a 0
        }
      }, 1000);
    }
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
          <Text style={styles.optionDescription}>Selecciona el tiempo de bloqueo (segundos):</Text>

          {/* Selector de tiempo de bloqueo */}
          <Picker
            selectedValue={tiempoBloqueo}
            style={styles.picker}
            onValueChange={(itemValue) => setTiempoBloqueo(itemValue)}
          >
            <Picker.Item label="10 segundos" value="10" />
            <Picker.Item label="20 segundos" value="20" />
            <Picker.Item label="30 segundos" value="30" />
            <Picker.Item label="60 segundos" value="60" />
          </Picker>

          {/* Botón para confirmar la selección */}
          <TouchableOpacity style={styles.button} onPress={confirmarTiempoBloqueo}>
            <Text style={styles.buttonText}>Confirmar Tiempo de Bloqueo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón para iniciar sesión */}
      {!sesionIniciada ? (
        <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.optionDescription}>Sesión Activa</Text>
      )}

      {/* Mostrar mensaje de sesión cerrada */}
      {!temporizadorActivo && !sesionIniciada && (
        <Text style={styles.optionDescription}>Sesión cerrada por inactividad</Text>
      )}
    </View>
  );
};

export default BloqueoAuto;
