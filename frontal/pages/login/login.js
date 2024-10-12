import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Verificar si la sesión está activa
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setSesionIniciada(true);
      }
    };
    verificarSesion();
  }, []);

  const iniciarSesion = async () => {
    try {
      const respuesta = await fetch('http://192.168.X.X:3000/usuario/login', { // Cambia a /usuario/login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena }),
      });
  
      const data = await respuesta.json();
      console.log('Respuesta del servidor:', data); // Verifica la respuesta del servidor
  
      if (data.success) {
        await AsyncStorage.setItem('token', data.token);
        setSesionIniciada(true);
        Alert.alert('Éxito', 'Sesión iniciada correctamente');
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };
  

  const cerrarSesion = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            setSesionIniciada(false);
            Alert.alert('Sesión cerrada');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {sesionIniciada ? (
        <View>
          <Text style={styles.title}>Sesión Iniciada</Text>
          <Button title="Cerrar Sesión" onPress={cerrarSesion} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />
          <Button title="Iniciar Sesión" onPress={iniciarSesion} />
          {cargando && <Text style={{ marginTop: 10 }}>Cargando...</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Login;
