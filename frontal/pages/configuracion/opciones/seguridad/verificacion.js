import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth, EmailAuthProvider } from '../../../../firebase/firebase';  // Importa Firebase Auth
import styles from '../../../styles';

const Verificacion = () => {
  const [correoPrincipal, setCorreoPrincipal] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [password, setPassword] = useState('');  // Añadir input para la contraseña

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCorreoPrincipal(user.email);  // Establece el correo actual del usuario
    } else {
      Alert.alert('Error', 'No hay un usuario autenticado. Inicia sesión.');
    }
  }, []);

  // Reautenticar al usuario antes de cambiar el correo
  const reautenticarUsuario = async () => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);  // Usa la contraseña del usuario
      try {
        await user.reauthenticateWithCredential(credential);
        console.log('Usuario reautenticado');
      } catch (error) {
        console.error('Error en la reautenticación:', error);
        Alert.alert('Error', 'No se pudo reautenticar. Revisa tu contraseña.');
      }
    }
  };

  const enviarCorreoConfirmacion = async () => {
    if (!nuevoCorreo.trim()) {
      Alert.alert('Error', 'El campo de correo no puede estar vacío.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Primero, reautenticamos al usuario
        await reautenticarUsuario();

        // Luego, actualizamos el correo
        await user.updateEmail(nuevoCorreo);
        await user.sendEmailVerification({
          url: 'https://your-app.com/verify?email=' + nuevoCorreo,
          handleCodeInApp: true,
        });

        Alert.alert('Éxito', 'Se ha enviado un correo de verificación al nuevo correo.');
        setNuevoCorreo('');
      } else {
        Alert.alert('Error', 'No hay un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el correo de confirmación.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación en Dos Pasos</Text>

      {/* Mostrar el correo principal */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Correo principal registrado:</Text>
        <Text style={styles.cardText}>{correoPrincipal || 'No tienes un correo registrado'}</Text>
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

        {/* Input para ingresar la contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={enviarCorreoConfirmacion}>
          <Text style={styles.buttonText}>Enviar Confirmación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verificacion;
