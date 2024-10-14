import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebase/firebase';  
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';  // Importamos para resetear la navegación

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      const user = auth.currentUser;
      if (user) {
        setSesionIniciada(true);
      }
    };
    verificarSesion();
  }, []);

  const iniciarSesion = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));  
      setSesionIniciada(true);
      Alert.alert('Éxito', 'Sesión iniciada correctamente');
      
      // Reseteamos la navegación para que no se pueda volver al login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Perfil' }],
        })
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('user');
      setSesionIniciada(false);
      Alert.alert('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
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
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Iniciar Sesión" onPress={iniciarSesion} />
          <Button
            title="Registrarse"
            onPress={() => navigation.navigate('Signup')} 
          />
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
