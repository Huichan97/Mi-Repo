import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles';

const AdministrarCuenta = () => {
  // Simulación de datos del usuario
  const esPremium = true;  // Cambiar valor para probar free o premium
  const tarjetaRegistrada = '**** **** **** 4545';
  const ultimaFechaPago = '10 de Octubre 2024';

  // Beneficios para usuarios Premium
  const beneficiosPremium = [
    'Más espacio de almacenamiento',
    'Acceso a funciones exclusivas',
    'Agregar más testigos',
    'Atención al cliente prioritaria',
    'Has guardado 3gb de informacion. Sigue asi'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrar Cuenta</Text>

      {/* Mostrar si el usuario es Free o Premium */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Estado de la cuenta: {esPremium ? 'Usuario Premium' : 'Usuario Free'}
        </Text>
        
        {/* Mostrar beneficios si es Premium */}
        {esPremium && (
          <View>
            <Text style={styles.optionDescription}>Beneficios de ser Premium:</Text>
            {beneficiosPremium.map((beneficio, index) => (
              <Text key={index} style={styles.optionDescription}>
                - {beneficio}
              </Text>
            ))}
          </View>
        )}

        {/* Mostrar una opción para mejorar la cuenta si es Free */}
        {!esPremium && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mejorar a Premium</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mostrar detalles de la tarjeta registrada */}
      <View style={styles.card}>
        <Text style={styles.optionDescription}>Tarjeta Registrada:</Text>
        <Text style={styles.cardText}>{tarjetaRegistrada}</Text>

        {/* Mostrar la última fecha de pago si es Premium */}
        {esPremium && (
          <View>
            <Text style={styles.optionDescription}>Última fecha de pago:</Text>
            <Text style={styles.cardText}>{ultimaFechaPago}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AdministrarCuenta;
