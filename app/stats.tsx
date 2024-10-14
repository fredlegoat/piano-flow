import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

export default function StatsScreen() {
  // Example data - replace with actual data from your storage
  const practiceData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        data: [30, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const weeklyStats = {
    totalTime: 375, // in minutes
    sessionsCompleted: 7,
    goalsAchieved: 3,
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E1E1E',
    backgroundGradientTo: '#1E1E1E',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradient: '#FFD700', 
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#1E1E1E',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Mes progrès</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Temps de pratique cette semaine</Text>
          <LineChart
            data={practiceData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Résumé hebdomadaire</Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.floor(weeklyStats.totalTime / 60)}h {weeklyStats.totalTime % 60}m
              </Text>
              <Text style={styles.statLabel}>Temps total de pratique</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weeklyStats.sessionsCompleted}</Text>
              <Text style={styles.statLabel}>Séances terminées</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weeklyStats.goalsAchieved}</Text>
              <Text style={styles.statLabel}>Objectifs atteints</Text>
            </View>
          </View>
        </View>

        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Objectifs et succès</Text>
          {/* You can replace this with dynamic data */}
          <Text style={styles.placeholderText}>
          Restez constant ! Vous avez atteint 3 objectifs sur 5 cette semaine.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background
  },
  contentContainer: {
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for emphasis
  },
  statLabel: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  goalsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#2C2C2C', // Dark card background
    borderRadius: 10,
  },
  placeholderText: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 5,
  },
});
