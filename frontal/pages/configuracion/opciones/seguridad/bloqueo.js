import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bloqueo = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [pswd, setPswd] = useState('');
  const [bloqueoActivado, setBloqueoActivado] = useState(false); // Estado del switch

  useEffect(() => {
    // Cargar el PIN y estado de bloqueo desde AsyncStorage al iniciar
    const cargarBloqueo = async () => {
      const storedPin = await AsyncStorage.getItem('userPin');
      const storedPswd = await AsyncStorage.getItem('userPassword');
      const bloqueo = await AsyncStorage.getItem('bloqueoActivado');

      if (storedPin) setPin(storedPin);
      if (storedPswd) setPswd(storedPswd);
      if (bloqueo === 'true') setBloqueoActivado(true);
    };

    cargarBloqueo();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !bloqueoActivado;
    setBloqueoActivado(newValue);

    if (newValue) {
      await AsyncStorage.setItem('bloqueoActivado', 'true');
      Alert.alert('Bloqueo activado', 'El bloqueo de la app está activado');
    } else {
      await AsyncStorage.setItem('bloqueoActivado', 'false');
      Alert.alert('Bloqueo desactivado', 'El bloqueo de la app ha sido desactivado');
    }
  };

  const habilitarBloqueo = async () => {
    if (!pin && !pswd) {
      Alert.alert('Error', 'Debes ingresar un PIN o una contraseña');
      return;
    }

    try {
      if (pin) {
        await AsyncStorage.setItem('userPin', pin);  // Guardamos el PIN
      }
      if (pswd) {
        await AsyncStorage.setItem('userPassword', pswd);  // Guardamos la contraseña
      }
      await AsyncStorage.setItem('bloqueoActivado', 'true');
      setBloqueoActivado(true);
      Alert.alert('Bloqueo activado', 'Has activado el bloqueo de la app');
    } catch (error) {
      Alert.alert('Error', 'No se pudo activar el bloqueo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Bloqueo</Text>

      {/* Input para el PIN o contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa un PIN"
        value={pin}  // Mostramos el PIN cargado desde AsyncStorage
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={6}
      />
      <TextInput
        style={styles.input}
        placeholder="O ingresa una contraseña"
        value={pswd}  // Mostramos la contraseña cargada desde AsyncStorage
        onChangeText={setPswd}
        secureTextEntry
      />

      {/* Switch para habilitar/deshabilitar bloqueo */}
      <View style={styles.switchContainer}>
        <Text>Habilitar Bloqueo</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={bloqueoActivado}  // El switch refleja el estado actual del bloqueo
        />
      </View>

      <Button title="Guardar y Activar Bloqueo" onPress={habilitarBloqueo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Bloqueo;
