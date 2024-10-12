import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../../../styles';

const DeleteConfirmation = () => {
  // Datos del perfil de usuario (puedes actualizar con la información real)
  const perfilUsuario = {
    nombre: 'Usuario123',
    almacenamiento: '2GB de 5GB usado',
    fechaRegistro: '12 Enero 2020',
    ultimaEntrada: '12 Octubre 2024 (Foto)',
    imagen: 'https://media.revistagq.com/photos/621343d2c789a63cc825a58b/16:9/w_2367,h_1331,c_limit/virgen%20a%20lo%2040.jpeg', // Puedes cambiar este enlace a la imagen que desees
  };

  // Función para mostrar el alert de confirmación
  const confirmarEliminacion = () => {
    Alert.alert(
      '¿Estás seguro?',
      '¿Estás seguro de perder tus recuerdos? Recuerda que una vez eliminada la cuenta ya no podrás recuperar tu información.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, estoy de acuerdo', onPress: () => console.log('Cuenta eliminada') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación de Eliminar Cuenta</Text>

      {/* Imagen del usuario */}
      <Image source={{ uri: perfilUsuario.imagen }} style={styles.profileImage} />

      {/* Mostrar información del perfil directamente sobre el fondo */}
      <Text style={styles.optionDescription}>Usuario: {perfilUsuario.nombre}</Text>
      <Text style={styles.optionDescription}>Almacenamiento usado: {perfilUsuario.almacenamiento}</Text>
      <Text style={styles.optionDescription}>Fecha de registro: {perfilUsuario.fechaRegistro}</Text>
      <Text style={styles.optionDescription}>Última entrada: {perfilUsuario.ultimaEntrada}</Text>

      {/* Botón para confirmar la eliminación de cuenta */}
      <TouchableOpacity style={styles.logoutButton} onPress={confirmarEliminacion}>
        <Text style={styles.logoutText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DeleteConfirmation;
