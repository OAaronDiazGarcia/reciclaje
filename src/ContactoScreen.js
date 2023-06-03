import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ContactoScreen = () => {
  return (
    <PaperProvider>
      <LinearGradient
        colors={['#AEC6CF', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Pantalla de Contacto</Text>
          {/* Aquí puedes agregar el contenido de la pantalla de contacto */}
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
  },
});

export default ContactoScreen;
