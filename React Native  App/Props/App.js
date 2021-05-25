/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import DetailScreen from './Components/DetailScreen';

const stack = createStackNavigator();

const Navigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
      }} />
      <stack.Screen name="Details" component={DetailScreen} options={{
        headerShown: false,
      }} />
    </stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      {Navigating()}
    </NavigationContainer>
  )
}

export default App;