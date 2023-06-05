import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from '@react-navigation/native';

const Home = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation();
  }, []);

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleInstagramPress = () => {
    Linking.openURL('https://instagram.com/_ecoeasy?igshid=NTc4MTIwNjQ2YQ==');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=100093068466567&mibextid=ZbWKwL');
  };

  const handleStatusPress = () => {};

  return (
    <LinearGradient
      colors={['#AEC6CF', '#FFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Ecological culture</Text>
          <Text style={styles.subtitle}>
            The collection and processing of paper and cardboard, glass or plastic waste means creating new products
            based on those same materials. A new opportunity for the Earth, which can be protected if the benefits of
            recycling are understood, the correct way to separate waste and the challenges that this activity will face
            in the coming years.
          </Text>
          <View style={styles.imageContainer}>
            <Animatable.Image
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/10/03/28/tree-1247796_1280.png' }}
              style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }]}
              resizeMode="contain"
            />
            <Animatable.Image
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              source={{ uri: 'https://cdn.pixabay.com/photo/2023/04/06/10/22/earth-day-7903523_1280.png' }}
              style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.subtitle}>
            In order to acquire awareness, one must have a clear and concise notion of the subject to be sensitized. In
            this case, we talk about recycling and we will explain in a simple way what is meant by recycling.
          </Text>
          <Text style={styles.subtitle}>Contact Us:</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity onPress={handleFacebookPress}>
              <Ionicons name="logo-facebook" size={32} color="#4267B2" style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInstagramPress}>
              <Ionicons name="logo-instagram" size={32} color="#E1306C" style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleStatusPress} style={styles.linkContainer}>
            <Ionicons name="ios-analytics" size={24} color="#4267B2" />
            <Link to="/status" style={styles.linkText}>
              <Text style={styles.linkText}>Do you want to see the global progress?</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'System',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
    textShadowColor: '#000',
    textShadowRadius: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#4267B2',
    textDecorationLine: 'underline',
    textShadowRadius: 1,
  },
});

export default Home;
