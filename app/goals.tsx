import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    { id: '1', text: 'Pratiquer 30 minutes par jour', completed: false },
    { id: '2', text: 'Apprendre une nouvelle chanson', completed: false },
    { id: '3', text: 'Maîtriser la gamme de Do majeur', completed: true },
  ]);
  const [newGoal, setNewGoal] = useState('');

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: String(goals.length + 1), text: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const renderGoalItem = ({ item }: { item: { id: string; text: string; completed: boolean } }) => (
    <TouchableOpacity style={styles.goalItem} onPress={() => toggleGoal(item.id)}>
      <Ionicons
        name={item.completed ? 'checkbox-outline' : 'square-outline'}
        size={24}
        color={item.completed ? '#FFD700' : '#FFFFFF'}
      />
      <Text style={[styles.goalText, item.completed && styles.completedGoalText]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Objectifs</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un nouvel objectif"
          placeholderTextColor="#999"
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Ionicons name="add-circle" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={item => item.id}
        style={styles.list}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  list: {
    flex: 1,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  completedGoalText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default GoalsScreen;