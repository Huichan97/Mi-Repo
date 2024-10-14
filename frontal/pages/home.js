import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [bloqueoActivado, setBloqueoActivado] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Verificamos si el bloqueo está activado
    const verificarBloqueo = async () => {
      const bloqueo = await AsyncStorage.getItem('bloqueoActivado');
      if (bloqueo === 'true') {
        setBloqueoActivado(true);
      } else {
        setBloqueoActivado(false);
      }
    };
    verificarBloqueo();

    // Detectamos si la app se minimiza o vuelve a ser activa
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        verificarBloqueo();
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState, navigation]);

  const bloquearDispositivo = async () => {
    if (bloqueoActivado) {
      const pin = await AsyncStorage.getItem('userPin');
      const pswd = await AsyncStorage.getItem('userPassword');

      if (pin || pswd) {
        Alert.alert('Dispositivo bloqueado', 'La aplicación ha sido bloqueada');
        // Aquí se puede añadir la lógica para mostrar la pantalla de desbloqueo
      } else {
        Alert.alert('Error', 'No se ha configurado un PIN o contraseña');
      }
    } else {
      Alert.alert('No se puede bloquear', 'No se puede bloquear porque no está habilitado el bloqueo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App</Text>

      {/* Botón para bloquear la app, muestra mensaje si el bloqueo no está activado */}
      <Button title="Bloquear App" onPress={bloquearDispositivo} />

      <Button title="Ir a Configuraciones" onPress={() => navigation.navigate('Configuraciones')} />
      <Button title="Ir a Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
