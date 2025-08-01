import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const achievements = [
  {
    id: 1,
    name: 'Quiz Master',
    icon: <MaterialIcons name="quiz" size={24} color="#fff" />,
    unlocked: true,
    description: 'Complete your first interest assessment',
    howToUnlock: 'Complete the interest assessment quiz',
  },
  {
    id: 2,
    name: 'Roadmap Explorer',
    icon: <MaterialCommunityIcons name="map-marker-path" size={24} color="#fff" />,
    unlocked: true,
    description: 'View your personalized learning roadmap',
    howToUnlock: 'Open your roadmap',
  },
  {
    id: 3,
    name: 'Skill Builder',
    icon: <Ionicons name="star-outline" size={24} color="#fff" />,
    unlocked: false,
    description: 'Complete your first skill module',
    howToUnlock: 'Complete a recommended module',
  },
  {
    id: 4,
    name: 'Course Conqueror',
    icon: <MaterialCommunityIcons name="school-outline" size={24} color="#fff" />,
    unlocked: false,
    description: 'Finish a recommended course',
    howToUnlock: 'Finish a course from your learning path',
  },
];

const AchievementsScreen = () => {
  const [tab, setTab] = useState<'badges' | 'milestones'>('badges');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progress = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Achievements</Text>

      {/* Overall Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Progress</Text>
        <Text style={styles.progressCount}>
          {unlockedCount}/{achievements.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.label}>Beginner</Text>
          <Text style={styles.label}>Intermediate</Text>
          <Text style={styles.label}>Advanced</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, tab === 'badges' && styles.tabActive]}
          onPress={() => setTab('badges')}
        >
          <Text style={[styles.tabText, tab === 'badges' && styles.tabTextActive]}>Badges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'milestones' && styles.tabActive]}
          onPress={() => setTab('milestones')}
        >
          <Text style={[styles.tabText, tab === 'milestones' && styles.tabTextActive]}>
            Milestones
          </Text>
        </TouchableOpacity>
      </View>

      {/* Badges */}
      {tab === 'badges' && (
        <View style={styles.grid}>
          {achievements.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badgeCard, badge.unlocked ? styles.unlocked : styles.locked]}
            >
              <View style={styles.iconBox}>{badge.icon}</View>
              <Text style={styles.badgeTitle}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>
                {badge.unlocked ? badge.description : badge.howToUnlock}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Milestones */}
      {tab === 'milestones' && (
        <View style={styles.milestoneCard}>
          <Text style={styles.badgeTitle}>Beginner Explorer</Text>
          <Text style={styles.badgeDescription}>Completed • 100/100</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%', backgroundColor: '#16a34a' }]} />
          </View>
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Continue Learning →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4', flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#065f46',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    elevation: 2,
  },
  cardTitle: { fontWeight: '600', fontSize: 16, marginBottom: 8, color: '#334155' },
  progressCount: { alignSelf: 'flex-end', fontWeight: '500', color: '#64748b' },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    color: '#94a3b8',
  },
  label: { fontSize: 12, color: '#64748b' },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    marginBottom: 16,
  },
  tab: { paddingVertical: 10, flex: 1, alignItems: 'center' },
  tabActive: { backgroundColor: '#bae6fd', borderRadius: 10 },
  tabText: { color: '#0369a1', fontWeight: '500' },
  tabTextActive: { color: '#0c4a6e', fontWeight: '700' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  unlocked: { borderColor: '#10b981', borderWidth: 2 },
  locked: { backgroundColor: '#fef9c3', borderColor: '#facc15', borderWidth: 1 },
  iconBox: {
    backgroundColor: '#0f766e',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  badgeTitle: { fontWeight: '700', fontSize: 14, marginBottom: 6, color: '#1e293b' },
  badgeDescription: { fontSize: 12, color: '#475569', textAlign: 'center' },

  milestoneCard: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  ctaButton: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaText: { color: '#fff', fontWeight: 'bold' },
});

export default AchievementsScreen;
