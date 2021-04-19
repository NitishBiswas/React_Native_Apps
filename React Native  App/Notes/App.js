/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './src/reducers/reducer';
import NotesList from './src/screen/NotesList';
import CreateNotes from './src/screen/CreateNotes';
import DetailScreen from './src/screen/DetaileScreen';
import SplashScreen from './src/screen/SplashScreen';

const store = createStore(reducer);
const stack = createStackNavigator();

const Navigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Splash" component={SplashScreen} options={{
        headerShown: false,
      }} />
      <stack.Screen name="Notes List" component={NotesList} options={{
        title: 'Notes',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerLeft: () => {
          return null;
        },
      }} />
      <stack.Screen name="Create Notes" component={CreateNotes} options={{
        title: 'Create Note',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <stack.Screen name="Details" component={DetailScreen} options={{
        title: 'Details',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {Navigating()}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
