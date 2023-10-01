import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config';

const Goals = ({ navigation }) => {
  const [papel, setPapel] = useState(false);
  const [papelCantidad, setPapelCantidad] = useState(0);
  const [vidrio, setVidrio] = useState(false);
  const [vidrioCantidad, setVidrioCantidad] = useState(0);
  const [notas, setNotas] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      const goalsRef = firebase.firestore().collection('Goals').doc(userId);

      goalsRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setPapel(data.papel);
          setPapelCantidad(data.papelCantidad.toString());
          setVidrio(data.vidrio);
          setVidrioCantidad(data.vidrioCantidad.toString());
          setNotas(data.notas);
        }
      });
    }
  }, []);

  const handleSaveGoals = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      const goalsRef = firebase.firestore().collection('Goals').doc(userId);

      goalsRef
        .set({
          papel,
          papelCantidad: parseInt(papelCantidad),
          vidrio,
          vidrioCantidad: parseInt(vidrioCantidad),
          notas,
        })
        .then(() => {
          console.log('Metas guardadas correctamente.');
        })
        .catch((error) => {
          console.error('Error al guardar las metas:', error);
        });
    }
  };

  const handleIncreasePapelCantidad = () => {
    setPapelCantidad(parseInt(papelCantidad) + 1);
  };

  const handleDecreasePapelCantidad = () => {
    if (papelCantidad > 0) {
      setPapelCantidad(parseInt(papelCantidad) - 1);
    }
  };

  const handleIncreaseVidrioCantidad = () => {
    setVidrioCantidad(parseInt(vidrioCantidad) + 1);
  };

  const handleDecreaseVidrioCantidad = () => {
    if (vidrioCantidad > 0) {
      setVidrioCantidad(parseInt(vidrioCantidad) - 1);
    }
  };

  const handleSaveNotas = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      const goalsRef = firebase.firestore().collection('Goals').doc(userId);

      goalsRef
        .update({
          notas,
        })
        .then(() => {
          console.log('Notas guardadas correctamente.');
        })
        .catch((error) => {
          console.error('Error al guardar las notas:', error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Mis Metas</Text>

      <View style={styles.goalContainer}>
        <Ionicons
          name={papel ? 'checkbox' : 'checkbox-outline'}
          size={24}
          color={papel ? '#62C370' : '#000'}
          onPress={() => setPapel(!papel)}
        />
        <Text style={styles.goalText}>Papel</Text>
        {papel && (
          <View style={styles.quantityContainer}>
            <Button
              mode="contained"
              onPress={handleDecreasePapelCantidad}
              style={[styles.quantityButton, papel && styles.quantityButtonEnabled]}
              labelStyle={styles.quantityButtonLabel}
            >
              -
            </Button>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={papelCantidad.toString()}
              onChangeText={setPapelCantidad}
              underlineColorAndroid="transparent"
            />
            <Button
              mode="contained"
              onPress={handleIncreasePapelCantidad}
              style={[styles.quantityButton, papel && styles.quantityButtonEnabled]}
              labelStyle={styles.quantityButtonLabel}
            >
              +
            </Button>
          </View>
        )}
      </View>

      <View style={styles.goalContainer}>
        <Ionicons
          name={vidrio ? 'checkbox' : 'checkbox-outline'}
          size={24}
          color={vidrio ? '#62C370' : '#000'}
          onPress={() => setVidrio(!vidrio)}
        />
        <Text style={styles.goalText}>Vidrio</Text>
        {vidrio && (
          <View style={styles.quantityContainer}>
            <Button
              mode="contained"
              onPress={handleDecreaseVidrioCantidad}
              style={[styles.quantityButton, vidrio && styles.quantityButtonEnabled]}
              labelStyle={styles.quantityButtonLabel}
            >
              -
            </Button>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={vidrioCantidad.toString()}
              onChangeText={setVidrioCantidad}
              underlineColorAndroid="transparent"
            />
            <Button
              mode="contained"
              onPress={handleIncreaseVidrioCantidad}
              style={[styles.quantityButton, vidrio && styles.quantityButtonEnabled]}
              labelStyle={styles.quantityButtonLabel}
            >
              +
            </Button>
          </View>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSaveGoals}
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
      >
        Guardar Metas
      </Button>

      <View style={styles.elementContainer}>
        <Ionicons name="copy" size={20} color="#62C370" />
        <Text style={styles.elementText}>{papelCantidad} Papel en la base de datos</Text>
      </View>

      <View style={styles.elementContainer}>
        <Ionicons name="cube" size={20} color="#62C370" />
        <Text style={styles.elementText}>{vidrioCantidad} Vidrio en la base de datos</Text>
      </View>

      <Text style={styles.subTitle}>Notas:</Text>

      <TextInput
        style={styles.notesInput}
        multiline
        value={notas}
        onChangeText={setNotas}
      />

      <Button
        mode="contained"
        onPress={handleSaveNotas}
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
      >
        Guardar Notas
      </Button>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 35,
  },
  quantityButton: {
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    width: 30,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityButtonEnabled: {
    backgroundColor: '#FFF',
  },
  quantityButtonLabel: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  quantityInput: {
    marginLeft: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#000',
    width: 48,
    textAlign: 'center',
    backgroundColor: '#FFF',
  },
  buttonStyle: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderColor: '#565559',
    borderRadius: 5,
  },
  buttonLabelStyle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  elementText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  notesInput: {
    marginTop: 8,
    fontSize: 20,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    color: '#000',
    backgroundColor: '#FFF',
    minHeight: 120,
  },
};

export default Goals;
