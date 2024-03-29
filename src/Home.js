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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.titleContainer}>
          <Text style={styles.title}>Ecological Culture</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            The collection and processing of paper and cardboard, glass or plastic waste means creating new products
            based on those same materials. A new opportunity for the Earth, which can be protected if the benefits of
            recycling are understood, the correct way to separate waste, and the challenges that this activity will face
            in the coming years.
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.imageContainer}>
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={{ uri: 'https://cdn.pixabay.com/photo/2023/04/06/10/22/earth-day-7903523_1280.png' }}
            style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }]}
            resizeMode="contain"
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            In order to acquire awareness, one must have a clear and concise notion of the subject to be sensitized. In
            this case, we talk about recycling and we will explain in a simple way what is meant by recycling.
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Contact Us:</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={handleFacebookPress}>
            <Ionicons name="logo-facebook" size={32} color="#4267B2" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInstagramPress}>
            <Ionicons name="logo-instagram" size={32} color="#E1306C" style={styles.socialIcon} />
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.linkContainer}>
          <Ionicons name="ios-analytics" size={24} color="#4267B2" />
          <Link to="/status" style={styles.linkText}>
            <Text style={styles.linkText}>Do you want to see the global progress?</Text>
          </Link>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#4CAF50',
    textAlign: 'center',
  },
  subtitleContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
    lineHeight: 22,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
    marginBottom: 40,
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default Home;
