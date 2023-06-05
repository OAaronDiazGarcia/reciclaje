import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Dimensions, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const Maps = () => {
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState({
    latitude: 21.9026,
    longitude: -102.2834,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleSearch = () => {
    // Aquí puedes implementar la lógica para buscar lugares en base al texto ingresado
    // y actualizar la región del mapa para mostrar los resultados
  };

  return (
    <LinearGradient colors={['#AEC6CF', '#FFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <Animatable.View animation="fadeInLeft" duration={700}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Places"
              value={searchText}
              onChangeText={setSearchText}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" duration={500} delay={300}>
            <Button title="Search" onPress={handleSearch} />
          </Animatable.View>
        </View>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={region} onRegionChange={setRegion}>
            {/* Marcador para mostrar la ubicación actual o los resultados de búsqueda */}
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <Animatable.View animation="fadeInUp" duration={500} delay={600}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Instituto Tecnológico de Aguascalientes</Text>
              <Text style={styles.addressText}>Aguascalientes, México</Text>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  map: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: 8,
  },
  addressContainer: {
    backgroundColor: '#fff',
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
});

export default Maps;
