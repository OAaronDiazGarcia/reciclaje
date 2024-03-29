import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const ContactoScreen = () => {
  const navigation = useNavigation();

  const handleFacebookPress = () => {
    // Acción al presionar el botón de Facebook
    Linking.openURL('https://www.facebook.com/profile.php?id=100093068466567&mibextid=ZbWKwL');
  };

  const handleInstagramPress = () => {
    // Acción al presionar el botón de Instagram
    Linking.openURL('https://instagram.com/_ecoeasy?igshid=NTc4MTIwNjQ2YQ==');
  };

  const handleStatusPress = () => {
    // Acción al presionar el enlace de "Do you want to see the global progress?"
  };

  const handleGoBack = () => {
    // Acción al presionar el botón de regresar
    navigation.goBack(); // Navegación hacia atrás
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>Get in Touch:</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity onPress={handleFacebookPress}>
              <Animatable.View animation="bounceIn" duration={1000}>
                <Ionicons name="logo-facebook" size={32} color="#4267B2" style={styles.socialIcon} />
              </Animatable.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInstagramPress}>
              <Animatable.View animation="bounceIn" duration={1000} delay={200}>
                <Ionicons name="logo-instagram" size={32} color="#E1306C" style={styles.socialIcon} />
              </Animatable.View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Contact Information:</Text>
          <Text style={styles.contactText}>Email: contact@example.com</Text>
          <Text style={styles.contactText}>Phone: +1234567890</Text>

          <Text style={styles.additionalContent}>Feel free to reach out to us for any inquiries, suggestions, or feedback. We value your thoughts and are committed to providing the best experience for our users.</Text>

          <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
            <Ionicons name="arrow-back" size={24} color="#4267B2" />
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  additionalContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    fontSize: 18,
    color: '#4267B2',
    marginLeft: 5,
  },
});

export default ContactoScreen;
