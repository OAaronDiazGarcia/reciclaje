import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../config';
import * as Animatable from 'react-native-animatable';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Verificar si el usuario ya ha iniciado sesión al montar el componente
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario está autenticado, navegar al dashboard
        navigation.navigate('dashboard');
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <LinearGradient colors={['#62C370', '#fff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.iconContainer}>
          <MaterialCommunityIcons name="account-circle" size={100} color="#FFF" />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text style={styles.title}>WELCOME</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.inputContainer}>
          <PaperTextInput
            style={styles.textInput}
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <PaperTextInput
            style={styles.textInput}
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => loginUser(email, password)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Login
          </Button>
        </Animatable.View>
        <TouchableOpacity onPress={() => navigation.navigate('register')} style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? Register here</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('forgotscreen')} style={styles.registerContainer}>
          <Text style={styles.registerText}>Forgot your password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'System',
    color: '#FFF',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#565559',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#565556',
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#565556',
    textAlign: 'center',
  },
});

export default Login;
