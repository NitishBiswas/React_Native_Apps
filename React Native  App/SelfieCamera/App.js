/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './screens/CameraScreen';
import GallaryScreen from './screens/GallaryScreen';

const Stack = createStackNavigator();

const stackNavigating = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="camera" component={CameraScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Gallary" component={GallaryScreen} options={{
        headerStyle: {
          borderBottomWidth: 1,
        },
      }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      {stackNavigating()}
    </NavigationContainer>
  );
};

export default App;
