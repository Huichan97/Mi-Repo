import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Para el ícono de filtro
import globalStyles from '../styles';  // Importar los estilos globales

const events = [
  {
    id: '1',
    title: 'Cumpleaños',
    description: 'Mi gente me estaba esperando con una fiesta sorpresa, fue muy emotivo',
    date: '12 Julio 2020',
    image: 'https://via.placeholder.com/150x150.png?text=Cumpleaños',
  },
  {
    id: '2',
    title: 'Cumpleaños de mi hija',
    description: 'Le quise dar una sorpresa a nuestra hija y quedó muy contenta',
    date: '28 Agosto 2020',
    image: 'https://via.placeholder.com/150x150.png?text=Cumpleaños+hija',
  },
  {
    id: '3',
    title: 'Boda de David',
    description: 'Al David se le ocurrió casarse el día de su cumpleaños, más alegría por mi pana',
    date: '30 Septiembre 2020',
    image: 'https://via.placeholder.com/150x150.png?text=Boda',
  },
  {
    id: '4',
    title: 'Primavera Sound',
    description: 'Fuimos al Primavera Sound con mi hermana para su cumpleaños y fue un día increíble',
    date: '12 Noviembre 2020',
    image: 'https://via.placeholder.com/150x150.png?text=Primavera+Sound',
  },
];

const Historial = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);  // Controla la visibilidad del menú desplegable
  const [selectedFilter, setSelectedFilter] = useState('Cumpleaños');  // Filtro seleccionado

  const renderItem = ({ item }) => (
    <View style={globalStyles.eventContainer}>
      <Image source={{ uri: item.image }} style={globalStyles.eventImage} />
      <View style={globalStyles.eventTextContainer}>
        <Text style={globalStyles.eventDate}>{item.date}</Text>
        <Text style={globalStyles.eventTitle}>{item.title}</Text>
        <Text style={globalStyles.eventDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const filterOptions = ['Cumpleaños', 'Conciertos', 'Juntas', 'Despedidas'];

  return (
    <View style={globalStyles.container}>
      {/* Barra de cabecera con el botón de filtro alineado a la izquierda */}
      <View style={[globalStyles.header, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setDropdownVisible(!dropdownVisible)}  // Muestra/oculta el menú desplegable
        >
          <MaterialIcons name="filter-list" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 5 }}>{selectedFilter}</Text>
        </TouchableOpacity>
      </View>

      {/* Menú desplegable */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                setSelectedFilter(option);
                setDropdownVisible(false);  // Oculta el menú desplegable al seleccionar una opción
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Título del historial */}
      <Text style={globalStyles.title}>Historial</Text>

      {/* Lista de eventos */}
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,  // Ajusta según la posición del botón de filtro
    left: 20,  // Alinear con el botón
    zIndex: 1000,  // Asegúrate de que aparezca encima de otros componentes
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  dropdownOption: {
    paddingVertical: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Historial;
