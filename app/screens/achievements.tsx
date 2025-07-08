import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const badges = [
  { name: 'Quiz Master', unlocked: true },
  { name: 'Roadmap Explorer', unlocked: true },
  { name: 'Skill Builder', unlocked: false },
  { name: 'Course Conqueror', unlocked: false },
];

export default function Achievements() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Achievements</Text>
      <Text style={styles.subheading}>Collect badges as you progress through your journey.</Text>

      <View style={styles.badgeGrid}>
        {badges.map((badge, i) =>
          badge.unlocked ? (
            <LinearGradient
              key={i}
              colors={['#34d399', '#059669']}
              style={[styles.badgeCard, styles.unlocked]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.badgeIcon}>🏆</Text>
              <Text style={styles.badgeTitle}>{badge.name.toUpperCase()}</Text>
              <Text style={[styles.badgeStatus, { color: '#d1fae5' }]}>UNLOCKED</Text>
            </LinearGradient>
          ) : (
            <View key={i} style={[styles.badgeCard, styles.locked]}>
              <Text style={styles.badgeIcon}>🔒</Text>
              <Text style={styles.badgeTitle}>{badge.name.toUpperCase()}</Text>
              <Text style={styles.badgeStatus}>LOCKED</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#065f46',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
    textAlign: 'center',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  unlocked: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  locked: {
    backgroundColor: '#fde68a',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  badgeIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  badgeTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#064e3b',
    letterSpacing: 1,
  },
  badgeStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
});
