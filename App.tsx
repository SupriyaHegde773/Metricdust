import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws';
import type { RootStackParamList } from './types';

import { AuthProvider } from './app/context/AuthContext';
import ProtectedRoute from './app/components/ProtectedRoute';

import Welcome from './app/screens/welcome';
import Login from './app/screens/login';
import Signup from './app/screens/signup';
import Authorized from './app/screens/authorized'; // This renders BottomTabs or Home etc

Amplify.configure(awsConfig);

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
          <Stack.Screen
            name="Main"
            children={() => (
              <ProtectedRoute>
                <Authorized />
              </ProtectedRoute>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
