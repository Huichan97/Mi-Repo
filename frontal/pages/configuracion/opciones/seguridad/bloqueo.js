import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Nuevo Picker
import styles from '../../../styles'; // Usar los estilos del archivo style.js

const Bloqueo = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [pin, setPin] = useState('');
  const [pinDesbloqueo, setPinDesbloqueo] = useState('');

  const configurarBloqueo = () => {
    // Lógica para configurar el PIN o el bloqueo seleccionado
    alert('Bloqueo configurado');
  };

  const desbloquearDispositivo = () => {
    // Lógica para desbloquear el dispositivo usando el pinDesbloqueo
    if (pinDesbloqueo === pin) {
      alert('Dispositivo desbloqueado');
    } else {
      alert('PIN incorrecto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Bloqueo</Text>

      {/* Selector de tipo de bloqueo */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Tipo de bloqueo:</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Seleccione un tipo" value="" />
          <Picker.Item label="PIN" value="pin" />
          <Picker.Item label="Contraseña" value="password" />
        </Picker>
      </View>

      {/* Input para configurar el PIN */}
      {selectedValue === 'pin' && (
        <TextInput
          style={styles.input}
          placeholder="Ingrese PIN"
          value={pin}
          onChangeText={setPin}
          secureTextEntry={true}
          keyboardType="numeric"
        />
      )}

      {/* Input para configurar la Contraseña */}
      {selectedValue === 'password' && (
        <TextInput
          style={styles.input}
          placeholder="Ingrese Contraseña"
          value={pin}
          onChangeText={setPin}
          secureTextEntry={true}
        />
      )}

      {/* Botón para configurar el bloqueo */}
      <TouchableOpacity style={styles.button} onPress={configurarBloqueo}>
        <Text style={styles.buttonText}>Configurar Bloqueo</Text>
      </TouchableOpacity>

      {/* Input para ingresar el pin/contraseña de desbloqueo */}
      {selectedValue === 'pin' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese PIN para desbloquear"
            value={pinDesbloqueo}
            onChangeText={setPinDesbloqueo}
            secureTextEntry={true}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={desbloquearDispositivo}>
            <Text style={styles.buttonText}>Desbloquear</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedValue === 'password' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese Contraseña para desbloquear"
            value={pinDesbloqueo}
            onChangeText={setPinDesbloqueo}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={desbloquearDispositivo}>
            <Text style={styles.buttonText}>Desbloquear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Bloqueo;
