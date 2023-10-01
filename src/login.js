import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../config';
import * as Animatable from 'react-native-animatable';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.iconContainer}>
          <MaterialCommunityIcons name="recycle" size={100} color="#4CAF50" />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text style={styles.title}>WELCOME</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.inputContainer}>
          <PaperTextInput
            style={styles.textInput}
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <PaperTextInput
            style={styles.textInput}
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={loginUser}
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
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'System',
    color: '#4CAF50',
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
    marginTop: 50,
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
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default Login;