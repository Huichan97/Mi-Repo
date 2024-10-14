import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Perfil = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Button
        title="Ir a Configuraciones"
        onPress={() => navigation.navigate('Configuraciones')}
      />
      <Button
        title="Ir a Testigos"
        onPress={() => navigation.navigate('Testigos')}
      />
      <Button
        title="Ir a Beneficiarios"
        onPress={() => navigation.navigate('Beneficiarios')}
      />
      <Button
        title="Ir a Historial"
        onPress={() => navigation.navigate('Historial')}
      />

      {/* Botón para configurar el bloqueo */}
      <Button
        title="Configurar Bloqueo"
        onPress={() => navigation.navigate('Bloqueo')}
      />

      {/* Cerrar sesión */}
      <Button
        title="Cerrar Sesión"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
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

export default Perfil;
