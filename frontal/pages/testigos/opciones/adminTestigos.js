// AdminTestigos.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../../styles';

const AdminTestigos = ({ navigation }) => {
  const [testigos, setTestigos] = useState([]);

  // Función para obtener los testigos del backend
  const obtenerTestigos = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/testigos/todos');
      const data = await response.json();
      if (response.ok) {
        setTestigos(data);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los testigos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
      console.error('Error al obtener los testigos:', error);
    }
  };

  useEffect(() => {
    obtenerTestigos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.nombre}</Text>
      <Text style={styles.optionDescription}>Número: {item.telefono}</Text>
      <Text style={styles.optionDescription}>Círculo cercano: {item.circuloCercano}</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModificarTestigo', { testigoId: item.id })}>
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => navigation.navigate('EliminarTestigo', { testigoId: item.id })}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgregarTestigo')}>
        <Text style={styles.buttonText}>Agregar Testigo</Text>
      </TouchableOpacity>

      <Text style={[styles.optionDescription, { marginTop: 10, textAlign: 'center' }]}>
        Este apartado es para administrar a los testigos. Los testigos deben ser personas cercanas como hermanos,
        padres o mejores amigos, que recibirán información o mensajes del usuario cuando este ya no esté o decida
        dejar un mensaje al partir de este mundo.
      </Text>

      <FlatList
        data={testigos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AdminTestigos;
