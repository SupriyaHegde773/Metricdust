import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavProp>(); // ✅ moved inside
  const [fadeAnim] = useState(new Animated.Value(0));
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <TouchableOpacity
          style={[styles.featureCard, activeCard === 0 && styles.activeCardGreen]}
          onPress={() => navigation.navigate('Quiz')}
          onPressIn={() => setActiveCard(0)}
          onPressOut={() => setActiveCard(null)}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#ecfdf5' }]}>
            <Ionicons name="book" size={28} color="#10b981" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Discover Your Genius</Text>
            <Text style={styles.featureDesc}>Take our quick quiz to unlock hidden talents</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, activeCard === 1 && styles.activeCardYellow]}
          onPress={() => navigation.navigate('Roadmap')}
          onPressIn={() => setActiveCard(1)}
          onPressOut={() => setActiveCard(null)}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#fefce8' }]}>
            <Ionicons name="map" size={28} color="#fbbf24" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Build Your Success Path</Text>
            <Text style={styles.featureDesc}>Create your custom roadmap to awesomeness</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, activeCard === 2 && styles.activeCardOrange]}
          onPress={() => navigation.navigate('Achievements')}
          onPressIn={() => setActiveCard(2)}
          onPressOut={() => setActiveCard(null)}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#fff7ed' }]}>
            <Ionicons name="trophy" size={28} color="#f97316" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Collect Epic Rewards</Text>
            <Text style={styles.featureDesc}>Earn awesome badges as you progress</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Start Section */}
      <Text style={styles.sectionTitle}>Ready for Adventure?</Text>
      <TouchableOpacity
        style={styles.quickStartCard}
        onPress={() => navigation.navigate('Quiz')}
      >
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

// 📌 Keep styles same — they’re already good!
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4' },
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
