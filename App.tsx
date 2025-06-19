// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Driver_screens/LoginScreen';
import TabNavigator from './navigation/TabNavigator';
import DeliveryNoteScreen from './screens/Driver_screens/DeliveryNoteScreen';

// Define type for navigation stack
export type RootStackParamList = {
  LoginScreen: undefined;
  TabNavigator: undefined;
  DeliveryNote: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="DeliveryNote" component={DeliveryNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
