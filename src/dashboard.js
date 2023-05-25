import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabBar from './BottomTapBar';


const Dashboard = () => {
  return (
    <View style={styles.container}>
      <BottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;