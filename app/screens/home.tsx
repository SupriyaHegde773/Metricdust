// HomePage.tsx

import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

const HomePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.title}>Unleash Your Hidden Potential</Text>
        <Text style={styles.subtitle}>Discover talents you never knew you had</Text>

        <View style={styles.logoCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.startButtonText}>Start Your Journey →</Text>
        </TouchableOpacity>
      </View>

      {/* Superpower Cards */}
      <Text style={styles.sectionTitle}>What's Your Superpower?</Text>

      <TouchableOpacity style={[styles.card, styles.cardGreen]} onPress={() => navigation.navigate('Quiz')}>
        <Ionicons name="book-outline" size={24} color="#2C9778" style={styles.icon} />
        <View>
          <Text style={styles.cardTitle}>Discover Your Genius</Text>
          <Text style={styles.cardSubtitle}>Take our quick quiz to unlock your hidden talents</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.cardYellow]} onPress={() => navigation.navigate('Roadmap')}>
        <MaterialCommunityIcons name="chart-line" size={24} color="#DAA520" style={styles.icon} />
        <View>
          <Text style={styles.cardTitle}>Build Your Success Path</Text>
          <Text style={styles.cardSubtitle}>Create your custom roadmap to awesomeness</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.cardOrange]} onPress={() => navigation.navigate('Achievements')}>
        <Ionicons name="trophy-outline" size={24} color="#F08030" style={styles.icon} />
        <View>
          <Text style={styles.cardTitle}>Collect Epic Rewards</Text>
          <Text style={styles.cardSubtitle}>Earn awesome badges as you crush challenges</Text>
        </View>
      </TouchableOpacity>

      {/* Quiz Prompt */}
      <Text style={styles.sectionTitle}>Ready for Adventure?</Text>
      <View style={styles.quizBox}>
        <Text style={styles.boxTitle}>Wonder what makes you special?</Text>
        <Text style={styles.boxSubtitle}>
          Our quiz reveals talents hiding just beneath the surface!
        </Text>
        <TouchableOpacity style={styles.talentQuizButton} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.quizButtonText}>Take the Talent Quiz →</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Buttons */}
      <View style={styles.quickButtonsRow}>
        <TouchableOpacity
          style={[styles.quickButton, styles.quickButtonTransparent]}
          onPress={() => navigation.navigate('Roadmap')}
        >
          <Text style={[styles.quickButtonText, styles.quickButtonTextGreen]}>Your Success Map</Text>
          <Ionicons name="arrow-forward" size={16} color="#2C9778" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickButton, styles.quickButtonTransparent]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={[styles.quickButtonText, styles.quickButtonTextGreen]}>Your Journey Log</Text>
          <Ionicons name="arrow-forward" size={16} color="#2C9778" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFB',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#def7ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d25a44',
  },
  startButton: {
    backgroundColor: '#2C9778',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
    color: '#334155',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  icon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  cardGreen: {
    borderLeftWidth: 4,
    borderLeftColor: '#2C9778',
  },
  cardYellow: {
    borderLeftWidth: 4,
    borderLeftColor: '#DAA520',
  },
  cardOrange: {
    borderLeftWidth: 4,
    borderLeftColor: '#F08030',
  },
  quizBox: {
    backgroundColor: '#fef9f6',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f5d0c5',
    shadowColor: '#f5d0c5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#b45309',
  },
  boxSubtitle: {
    fontSize: 14,
    color: '#7c7c7c',
    marginBottom: 12,
  },
  talentQuizButton: {
    backgroundColor: '#b45309',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 12,
  },
  quickButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  quickButtonTransparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2C9778',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickButtonTextGreen: {
    color: '#2C9778',
  },
});

export default HomePage;
