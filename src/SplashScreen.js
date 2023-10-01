import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import firebase from '../config';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserAuthentication = async () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('dashboard');
        } else {
          navigation.navigate('login');
        }
      });
    };

    setTimeout(checkUserAuthentication, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={2000} style={styles.imageContainer}>
        <Image
          source={require('../splash/Metas.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color set to white
  },
  imageContainer: {
    width: '50%',
    height: '50%',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default SplashScreen;
