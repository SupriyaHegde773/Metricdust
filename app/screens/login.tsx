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
      console.log('Attempting to log in with:', email);
     
      // First try to log out any existing session
      try {
        await AuthService.logout();
        console.log('Successfully logged out any existing session');
      } catch (logoutError) {
        console.warn('No existing session to log out, continuing...');
      }
 
      // Attempt login
      console.log('Attempting login...');
      const loginResponse = await AuthService.loginWithEmail(email, password);
      console.log('Login response:', loginResponse);
     
      // Get current user
      console.log('Fetching current user...');
      const currentUser = await AuthService.currentUser();
      console.log('Current user:', currentUser);
 
      if (!currentUser) {
        const errorMsg = 'Failed to retrieve user info after login';
        console.error(errorMsg);
        setWarning(errorMsg);
        return;
      }
 
      setUser({
        username: currentUser.username,
        email: currentUser.email || '',
      });
 
      console.log('Fetching user alias...');
      const aliasRes = await ProfileService.getUserAliasIDByEmail(email);
      console.log('Alias response:', aliasRes);
      const aliasId = aliasRes?.UniqueAliasId;
 
      if (aliasId) {
        console.log('Saving alias ID to storage:', aliasId);
        await StorageService.setData('aliasId', aliasId);
      }
 
      console.log('Login successful, navigating to Main...');
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (error: any) {
      console.error('Login error:', error);
     
      let errorMessage = 'Login failed. Please try again.';
     
      if (error.name === 'UserNotConfirmedException') {
        errorMessage = 'Please confirm your email before logging in.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
     
      setWarning(errorMessage);
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