import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import DeviceScreen from './src/screens/DeviceScreen';
import TreatmentScreen from './src/screens/TreatmentScreen';

const Stack = createNativeStackNavigator();

const theme = {
  colors: {
    primary: '#4285F4',
    accent: '#34A853',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#202124',
    error: '#EA4335',
    success: '#34A853',
    warning: '#FBBC05',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }}>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: '灵境光盔' }} 
            />
            <Stack.Screen 
              name="Device" 
              component={DeviceScreen} 
              options={{ title: '设备管理' }} 
            />
            <Stack.Screen 
              name="Treatment" 
              component={TreatmentScreen} 
              options={{ title: '治疗模式' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
} 