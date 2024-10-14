import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ExercisesScreen = () => {
  const exercises: Exercise[] = [
    { id: '1', title: 'Exercices d\'accords', icon: 'musical-notes' },
    { id: '2', title: 'Gammes majeures', icon: 'musical-note' },
    { id: '3', title: 'Arpèges', icon: 'musical-notes-outline' },
    { id: '4', title: 'Rythme et tempo', icon: 'timer-outline' },
    { id: '5', title: 'Lecture à vue', icon: 'eye-outline' },
  ];

  interface Exercise {
    id: string;
    title: string;
    icon: 'musical-notes' | 'musical-note' | 'musical-notes-outline' | 'timer-outline' | 'eye-outline';
  }
  
  const renderExerciseItem = (exercise: Exercise) => (
    <TouchableOpacity key={exercise.id} style={styles.exerciseItem}>
      <Ionicons name={exercise.icon} size={24} color="#FFD700" />
      <Text style={styles.exerciseTitle}>{exercise.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Exercices</Text>
      <ScrollView>
        {exercises.map(renderExerciseItem)}
      </ScrollView>
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
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});

export default ExercisesScreen;