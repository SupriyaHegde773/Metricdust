import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔍 Non-functional Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for free courses..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
        <Text style={styles.heroTitle}>Unleash Your Hidden Potential</Text>
        <Text style={styles.heroSubtitle}>Discover talents you never knew you had</Text>

        <View style={styles.heroCircle}>
          <Text style={styles.heroInitial}>S</Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.startButtonText}>Start Your Journey</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </Animated.View>

      {/* Features Section */}
      <Text style={styles.sectionTitle}>What's Your Superpower?</Text>
      <View style={styles.featureList}>
        {/* Feature Cards... (same as before) */}
      </View>

      {/* Quick Start Section */}
      <Text style={styles.sectionTitle}>Ready for Adventure?</Text>
      <TouchableOpacity style={styles.quickStartCard} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.quickStartTitle}>Wonder what makes you special?</Text>
        <Text style={styles.quickStartDesc}>
          Our quiz reveals talents hiding just beneath the surface!
        </Text>
        <View style={styles.quickStartButton}>
          <Text style={styles.quickStartButtonText}>Take the Talent Quiz</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>

      <View style={styles.quickButtonsRow}>
        <TouchableOpacity
          style={[styles.quickButton, styles.quickButtonYellow]}
          onPress={() => navigation.navigate('Roadmap')}
        >
          <Text style={styles.quickButtonText}>Your Success Map</Text>
          <Ionicons name="arrow-forward" size={16} color="#0f766e" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, styles.quickButtonOrange]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.quickButtonText}>Your Journey Log</Text>
          <Ionicons name="arrow-forward" size={16} color="#0f766e" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4' },

  // 🔍 Search bar styles
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },

  // Rest of your styles (unchanged)
  heroSection: { alignItems: 'center', marginBottom: 24 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', color: '#0f766e', textAlign: 'center', marginBottom: 6 },
  heroSubtitle: { fontSize: 16, color: '#10b981', textAlign: 'center', marginBottom: 20 },
  heroCircle: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#10b981', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  heroInitial: { fontSize: 64, fontWeight: 'bold', color: '#fff' },
  startButton: { flexDirection: 'row', backgroundColor: '#10b981', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0f766e', marginVertical: 16 },
  featureList: { gap: 16 },
  featureCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 2 },
  activeCardGreen: { transform: [{ scale: 1.02 }], shadowColor: '#10b981' },
  activeCardYellow: { transform: [{ scale: 1.02 }], shadowColor: '#fbbf24' },
  activeCardOrange: { transform: [{ scale: 1.02 }], shadowColor: '#f97316' },
  featureIcon: { padding: 12, borderRadius: 30, marginRight: 12 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#0f766e' },
  featureDesc: { fontSize: 13, color: '#334155' },
  quickStartCard: { backgroundColor: '#fef3c7', borderRadius: 12, padding: 16, marginTop: 8, elevation: 2 },
  quickStartTitle: { fontSize: 16, fontWeight: '600', color: '#0f766e', marginBottom: 6 },
  quickStartDesc: { fontSize: 13, color: '#334155', marginBottom: 10 },
  quickStartButton: { flexDirection: 'row', backgroundColor: '#f97316', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  quickStartButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  quickButtonsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  quickButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, borderWidth: 1 },
  quickButtonYellow: { borderColor: '#fbbf24', backgroundColor: '#fefce8' },
  quickButtonOrange: { borderColor: '#f97316', backgroundColor: '#fff7ed' },
  quickButtonText: { fontSize: 13, fontWeight: '600', color: '#0f766e' },
});
