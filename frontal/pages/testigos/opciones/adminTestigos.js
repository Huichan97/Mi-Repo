import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../styles';

const AdminTestigos = () => {
  // Datos de testigos simulados
  const testigos = [
    { id: '1', nombre: 'Juan Pérez', numero: '555-1234', circulo: 'Amigo cercano' },
    { id: '2', nombre: 'María García', numero: '555-5678', circulo: 'Familiar' },
    { id: '3', nombre: 'Carlos Sánchez', numero: '555-9876', circulo: 'Compañero de trabajo' },
    { id: '4', nombre: 'Luisa Martínez', numero: '555-6543', circulo: 'Vecina cercana' },
  ];

  // Renderizar cada item (testigo)
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.nombre}</Text>
      <Text style={styles.optionDescription}>Número: {item.numero}</Text>
      <Text style={styles.optionDescription}>Círculo cercano: {item.circulo}</Text>

      {/* Botones de modificar y eliminar */}
      <View style={styles.switchContainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert(`Modificar a ${item.nombre}`)}>
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => alert(`Eliminar a ${item.nombre}`)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botón para agregar testigo */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Agregar testigo')}>
        <Text style={styles.buttonText}>Agregar Testigo</Text>
      </TouchableOpacity>

      {/* Descripción sobre el apartado */}
      <Text style={[styles.optionDescription, { marginTop: 10, textAlign: 'center' }]}>
        Este apartado es para administrar a los testigos. Los testigos deben ser personas cercanas como hermanos, padres o mejores amigos, que recibirán información o mensajes del usuario cuando este ya no esté o decida dejar un mensaje al partir de este mundo.
      </Text>

      {/* Lista de testigos */}
      <FlatList
        data={testigos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AdminTestigos;
