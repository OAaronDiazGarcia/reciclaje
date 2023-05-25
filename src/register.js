import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification();
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
        <Icon name="user" size={50} color="#FFF" style={styles.icon} />
        <Text style={styles.title}>Register Here..!!</Text>
      </LinearGradient>
      <View style={styles.inputContainer}>
        <PaperTextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={setFirstName}
          autoCorrect={false}
        />
        <PaperTextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={setLastName}
          autoCorrect={false}
        />
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
          secureTextEntry={true}
          theme={{ colors: { primary: '#62C370' } }}
        />
      </View>
      <TouchableOpacity onPress={registerUser} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
});

export default RegisterScreen;
