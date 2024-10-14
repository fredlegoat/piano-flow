import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const LessonsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [lessons, setLessons] = useState([
    { id: '1', title: 'Introduction au piano' },
    { id: '2', title: 'Lecture de partition de base' },
    { id: '3', title: 'Techniques de pédalage' },
  ]);

  const addNewLesson = () => {
    if (newLessonTitle.trim()) {
      setLessons([...lessons, { id: String(lessons.length + 1), title: newLessonTitle }]);
      setNewLessonTitle('');
      setModalVisible(false);
    }
  };

  interface Lesson {
    id: string;
    title: string;
  }
  
  const renderLessonItem = (lesson: Lesson) => (
    <TouchableOpacity key={lesson.id} style={styles.lessonItem}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leçons</Text>
      <ScrollView>
        {lessons.map(renderLessonItem)}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#FFD700" />
        <Text style={styles.addButtonText}>Ajouter une leçon</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une nouvelle leçon</Text>
            <TextInput
              style={styles.input}
              placeholder="Titre de la leçon"
              placeholderTextColor="#999"
              value={newLessonTitle}
              onChangeText={setNewLessonTitle}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addNewLesson}>
              <Text style={styles.modalButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFD700',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: '#FFD700',
  },
});

export default LessonsScreen;