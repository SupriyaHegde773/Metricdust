import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const name = 'Emma Johnson'; // <-- define the user's name once

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarLetter}>
            <Text style={styles.avatarLetterText}>
              {name.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Student • Joined May 2024</Text>
      </View>

      {/* Interest Areas */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Interest Areas</Text>
        <View style={styles.tagGroup}>
          <View style={styles.tag}><Text style={styles.tagText}>Web Dev</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>UI/UX</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>AI/ML</Text></View>
          <TouchableOpacity style={[styles.tag, styles.addMoreTag]}>
            <Text style={styles.addMoreText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Overview */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Web Development Path</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
          <Text style={styles.progressPercent}>60%</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Creative Design Path</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%', backgroundColor: '#fbbf24' }]} />
          </View>
          <Text style={styles.progressPercent}>40%</Text>
        </View>
      </View>

      {/* Recent Badges */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Badges</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>📘</Text>
            <Text style={styles.badgeLabel}>Quiz Master</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>🏅</Text>
            <Text style={styles.badgeLabel}>Roadmap Pro</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>✨</Text>
            <Text style={styles.badgeLabel}>Skill Builder</Text>
          </View>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/editprofile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0fdf4',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: '#10b981',
    borderRadius: 999,
    padding: 3,
    marginBottom: 10,
  },
  avatarLetter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetterText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f766e',
  },
  subText: {
    fontSize: 13,
    color: '#64748b',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#0f766e',
    fontWeight: '500',
  },
  addMoreTag: {
    backgroundColor: '#e0f2fe',
  },
  addMoreText: {
    fontSize: 13,
    color: '#0284c7',
    fontWeight: '600',
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 4,
  },
  progressBar: {
    backgroundColor: '#e5e7eb',
    height: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 8,
  },
  progressPercent: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  badge: {
    alignItems: 'center',
    width: '30%',
  },
  badgeEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
