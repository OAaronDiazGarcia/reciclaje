import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Goals from './Goals';
import Maps from './Maps';
import Profile from './Profile';
import Home from './Home';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            iconColor = focused ? '#2196f3' : color; // Cambia el color a verde si está seleccionado
          } else if (route.name === 'Goals') {
            iconName = focused ? 'ios-list' : 'ios-list';
            iconColor = focused ? '#2196f3' : color;
          } else if (route.name === 'Maps') {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
            iconColor = focused ? '#2196f3' : color;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            iconColor = focused ? '#2196f3' : color;
          }

          // Devuelve el icono correspondiente con el nombre y los estilos
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
