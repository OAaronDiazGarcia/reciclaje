import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../config';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserAuthentication = async () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // Si el usuario ya ha iniciado sesión, navegar directamente a la pantalla de inicio
          navigation.navigate('dashboard'); // Reemplaza 'Home' con el nombre de la pantalla de inicio de tu aplicación
        } else {
          // Si el usuario no ha iniciado sesión, navegar a la pantalla de inicio de sesión
          navigation.navigate('login'); // Reemplaza 'Login' con el nombre de la pantalla de inicio de sesión de tu aplicación
        }
      });
    };

    setTimeout(checkUserAuthentication, 2000); // Cambia el valor '2000' para ajustar el tiempo de visualización de la pantalla de presentación.
  }, []);

  return (
    <View style={styles.container}>
  <LinearGradient
  colors={['#62C370', '#FFF']}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={styles.gradient}
>
        <Image
          source={require('../splash/Metas.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '50%',
    height: '50%',
  },
});

export default SplashScreen;
