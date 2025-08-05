import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { AuthService } from '../../AuthService';

export default function Signup() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Signup'>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirm) {
      setWarning('Please fill all fields.');
      return;
    }
    if (password !== confirm) {
      setWarning('Passwords do not match.');
      return;
    }

    try {
      const response = await AuthService.signUpWithEmail(email, password);
      console.log('✅ Signup successful:', response);
      await AuthService.logout();
      navigation.replace('Login');
    } catch (err: any) {
      console.error('❌ Signup failed:', err);
      setWarning(err.message || 'Signup failed.');
    }
  };

  const handleGoogleSignup = () => {
    // Simulated success — replace with real OAuth later
    console.log('✅ Google signup simulated');
    navigation.reset({ index: 0, routes: [{ name: 'ProfileSetup' }] });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Ionicons name="arrow-back-outline" size={20} color="#0f172a" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start your learning journey</Text>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
          <Ionicons name="logo-google" size={18} color="#334155" />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or continue with email</Text>

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#334155" />
          </Pressable>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#334155" />
          </Pressable>
        </View>

        {warning !== '' && <Text style={styles.warning}>{warning}</Text>}

        <TouchableOpacity style={styles.createBtn} onPress={handleSignup}>
          <Text style={styles.createBtnText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.loginPrompt}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log in</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#0f172a',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#475569',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  googleText: {
    marginLeft: 8,
    color: '#334155',
    fontWeight: '500',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#64748b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  createBtn: {
    backgroundColor: '#0f766e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginPrompt: {
    marginTop: 16,
    textAlign: 'center',
    color: '#334155',
  },
  loginLink: {
    color: '#0f766e',
    fontWeight: '600',
  },
  warning: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 10,
  },
});
