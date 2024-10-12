import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../../../styles';

const AlertaSeg = () => {
  // Array con el historial de alertas de uso
  const historialUso = [
    {
      id: '1',
      dispositivo: 'Tu dispositivo',
      estado: 'Activo',
      ultimaVez: 'Hoy a las 10:00 AM',
    },
    {
      id: '2',
      dispositivo: 'Dispositivo Desconocido',
      estado: 'Inactivo',
      ultimaVez: 'Ayer a las 8:30 PM',
    },
    {
      id: '3',
      dispositivo: 'Laptop de trabajo',
      estado: 'Activo',
      ultimaVez: 'Hoy a las 8:45 AM',
    },
    {
      id: '4',
      dispositivo: 'Tableta',
      estado: 'Inactivo',
      ultimaVez: 'Hace 3 días a las 2:15 PM',
    },
  ];

  // Función para renderizar cada item del historial
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        {item.dispositivo} - {item.estado}
      </Text>
      <Text style={styles.optionDescription}>
        Última vez iniciado: {item.ultimaVez}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Ejecución</Text>
      
      {/* Mostrar historial de uso */}
      <FlatList
        data={historialUso}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AlertaSeg;
