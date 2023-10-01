import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLegend, VictoryPie } from 'victory-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config';

const StatusScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Goals').get();
        const newData = snapshot.docs.reduce((accumulator, doc) => {
          const { papelCantidad, vidrioCantidad } = doc.data();
          if (papelCantidad) {
            accumulator.push({ y: papelCantidad, category: 'Papel' });
          }
          if (vidrioCantidad) {
            accumulator.push({ y: vidrioCantidad, category: 'Vidrio' });
          }
          return accumulator;
        }, []);
        setData(newData);

        const totalPapelCantidad = newData.filter(item => item.category === 'Papel').reduce((sum, item) => sum + item.y, 0);
        const totalVidrioCantidad = newData.filter(item => item.category === 'Vidrio').reduce((sum, item) => sum + item.y, 0);
        setTotalData([
          { y: totalPapelCantidad, category: 'Papel' },
          { y: totalVidrioCantidad, category: 'Vidrio' }
        ]);
      } catch (error) {
        console.log('Error fetching data from Firestore: ', error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (value) => {
    const total = totalData.reduce((sum, item) => sum + item.y, 0);
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Statistics of All Users</Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Bar Graph</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            padding={{ top: 30, bottom: 50, left: 50, right: 30 }}
          >
            <VictoryLegend
              x={120}
              y={10}
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: 'black' }, title: { fontSize: 12 } }}
              data={[
                { name: 'Paper Quantity', symbol: { fill: 'rgba(134, 65, 244, 0.8)' } },
                { name: 'Glass Quantity', symbol: { fill: 'rgba(244, 65, 134, 0.8)' } },
              ]}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: 'transparent' },
                tickLabels: { fill: '#444', fontSize: 10 },
              }}
              tickFormat={(value) => `${value}`}
            />
            <VictoryAxis
              style={{
                axis: { stroke: 'transparent' },
                tickLabels: { fill: '#444', fontSize: 10 },
              }}
              tickFormat={() => ''}
            />
            <VictoryBar
              data={totalData}
              x="category"
              y="y"
              alignment="start"
              barWidth={15}
              style={{
                data: {
                  fill: ({ datum }) => (datum.category === 'Papel' ? 'rgba(134, 65, 244, 0.8)' : 'rgba(244, 65, 134, 0.8)'),
                },
              }}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryLabel dy={-15} />}
            />
          </VictoryChart>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Pie Chart</Text>
          <VictoryPie
            data={totalData}
            colorScale={['rgba(134, 65, 244, 0.8)', 'rgba(244, 65, 134, 0.8)']}
            labels={({ datum }) => `${calculatePercentage(datum.y)} (${datum.y})`}
            labelComponent={<VictoryLabel />}
            width={400}
            height={300}
            padding={50}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default StatusScreen;
