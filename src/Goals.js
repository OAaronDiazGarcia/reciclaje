import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../config';

const Goals = () => {
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
    <PaperProvider>
      <LinearGradient
        colors={['#AEC6CF', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Mis Metas</Text>

          <View style={styles.goalContainer}>
            <Icon
              name={papel ? 'check-box' : 'check-box-outline-blank'}
              type="material"
              onPress={() => setPapel(!papel)}
            />
            <Text style={styles.goalText}>Paper</Text>
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
            <Icon
              name={vidrio ? 'check-box' : 'check-box-outline-blank'}
              type="material"
              onPress={() => setVidrio(!vidrio)}
            />
            <Text style={styles.goalText}>Glass</Text>
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
            Save Goals
          </Button>

          <View style={styles.elementContainer}>
            <Icon name="file" type="font-awesome" />
            <Text style={styles.elementText}>
              {papelCantidad} Your paper in the database
            </Text>
          </View>

          <View style={styles.elementContainer}>
            <Icon name="cube" type="font-awesome" />
            <Text style={styles.elementText}>
              {vidrioCantidad} Your glass in the database
            </Text>
          </View>

          <Text style={styles.subTitle}>Notes:</Text>

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
            Save Notes
          </Button>
        </ScrollView>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = {
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
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
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FFF',
    marginLeft: 8,
    marginRight: 8,
    width: 30,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonEnabled: {
    backgroundColor: '#FFF',
  },
  quantityButtonLabel: {
    fontSize: 15,
    color: '#000',
  },
  quantityInput: {
    marginLeft: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#000',
    width: 48,
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderColor: '#565559',
  },
  buttonLabelStyle: {
    fontSize: 16,
    color: '#000',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  elementText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#000',
  },
  notesInput: {
    marginTop: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    color: '#000',
    backgroundColor: '#FFF',
    minHeight: 120,
  },
};

export default Goals;
