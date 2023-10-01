import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../config';

const Profile = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Solicitar permiso de acceso a la galería de imágenes
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso denegado para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  const handleUpdateProfile = async () => {
    const user = firebase.auth().currentUser;

    if (user) {
      user
        .updatePassword(password)
        .then(() => {
          Alert.alert('Success', 'Contraseña actualizada correctamente.');
        })
        .catch(error => {
          console.error('Error al actualizar la contraseña:', error);
        });

      // Actualizar los datos del usuario en Firestore
      try {
        const userRef = firebase.firestore().collection('Datos').doc(user.uid);
        await userRef.set({
          name,
          lastName,
          profileImage: profileImage || null,
        });
        console.log('Datos del usuario actualizados en Firestore.');
      } catch (error) {
        console.error('Error al actualizar los datos del usuario en Firestore:', error);
      }
    } else {
      console.log('No hay usuario autenticado.');
    }
  };

  const handleChooseProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="account-circle" size={100} color="#565559" />
          )}
          <Button mode="contained" onPress={handleChooseProfileImage} style={styles.chooseImageButton}>
            Choose Image
          </Button>
        </View>
        <View style={styles.inputContainer}>
          <PaperTextInput
            style={styles.input}
            label="Name"
            value={name}
            onChangeText={setName}
          />
          <PaperTextInput
            style={styles.input}
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <PaperTextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFFFFF', // Cambio de color de fondo
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  chooseImageButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#F0F0F0',
  },
  updateButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderColor: '#565559',
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#C23B22',
    borderColor: '#565559',
  },
});

export default Profile;
