import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  Animated,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PracticeScreen() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<{ id: number; title: string; currentSection: string } | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  
  const pieces = [
    { id: 1, title: 'Moonlight Sonata', currentSection: 'First Movement' },
    { id: 2, title: 'Fur Elise', currentSection: 'Main Theme' },
    { id: 3, title: 'River Flows in You', currentSection: 'Intro' },
  ];

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
    Animated.timing(animatedValue, {
      toValue: isActive && !isPaused ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setElapsedTime(0);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderPieceSelector = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sélectionner le morceau</Text>
          {pieces.map(piece => (
            <TouchableOpacity
              key={piece.id}
              style={styles.pieceOption}
              onPress={() => {
                setSelectedPiece(piece);
                setModalVisible(false);
              }}
            >
              <Text style={styles.pieceOptionTitle}>{piece.title}</Text>
              <Text style={styles.pieceOptionSection}>{piece.currentSection}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Entraînement</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="musical-notes" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {selectedPiece && (
          <View style={styles.currentPieceCard}>
            <Text style={styles.currentPieceTitle}>{selectedPiece.title}</Text>
            <Text style={styles.currentPieceSection}>{selectedPiece.currentSection}</Text>
          </View>
        )}

        <View style={styles.timerContainer}>
          <Animated.View style={[
            styles.timerCircle,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}>
            <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
          </Animated.View>

          <TouchableOpacity 
            style={[styles.button, isActive ? (isPaused ? styles.resumeButton : styles.pauseButton) : styles.startButton]} 
            onPress={toggleTimer}
          >
            <Text style={styles.buttonText}>
              {isActive ? (isPaused ? 'Reprendre' : 'Pause') : 'Commencer'}
            </Text>
          </TouchableOpacity>

          {isActive && (
            <TouchableOpacity 
              style={[styles.button, styles.stopButton]} 
              onPress={stopTimer}
            >
              <Text style={styles.buttonText}>Arrêter</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.practiceInfo}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={24} color="#FFFFFF" />
            <Text style={styles.infoLabel}>Objectif par session</Text>
            <Text style={styles.infoValue}>30 minutes</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="trophy-outline" size={24} color="#FFD700" />
            <Text style={styles.infoLabel}>Série</Text>
            <Text style={styles.infoValue}>5 jours</Text>
          </View>
        </View>

        {isActive && (
          <View style={styles.practiceTools}>
            <TouchableOpacity style={styles.toolButton}>
              <Ionicons name="musical-notes-outline" size={24} color="#FFFFFF" />
              <Text style={styles.toolButtonText}>Métronome</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Ionicons name="recording-outline" size={24} color="#FFFFFF" />
              <Text style={styles.toolButtonText}>Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
              <Text style={styles.toolButtonText}>Notes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {renderPieceSelector()}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  currentPieceCard: {
    backgroundColor: '#2C2C2C', // Dark card
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentPieceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  currentPieceSection: {
    color: '#999999',
    marginTop: 5,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2C2C2C', // Dark circle
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // White timer text
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#ffd700',
  },
  stopButton: {
    backgroundColor: '#c42348',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  practiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#2C2C2C', // Dark card background
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    color: '#999999',
    marginTop: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  practiceTools: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolButton: {
    backgroundColor: '#2C2C2C', // Dark button background
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolButtonText: {
    color: '#FFFFFF',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2C2C2C', // Dark modal background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  pieceOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3E3E3E',
  },
  pieceOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pieceOptionSection: {
    color: '#999999',
    marginTop: 5,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: '#FFA500',
  },
  resumeButton: {
    backgroundColor: '#4caf50',
  },
  piecesContainer: {
    marginTop: 20,
  },
  pieceStatCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  pieceStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pieceStatContent: {
    marginTop: 10,
  },
  statText: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    color: '#FFFFFF',
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#3E3E3E',
  },
});
