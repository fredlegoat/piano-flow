import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import the logo image
import LogoImage from '../assets/images/piano-flow-logo.png';

export default function AppLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setIsReady(true);
        }, 500);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    // ... (splash screen code remains the same)
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;
          const routeName = route.name as string;

          if (routeName === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (routeName === 'practice') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (routeName === 'stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (routeName === 'repertoire') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD200',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: 'transparent',
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          href: '/',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Pratique',
          href: '/practice',
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          href: '/stats',
        }}
      />
      <Tabs.Screen
        name="repertoire"
        options={{
          title: 'Répertoire',
          href: '/repertoire',
        }}
      />
      {/* Hide other screens from tab bar, but keep them accessible */}
      <Tabs.Screen
        name="goals"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="exercices"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="SettingsModal"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

// ... (styles remain the same)

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background color
  },
  splashContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF', // Changed to white for better contrast on dark background
    fontWeight: '500', // Made slightly bolder for better readability
  },
});