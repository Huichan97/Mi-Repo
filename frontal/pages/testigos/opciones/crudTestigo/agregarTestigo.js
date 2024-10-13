import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles'; // Asegúrate de que tengas tus estilos globales importados

const AgregarTestigo = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [circuloCercano, setCirculoCercano] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const agregarTestigo = async () => {
    if (!nombre || !circuloCercano || !telefono || !correo) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/testigos/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Math.floor(Math.random() * 1000), // Generar un id aleatorio
          nombre,
          circuloCercano,
          telefono,
          correo,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Testigo agregado correctamente.');
        navigation.goBack(); // Volver a la página anterior
      } else {
        Alert.alert('Error', 'No se pudo agregar el testigo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Testigo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del testigo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Círculo cercano (ej: Amigo, Familiar)"
        value={circuloCercano}
        onChangeText={setCirculoCercano}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={agregarTestigo}>
        <Text style={styles.buttonText}>Agregar Testigo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgregarTestigo;
