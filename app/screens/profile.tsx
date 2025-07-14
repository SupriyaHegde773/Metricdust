import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProfileService } from '../../ProfileService';
import { StorageService } from '../../storageService';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aliasId, setAliasId] = useState<string | null>(null); // ⬅️ NEW

  const loadProfile = async () => {
    try {
      const storedAliasId = await StorageService.getData('aliasId');
      const email = user?.email;
      console.log('🔁 Loaded aliasId from storage:', storedAliasId);


      if (!storedAliasId || !email) {
        console.warn('Missing aliasId or email');
        return;
      }

      setAliasId(storedAliasId); // ⬅️ Save to local state
      const res = await ProfileService.getProfileDetails(email, storedAliasId);
      setProfile(res);
    } catch (e) {
      console.warn('Failed to load profile:', e);
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
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const displayName = profile?.name || profile?.username || 'User';
  const email = profile?.email || user?.email || 'no-email@example.com';
  const username = profile?.username || user?.username || 'Unknown';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarLetter}>
            <Text style={styles.avatarLetterText}>{displayName.charAt(0)}</Text>
          </View>
        </View>

        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.subText}>Username: {username}</Text>
        <Text style={styles.subText}>Email: {email}</Text>
        <Text style={styles.subText}>Alias ID: {aliasId || 'Not Available'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/editprofile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24 },
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
  avatarLetterText: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#0f766e', marginTop: 8 },
  subText: { fontSize: 13, color: '#64748b', marginTop: 4 },
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
