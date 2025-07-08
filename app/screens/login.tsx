import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { AuthService } from '../../AuthService';
import { useAuth } from '../context/AuthContext';

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
      // ✅ Sign out any previous session (fixes "already signed in" error)
      await AuthService.logout();

      // ✅ Sign in user
      await AuthService.loginWithEmail(email, password);

      // ✅ Get current user info
      const currentUser = await AuthService.currentUser();
      if (currentUser) {
        setUser({
          username: currentUser.username,
          email: currentUser.email || '',
        });

        // ✅ Navigate to Protected Main screen
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      } else {
        setWarning('Failed to retrieve user information.');
      }
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      setWarning(error.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setWarning('');
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setWarning('');
          }}
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
        Don&apos;t have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: 'center' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#0f172a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: { flex: 1, paddingVertical: 10 },
  warningText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#14b8a6',
    padding: 14,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#334155',
  },
  linkText: {
    color: '#0f766e',
    fontWeight: '600',
  },
});
