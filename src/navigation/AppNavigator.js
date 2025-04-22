import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DiaryScreen from '../screens/DiaryScreen';
import CameraScreen from '../screens/CameraScreen';
import FoodResultScreen from '../screens/FoodResultScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* App Screens */}
        <Stack.Screen
          name="Diary"
          component={DiaryScreen}
          options={{
            title: 'DFCT Food Diary',
            headerLeft: () => null, // Disable back button
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: 'Take Food Photo',
          }}
        />
        <Stack.Screen
          name="FoodResult"
          component={FoodResultScreen}
          options={{
            title: 'Food Analysis',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 