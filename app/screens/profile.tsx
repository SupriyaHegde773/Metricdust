import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../../storageService';
import { ProfileService } from '../../ProfileService';

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [aliasId, setAliasId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const id = await StorageService.getData('aliasId');
      const email = user?.email;
      if (!id || !email) return;
      setAliasId(id);
      const res = await ProfileService.getProfileDetails(email, id);
      setProfile(res);
    } catch (e) {
      console.warn('Profile load failed:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  const displayName = profile?.name || 'Emma Johnson';
  const email = profile?.email || user?.email || 'example@example.com';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: `https://api.dicebear.com/7.x/micah/png?seed=${aliasId || 'user'}` }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.subtext}>Student • Joined May 2024</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      {/* Interest Areas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Interest Areas</Text>
        <View style={styles.interestList}>
          {['Web Development', 'UI/UX Design', 'Digital Marketing'].map((item) => (
            <View key={item} style={styles.interestTag}>
              <Text style={styles.interestText}>{item}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.interestAdd}>
            <Text style={styles.addIcon}>+ Add More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Overview */}
      <Text style={styles.sectionTitle}>Progress Overview</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Technical Path</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '25%' }]} />
          </View>
          <Text style={styles.progressPercent}>25%</Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Creative Path</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFillAlt, { width: '40%' }]} />
          </View>
          <Text style={styles.progressPercent}>40%</Text>
        </View>
      </View>

      {/* Static Tabs */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.tabActive]}>Achievements</Text>
        <Text style={styles.tab}>Courses</Text>
        <Text style={styles.tab}>Stats</Text>
      </View>

      {/* Badges */}
      <View style={styles.badgeHeader}>
        <Text style={styles.sectionTitle}>Recent Badges</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="trophy-award" size={24} color="white" />
          <Text style={styles.badgeLabel}>Quiz Master</Text>
        </View>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="map-marker-path" size={24} color="white" />
          <Text style={styles.badgeLabel}>Roadmap Explorer</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#cbd5e1' }]}>
          <Ionicons name="star-outline" size={24} color="#64748b" />
          <Text style={styles.badgeLabel}>Skill Builder</Text>
        </View>
      </View>

      {/* Recommendations */}
      <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
      <View style={styles.nextStepCard}>
        <Text style={styles.nextStepTitle}>Web Development Basics</Text>
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeText}>Ready for a New Challenge?</Text>
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={styles.challengeButtonText}>Take Skills Assessment →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9fafb' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f1f5f9',
    marginRight: 12,
  },
  headerText: { flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  subtext: { color: '#64748b' },

  card: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#0f172a' },
  interestList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestTag: {
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: { fontSize: 12, color: '#0f766e' },
  interestAdd: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20,
  },
  addIcon: { fontSize: 12, color: '#0f172a' },

  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },

  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  progressCard: {
    flex: 1, marginRight: 8, backgroundColor: 'white', borderRadius: 10,
    padding: 12,
  },
  progressTitle: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#0f766e',
  },
  progressBarFillAlt: {
    height: 8,
    backgroundColor: '#f59e0b',
  },
  progressPercent: { marginTop: 6, fontSize: 12, color: '#475569' },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  tab: {
    paddingVertical: 8,
    fontSize: 14,
    color: '#94a3b8',
  },
  tabActive: {
    color: '#0f766e',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderColor: '#0f766e',
  },

  badgeHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  linkText: { fontSize: 12, color: '#0f766e', fontWeight: '500' },
  badgeRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 24,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#fb923c',
    borderRadius: 50,
    padding: 12,
    width: 80,
    height: 80,
    justifyContent: 'center',
  },
  badgeLabel: {
    marginTop: 4,
    fontSize: 10,
    color: '#334155',
    textAlign: 'center',
  },

  nextStepCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  nextStepTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a' },

  challengeCard: {
    backgroundColor: '#f59e0b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 40,
  },
  challengeText: { color: 'white', fontWeight: '600', marginBottom: 10 },
  challengeButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  challengeButtonText: { color: '#0f172a', fontWeight: '600' },
});
