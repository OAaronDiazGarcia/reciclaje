import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config';

const Profile = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleUpdateProfile = () => {
    const user = firebase.auth().currentUser;

    if (user) {

      user
        .updatePassword(password)
        .then(() => {
          console.log('Contraseña actualizada correctamente.');
        })
        .catch(error => {
          console.error('Error al actualizar la contraseña:', error);
        });
    } else {
      console.log('No hay usuario autenticado.');
    }
  };

  return (
    <LinearGradient
      colors={['#AEC6CF', '#FFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}> Update your credentials</Text>
          <PaperTextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button mode="contained" onPress={handleUpdateProfile} style={styles.updateButton}>
          Update profile
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              firebase.auth().signOut(); // Realiza el logout utilizando Firebase
            }}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#C23B22',
    borderColor: '#565559',
  },
  updateButton: {
    marginTop: 16,
    backgroundColor: '#efa94a',
    borderColor: '#565559',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFF',
  },
});

export default Profile;
