import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const AyudaScreen = () => {
  const [messages, setMessages] = useState([]);

  const botUser = {
    _id: 2,
    name: 'Chatbot',
    avatar: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png',
  };

  const handleSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const response = generateResponse(newMessages[0].text);
    const botResponse = createBotMessage(response);
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [botResponse]));
  };

  const generateResponse = (question) => {
    const questionMapping = {
      'Hola': '¡Hola! ¿En qué puedo ayudarte?',
      'Adiós': '¡Hasta luego!',
      '¿Cómo estás?': 'Estoy bien, ¡gracias por preguntar!',
      '¿Qué hace esta app?': 'Nuestra app de reciclaje te permite encontrar información sobre cómo reciclar diferentes tipos de materiales, ubicar puntos de reciclaje cercanos y llevar un registro de tus actividades de reciclaje.',
      '¿Cómo puedo empezar a utilizar la app?': 'Para empezar a utilizar la app, primero debes descargarla desde la tienda de aplicaciones correspondiente e instalarla en tu dispositivo móvil. Después, crea una cuenta o inicia sesión si ya tienes una. ¡Y listo! Estarás listo para explorar todas las funciones de la app.',
      '¿Cómo encuentro información sobre cómo reciclar un material específico?': 'En la app, dirígete a la sección de "Información de reciclaje" o "Guía de reciclaje". Allí podrás buscar el material específico que deseas reciclar y encontrarás instrucciones detalladas sobre cómo hacerlo correctamente.',
      '¿La app muestra puntos de reciclaje cercanos?': '¡Sí! La app utiliza tu ubicación para mostrar puntos de reciclaje cercanos en un mapa interactivo. También podrás ver información adicional sobre cada punto, como los tipos de materiales que aceptan.',
      '¿Puedo llevar un registro de mis actividades de reciclaje en la app?': '¡Claro que sí! La app cuenta con una función de seguimiento de reciclaje. Puedes registrar y llevar un seguimiento de tus actividades de reciclaje, como la cantidad de materiales reciclados y las fechas en que lo hiciste. Esto te ayudará a tener un registro de tu impacto ambiental positivo.',
      '¿La app ofrece recompensas o incentivos por reciclar?': 'Sí, nuestra app cuenta con un programa de recompensas. A medida que recicles más materiales, podrás ganar puntos y desbloquear distintos logros. Estos puntos podrás canjearlos por descuentos en tiendas asociadas o donarlos a organizaciones benéficas.',
      '¿Cómo puedo reportar un problema técnico en la app?': 'Si encuentras algún problema técnico en la app, puedes dirigirte a la sección de "Soporte" o "Ayuda" dentro de la app. Allí encontrarás información sobre cómo contactar a nuestro equipo de soporte técnico para reportar el problema y recibir asistencia.',
      '¿La app está disponible en diferentes idiomas?': 'Sí, nuestra app está disponible en varios idiomas, incluyendo inglés y español. Puedes cambiar el idioma en la configuración de la app.',
      '¿Hay alguna opción de participar en eventos o campañas de reciclaje a través de la app?': 'Sí, regularmente organizamos eventos y campañas de reciclaje en colaboración con diferentes organizaciones. En la app, podrás encontrar información actualizada sobre eventos cercanos, cómo participar y contribuir a causas ambientales.',
      '¿Qué medidas de seguridad se toman para proteger la privacidad de los usuarios en la app?': 'La privacidad de nuestros usuarios es una prioridad. La app utiliza medidas de seguridad robustas para proteger la información personal. No compartimos tus datos con terceros sin tu consentimiento y seguimos todas las leyes y regulaciones de privacidad aplicables.',
    };

    return questionMapping[question] || questionMapping['Default'];
  };

  const createBotMessage = (text) => ({
    _id: Math.round(Math.random() * 1000000),
    text,
    createdAt: new Date(),
    user: botUser,
  });

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.iconContainer}>
          <MaterialIcons name="chat" size={40} color="#4CAF50" />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text style={styles.title}>SEND A MESSAGE</Text>
        </Animatable.View>
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{
              _id: 1,
            }}
            renderBubble={(props) => (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#f0f0f0',
                  },
                  right: {
                    backgroundColor: '#4267B2',
                  },
                }}
                textStyle={{
                  left: {
                    color: '#000',
                    fontSize: 16,
                  },
                  right: {
                    color: '#fff',
                    fontSize: 16,
                  },
                }}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'System',
    color: '#4CAF50',
  },
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default AyudaScreen;
