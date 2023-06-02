import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
      setEmail('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FBB03B', '#FF7E5F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <Icon name="lock" size={50} color="#FFF" style={styles.icon} />
        <Text style={styles.title}>Forgot Your Password?</Text>
        <Text style={styles.subtitle}>Enter your email address to reset your password.</Text>
      </LinearGradient>
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
      <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gradientContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginBottom: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: Dimensions.get('window').width - 40,
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 50,
    height: 50,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#62C370',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    fontSize: 16,
    color: '#62C370',
  },
});

export default ForgotPasswordScreen;
