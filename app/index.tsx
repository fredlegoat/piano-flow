import React, { useEffect, useRef, useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import SettingsModal from './SettingsModal';

export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const todayStats = { practiced: true, timeSpent: 45, currentStreak: 5 };
  const nextPiece = { title: "Sonate au Clair de Lune", section: "Premier Mouvement", difficulty: "Difficile" };
  const recentMilestones = ["Complété l'introduction de 'Fur Elise'", "Pratiqué 7 jours d'affilée", "Maîtrisé la gamme de Do majeur"];
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour Fred !</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setIsSettingsVisible(true)}>
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <Animated.View style={[styles.streakCard, { opacity: fadeAnim }]}>
          <View style={styles.streakInfo}>
            <Ionicons name="flame" size={24} color="#FF9500" />
            <Text style={styles.streakText}>
              {todayStats.currentStreak} Jours d'affilée !
            </Text>
          </View>
          {todayStats.practiced ? (
            <View style={styles.practicedContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.practicedText}>
                Pratiqué {todayStats.timeSpent} minutes aujourd'hui
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.practiceButton}>
              <Text style={styles.practiceButtonText}>Commencer la pratique</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Next Piece Card */}
        <Animated.View style={[styles.nextPieceCard, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>À venir</Text>
          <View style={styles.nextPieceInfo}>
            <View>
              <Text style={styles.pieceTitle}>{nextPiece.title}</Text>
              <Text style={styles.pieceSection}>{nextPiece.section}</Text>
            </View>
            <View style={[styles.difficultyBadge, styles.hardBadge]}>
              <Text style={styles.difficultyText}>{nextPiece.difficulty}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Reprendre la pratique</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Milestones Card */}
        <Animated.View style={[styles.milestonesCard, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Derniers objectifs</Text>
          {recentMilestones.map((milestone, index) => (
            <View key={index} style={styles.milestoneItem}>
              <Ionicons name="trophy" size={20} color="#FFD700" />
              <Text style={styles.milestoneText}>{milestone}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('history')}>
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Historique</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('exercices')}>
            <Ionicons name="extension-puzzle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Exercices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('lessons')}>
            <Ionicons name="school-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Leçon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('goals')}>
            <Ionicons name="rocket-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Objectif</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SettingsModal 
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: -30,
    backgroundColor: '#1E1E1E', // Dark background
  },
  scrollView: {
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 30,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on dark background
  },
  settingsButton: {
    padding: 5,
  },
  streakCard: {
    backgroundColor: '#2C2C2C', // Darker card background
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFFFFF',
  },
  practicedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practicedText: {
    marginLeft: 5,
    color: '#FFFFFF',
  },
  practiceButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  practiceButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nextPieceCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  nextPieceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pieceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pieceSection: {
    color: '#999999',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  difficultyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#FFD200',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  milestonesCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  milestoneText: {
    marginLeft: 10,
    color: '#FFFFFF',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  actionButtonText: {
    marginTop: 5,
    color: '#FFFFFF',
  },
});
