// app/screens/Welcome.tsx

import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function Welcome() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Background gradients */}
      <View style={styles.bgTopRight} />
      <View style={styles.bgBottomLeft} />

      {/* Logo + Title */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.appName}>SkillSpark</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Ignite Your Learning Journey</Text>
      <Text style={styles.description}>
        SkillSpark helps you master new skills through personalized learning paths, interactive quizzes,
        and achievement tracking designed for your success.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        <Pressable style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  bgTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    height: height / 2,
    backgroundColor: 'rgba(231,111,81,0.15)',
    borderBottomLeftRadius: width,
  },
  bgBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: height / 2,
    backgroundColor: 'rgba(42,157,143,0.15)',
    borderTopRightRadius: width,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#0f766e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logoText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#134e4a',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f766e',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
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
  signupButton: {
    borderWidth: 1,
    borderColor: '#0f766e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupText: {
    color: '#0f766e',
    fontSize: 15,
    fontWeight: '500',
  },
});
