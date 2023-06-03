import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

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
    };

    return questionMapping[question] || 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?';
  };

  const createBotMessage = (text) => ({
    _id: Math.round(Math.random() * 1000000),
    text,
    createdAt: new Date(),
    user: botUser,
  });

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#AEC6CF', '#FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Send a Message!</Text>
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
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'System',
  },
  chatContainer: {
    flex: 1,
  },
});

export default AyudaScreen;
