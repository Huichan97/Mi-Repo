import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles';

const Verificacion = () => {
  // Estado para el correo principal
  const [correoPrincipal, setCorreoPrincipal] = useState('usuario@ejemplo.com');  // Correo registrado actual
  const [nuevoCorreoPrincipal, setNuevoCorreoPrincipal] = useState('');  // Nuevo correo que se quiere cambiar

  // Estado para el número de teléfono
  const [telefono, setTelefono] = useState('');

  // Estado para el segundo correo
  const [segundoCorreo, setSegundoCorreo] = useState('');

  // Función para cambiar el correo principal
  const cambiarCorreoPrincipal = () => {
    if (nuevoCorreoPrincipal.trim() === '') {
      Alert.alert('Error', 'El campo de correo no puede estar vacío.');
      return;
    }
    setCorreoPrincipal(nuevoCorreoPrincipal);
    Alert.alert('Confirmación', `Correo principal cambiado a ${nuevoCorreoPrincipal}`);
    setNuevoCorreoPrincipal('');
  };

  // Función para agregar el número de teléfono
  const agregarTelefono = () => {
    if (telefono.trim() === '') {
      Alert.alert('Error', 'El campo de número de teléfono no puede estar vacío.');
      return;
    }
    Alert.alert('Confirmación', `Número de teléfono ${telefono} agregado.`);
    setTelefono('');
  };

  // Función para agregar el segundo correo
  const agregarSegundoCorreo = () => {
    if (segundoCorreo.trim() === '') {
      Alert.alert('Error', 'El campo de segundo correo no puede estar vacío.');
      return;
    }
    Alert.alert('Confirmación', `Segundo correo ${segundoCorreo} agregado.`);
    setSegundoCorreo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación en Dos Pasos</Text>

      {/* Mostrar y cambiar el correo principal */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Correo principal registrado:</Text>
        <Text style={styles.cardText}>{correoPrincipal}</Text>

        {/* Input para cambiar el correo principal */}
        <TextInput
          style={styles.input}
          placeholder="Cambiar correo principal"
          value={nuevoCorreoPrincipal}
          onChangeText={setNuevoCorreoPrincipal}
        />
        <TouchableOpacity style={styles.button} onPress={cambiarCorreoPrincipal}>
          <Text style={styles.buttonText}>Cambiar Correo Principal</Text>
        </TouchableOpacity>
      </View>

      {/* Agregar número de teléfono */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Agregar número de teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TouchableOpacity style={styles.button} onPress={agregarTelefono}>
          <Text style={styles.buttonText}>Agregar Teléfono</Text>
        </TouchableOpacity>
      </View>

      {/* Agregar segundo correo */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Agregar un segundo correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Segundo correo"
          value={segundoCorreo}
          onChangeText={setSegundoCorreo}
        />
        <TouchableOpacity style={styles.button} onPress={agregarSegundoCorreo}>
          <Text style={styles.buttonText}>Agregar Segundo Correo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verificacion;
