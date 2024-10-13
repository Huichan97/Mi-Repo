import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles'; // Asegúrate de que tengas tus estilos globales importados

const ModificarTestigo = ({ route, navigation }) => {
  const { testigoId } = route.params; // Se recibe el ID del testigo desde la navegación

  const [nombre, setNombre] = useState('');
  const [circuloCercano, setCirculoCercano] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  // Función para obtener los datos del testigo que se va a modificar
  const obtenerTestigo = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/testigos/${testigoId}`);
      const data = await response.json();

      if (response.ok) {
        setNombre(data.nombre);
        setCirculoCercano(data.circuloCercano);
        setTelefono(data.telefono);
        setCorreo(data.correo);
      } else {
        Alert.alert('Error', 'No se pudo cargar el testigo');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
      console.error(error);
    }
  };

  // Cargar los datos del testigo al montar el componente
  useEffect(() => {
    obtenerTestigo();
  }, []);

  const modificarTestigo = async () => {
    if (!nombre || !circuloCercano || !telefono || !correo) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const response = await fetch(`http://10.0.2.2:3000/testigos/modificar/${testigoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          circuloCercano,
          telefono,
          correo,
        }),
      });
  
      // Verifica si la respuesta es válida antes de analizarla
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', 'Testigo modificado correctamente');
        navigation.goBack(); // Volver a la página anterior
      } else {
        const errorData = await response.text(); // Leer la respuesta como texto
        console.error('Error en el servidor:', errorData);
        Alert.alert('Error', 'No se pudo modificar el testigo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
      console.error('Error al modificar el testigo:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modificar Testigo</Text>

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

      <TouchableOpacity style={styles.button} onPress={modificarTestigo}>
        <Text style={styles.buttonText}>Modificar Testigo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModificarTestigo;
