import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Desbloqueo = ({ navigation }) => {
  const [inputPin, setInputPin] = useState('');
  const [inputPswd, setInputPswd] = useState('');

  const desbloquearApp = async () => {
    const savedPin = await AsyncStorage.getItem('userPin');
    const savedPswd = await AsyncStorage.getItem('userPassword');

    if ((savedPin && inputPin === savedPin) || (savedPswd && inputPswd === savedPswd)) {
      Alert.alert('Éxito', 'App desbloqueada correctamente');
      navigation.navigate('Home');  // Navegar de vuelta a Home después del desbloqueo
    } else {
      Alert.alert('Error', 'El PIN o contraseña es incorrecto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desbloquear App</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu PIN"
        value={inputPin}
        onChangeText={setInputPin}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="O ingresa tu contraseña"
        value={inputPswd}
        onChangeText={setInputPswd}
        secureTextEntry
      />

      <Button title="Desbloquear" onPress={desbloquearApp} />
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
});

export default Desbloqueo;
