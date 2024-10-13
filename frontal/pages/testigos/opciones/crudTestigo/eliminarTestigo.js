// eliminarTestigo.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../styles';

const EliminarTestigo = ({ route, navigation }) => {
  const { testigoId } = route.params;

  const eliminarTestigo = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/testigos/eliminar/${testigoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Testigo eliminado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No se pudo eliminar el testigo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.containerCritical}>
      <Text style={styles.title}>Eliminar Testigo</Text>
      <Text style={styles.optionDescription}>
        Estás a punto de eliminar un testigo. Esta acción es irreversible y el testigo ya no tendrá acceso a tu contenido en caso de que fallezcas o decidas dejar un mensaje. ¿Estás seguro de continuar?
      </Text>

      <TouchableOpacity style={styles.buttonCritical} onPress={eliminarTestigo}>
        <Text style={styles.buttonText}>Eliminar Testigo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonModify} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EliminarTestigo;
