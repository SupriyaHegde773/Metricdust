import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { AuthService } from '../../AuthService';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function Signup() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [warning, setWarning] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
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

      // OPTIONAL: sign out if user gets auto-signed in
      await AuthService.logout();

      // 🔁 redirect to login
      navigation.replace('Login');
    } catch (err: any) {
      console.error('❌ Signup failed:', err);
      setWarning(err.message || 'Signup failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        style={styles.input}
      />
      {warning !== '' && <Text style={styles.warningText}>{warning}</Text>}

      <Pressable style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#0f172a' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  warningText: { color: '#dc2626', textAlign: 'center', marginBottom: 12 },
  signupButton: { backgroundColor: '#14b8a6', padding: 14, borderRadius: 8 },
  signupText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  footerText: { marginTop: 16, textAlign: 'center', color: '#334155' },
  linkText: { color: '#0f766e', fontWeight: '600' },
});
