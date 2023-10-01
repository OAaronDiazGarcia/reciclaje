import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const VisitedLocationCard = ({ location }) => (
  <View style={styles.visitedLocationCard}>
    <View style={styles.visitedLocationCardContent}>
      <Text style={styles.visitedLocationName}>{location.name}</Text>
      <Text style={styles.visitedLocationTime}>Hora: {location.time}</Text>
      <Text style={styles.visitedLocationCoordinates}>
        Latitud: {location.latitude.toFixed(4)}, Longitud: {location.longitude.toFixed(4)}
      </Text>
    </View>
  </View>
);

const Maps = () => {
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState({
    latitude: 21.9026,
    longitude: -102.2834,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [visitedLocations, setVisitedLocations] = useState([]);
  const [locationName, setLocationName] = useState('');

  const handleSearch = () => {
    // Implementa la lógica de búsqueda y actualización de región aquí
  };

  const handleSaveLocation = () => {
    const now = new Date();
    const formattedDate = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const newLocation = {
      name: locationName,
      time: formattedDate,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    setVisitedLocations([...visitedLocations, newLocation]);
    setLocationName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lugares"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.searchButton}
          activeOpacity={0.8}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region} onRegionChange={setRegion}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSaveLocation}
        >
          <Text style={styles.saveButtonText}>Guardar Ubicación Visitada</Text>
        </TouchableOpacity>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Instituto Tecnológico de Aguascalientes</Text>
          <Text style={styles.addressText}>Aguascalientes, México</Text>
        </View>
      </View>

      <View style={styles.visitedLocationsContainer}>
        <Text style={styles.visitedLocationsTitle}>Ubicaciones Visitadas:</Text>
        <FlatList
          data={visitedLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <VisitedLocationCard location={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo blanco
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  addressContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  visitedLocationsContainer: {
    marginTop: 16,
  },
  visitedLocationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  visitedLocationCard: {
    backgroundColor: '#F8F9FA', // Color similar a Bootstrap
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2, // Sombra
  },
  visitedLocationCardContent: {
    padding: 16,
  },
  visitedLocationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  visitedLocationTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  visitedLocationCoordinates: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default Maps;
