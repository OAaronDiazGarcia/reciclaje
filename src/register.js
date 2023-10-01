import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config';
import * as Animatable from 'react-native-animatable';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('An email has been sent to reset your password.');
      setEmail('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.iconContainer}>
          <Icon name="recycle" size={100} color="#4CAF50" />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text style={styles.title}>Forgot Your Password?</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text style={styles.subtitle}>Enter your email address to reset your password.</Text>
        </Animatable.View>
        <View style={styles.inputContainer}>
          <PaperTextInput
            style={styles.textInput}
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleForgotPassword}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Reset Password
          </Button>
        </Animatable.View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
