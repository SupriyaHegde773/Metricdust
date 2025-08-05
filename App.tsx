// Import and configure AWS Amplify first
import {Amplify} from 'aws-amplify';
import awsConfig from './aws';

// Configure Amplify
Amplify.configure(awsConfig);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from './types';
import ProfileSetup from './app/screens/ProfileSetup';
import { AuthProvider } from './app/context/AuthContext';
import BottomTabs from './app/navigation/BottomTabs';
import Welcome from './app/screens/welcome';
import Login from './app/screens/login';
import Signup from './app/screens/signup';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="Main" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
