import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = () => {
  // Mock data - replace with actual data from your storage
  const historyData = [
    { id: '1', date: '12/10/2024', practiceTime: 45 },
    { id: '2', date: '11/10/2024', practiceTime: 30 },
    { id: '3', date: '10/10/2024', practiceTime: 60 },
    // Add more entries as needed
  ];

  const renderItem = ({ item }: { item: { id: string; date: string; practiceTime: number } }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.practiceTime}>{item.practiceTime} minutes</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historique</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 30,
  },
  historyItem: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  practiceTime: {
    color: '#FFD700',
    fontSize: 16,
  },
});

export default HistoryScreen;