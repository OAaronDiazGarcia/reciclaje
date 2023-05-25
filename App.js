import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ScreenOrientation from 'expo-screen-orientation';

import firebase from "./config";
import Login from "./src/login";
import RegisterScreen from "./src/register";

import Header from "./src/components/Header";
import SplashScreen from './src/SplashScreen';
import Dashboard from "./src/Dashboard";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    ScreenOrientation.unlockAsync();
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </>
        ) : (
          
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => <Header name="Eco Easy" />,
              headerStyle: {
                height: 100,
                backgroundColor: '#62C370',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function MainApp() {
  return <App />;
}
