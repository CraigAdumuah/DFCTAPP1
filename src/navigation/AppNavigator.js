import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#007AFF', // iOS blue color
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17, // iOS default font size
          },
          headerShadowVisible: false, // iOS-style header without shadow
          headerBackTitleVisible: false, // iOS-style back button without text
        }}
      >
        {/* ... existing screens ... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 