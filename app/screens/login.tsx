// app/screens/Login.tsx

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Pressable, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

import { AuthService } from '../../AuthService';
import { useAuth } from '../context/AuthContext';
import { ProfileService } from '../../ProfileService';
import { StorageService } from '../../storageService';

const { height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setWarning('Please fill out all fields.');
      return;
    }

    try {
      await AuthService.logout();
      await AuthService.loginWithEmail(email, password);
      const currentUser = await AuthService.currentUser();

      if (!currentUser) {
        setWarning('Failed to retrieve user info.');
        return;
      }

      setUser({
        username: currentUser.username,
        email: currentUser.email || '',
      });

      const aliasRes = await ProfileService.getUserAliasIDByEmail(email);
      const aliasId = aliasRes?.UniqueAliasId;

      if (aliasId) {
        await StorageService.setData('aliasId', aliasId);
      }

      console.log('Navigating to Main...');
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (error: any) {
      if (error.name === 'UserNotConfirmedException') {
        setWarning('Please confirm your email before logging in.');
      } else if (error.message === 'Network Error') {
        setWarning('Check your internet connection.');
      } else {
        console.error('Login error:', error);
        setWarning(error.message || 'Login failed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subheader}>Log in to continue your learning journey</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => { setEmail(text); setWarning(''); }}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => { setPassword(text); setWarning(''); }}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#666" />
          </Pressable>
        </View>

        {warning !== '' && <Text style={styles.warningText}>{warning}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inner: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f766e',
    textAlign: 'center',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  warningText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#0f766e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#334155',
    fontSize: 14,
  },
  linkText: {
    color: '#0f766e',
    fontWeight: '600',
  },
});
