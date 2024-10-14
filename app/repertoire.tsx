import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import your types if needed
// import { Piece } from '../types';

export default function RepertoireScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Example pieces - replace with actual data from your storage
  const [pieces, setPieces] = useState([
    {
      id: '1',
      title: 'Sparkle - Kimi no Na wa',
      difficulty: 'Hard',
      estimatedTime: 40, // hours
      progress: 35, // percentage
    },
    {
      id: '2',
      title: 'Minecraft - Sweden',
      difficulty: 'Easy',
      estimatedTime: 10,
      progress: 60,
    },
    {
      id: '3',
      title: 'Four Letters',
      difficulty: 'Medium',
      estimatedTime: 20,
      progress: 10,
    },
  ]);

  const renderPieceCard = (piece: { id: string; title: string; difficulty: string; estimatedTime: number; progress: number }) => (
    <View key={piece.id} style={styles.pieceCard}>
      <View style={styles.pieceHeader}>
        <Text style={styles.pieceTitle}>{piece.title}</Text>
        <View style={[styles.difficultyBadge, 
          piece.difficulty === 'Hard' ? styles.hardBadge : 
          piece.difficulty === 'Medium' ? styles.mediumBadge : 
          styles.easyBadge
        ]}>
          <Text style={styles.difficultyText}>{piece.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${piece.progress}%` }]} />
        <Text style={styles.progressText}>{piece.progress}% Complete</Text>
      </View>
      
      <Text style={styles.estimatedTime}>
        Temps d'entraînement estimé : {piece.estimatedTime} heures
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Mon Répertoire</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFD700" />
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.piecesContainer}>
          {pieces.map(renderPieceCard)}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter</Text>
            <TextInput
              style={styles.input}
              placeholder="Le nom de la pièce"
              placeholderTextColor="#999"
            />
            {/* Add more inputs for difficulty, estimated time, etc. */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for title
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFD700', // Gold accent for button
    marginLeft: 5,
  },
  piecesContainer: {
    marginBottom: 20,
  },
  pieceCard: {
    backgroundColor: '#2C2C2C', // Dark card background
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  pieceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pieceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for piece title
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  mediumBadge: {
    backgroundColor: '#FFC107',
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  difficultyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#3A3A3A', // Dark background for progress bar
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700', // Gold color for progress
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    color: '#FFFFFF', // White text on progress bar
  },
  estimatedTime: {
    color: '#999999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for modal background
  },
  modalContent: {
    backgroundColor: '#2C2C2C', // Dark modal content background
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
  },
  modalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  modalButtonText: {
    color: '#1E1E1E', // Dark text on light button
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: '#FFD700', // Gold text for cancel
  },
});
