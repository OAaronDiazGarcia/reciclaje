import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  const handleContactPress = () => {

  };

  const handleHelpPress = () => {
  
  };

  const handleNotificationPress = () => {

    Alert.alert('Notification', 'You have received a new notification!');
  };

  const handleLanguagePress = () => {

    Alert.alert('Notification', 'You changed the language');
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#AEC6CF', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <Button
              icon={() => <Ionicons name="ios-globe-outline" size={24} color="white" />}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={handleLanguagePress}
            >
              Lenguaje
            </Button>
            <Button
              icon={() => <Ionicons name="ios-notifications-outline" size={24} color="white" />}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={handleNotificationPress}
            >
              Notificaciones
            </Button>
            <View style={styles.link}>
              <Ionicons name="ios-person-outline" size={24} color="#000" />
              <Link to="/contacto" style={styles.linkText} onPress={handleContactPress}>
                Contact us through our social networks
              </Link>
            </View>
            <View style={styles.link}>
              <Ionicons name="ios-help-circle-outline" size={24} color="#000" />
              <Link to="/ayuda" style={styles.linkText} onPress={handleHelpPress}>
                Do you need help?
              </Link>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    width: 200,
    backgroundColor: '#4267B2',
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
    color: 'white',
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'System',
    color: '#000',
  },
});

export default Settings;
