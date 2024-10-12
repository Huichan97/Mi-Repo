import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles';

const Verificacion = () => {
  const [correoPrincipal, setCorreoPrincipal] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');

  // Función para obtener el correo actual del backend
  const obtenerCorreoActualizado = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/usuario/obtener-correo');  // Cambiar localhost por 10.0.2.2 para emulador Android

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error en la solicitud:', errorData);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setCorreoPrincipal(data.correo);  // Actualiza el correo en el frontend
      } else {
        Alert.alert('Error', data.message || 'No se pudo obtener el correo actualizado.');
      }
    } catch (error) {
      console.error('Error al obtener el correo:', error);
      Alert.alert('Error', 'Hubo un problema al obtener el correo.');
    }
  };

  // Función para enviar el correo de confirmación
  const enviarCorreoConfirmacion = async () => {
    if (nuevoCorreo.trim() === '') {
      Alert.alert('Error', 'El campo de correo no puede estar vacío.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/usuario/enviar-verificacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoOriginal: correoPrincipal,   // Correo actual
          correoReemplazo: nuevoCorreo,      // Nuevo correo
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Éxito', 'Se ha enviado un correo de confirmación al nuevo correo.');
        setNuevoCorreo('');  // Limpiar el campo de entrada
      } else {
        Alert.alert('Error', data.message || 'No se pudo enviar el correo de confirmación.');
      }
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el correo de confirmación.');
    }
  };

  useEffect(() => {
    obtenerCorreoActualizado();  // Obtiene el correo cuando se monta el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación en Dos Pasos</Text>

      {/* Mostrar el correo principal */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Correo principal registrado:</Text>
        <Text style={styles.cardText}>{correoPrincipal}</Text>
      </View>

      {/* Input para ingresar el nuevo correo */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Cambiar correo principal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa un nuevo correo"
          value={nuevoCorreo}
          onChangeText={setNuevoCorreo}
        />
        <TouchableOpacity style={styles.button} onPress={enviarCorreoConfirmacion}>
          <Text style={styles.buttonText}>Enviar Confirmación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verificacion;
