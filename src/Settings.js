import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Settings = () => {
  const navigation = useNavigation();

  const handleContactPress = () => {
    // Tu lógica aquí
  };

  const handleHelpPress = () => {
    // Tu lógica aquí
  };

  const handleNotificationPress = () => {
    Alert.alert('Notification', 'You have received a new notification!');
  };

  const handleLanguagePress = () => {
    Alert.alert('Notification', 'You changed the language');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.iconContainer}>
            <Animatable.View animation="rotate" easing="linear" iterationCount="infinite" duration={3000}>
              <Ionicons name="ios-settings-outline" size={150} color="#4CAF50" />
            </Animatable.View>
          </View>
          <Button
            icon={() => <Ionicons name="ios-globe-outline" size={24} color="black" />}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleLanguagePress}
          >
            Lenguage
          </Button>
          <Button
            icon={() => <Ionicons name="ios-notifications-outline" size={24} color="black" />}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleNotificationPress}
          >
            Notifications
          </Button>
          <View style={styles.link}>
            <Ionicons name="ios-person-outline" size={24} color="black" />
            <Link to="/contacto" style={styles.linkText} onPress={handleContactPress}>
              <Text style={styles.linkText}>Contact us through our social networks</Text>
            </Link>
          </View>
          <View style={styles.link}>
            <Ionicons name="ios-help-circle-outline" size={24} color="black" />
            <Link to="/ayuda" style={styles.linkText} onPress={handleHelpPress}>
              <Text style={styles.linkText}>Do you need help?</Text>
            </Link>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Cambio de fondo a blanco
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    marginBottom: 10,
    width: 200,
    backgroundColor: '#4CAF50', // Cambio de color
  },
  buttonLabel: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: 'green', // Cambio de color
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'System',
    color: '#4CAF50',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
});

export default Settings;
