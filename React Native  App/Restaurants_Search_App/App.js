import React from 'react';
import {StyleSheet} from 'react-native';
import SearchScreen from './src/screen/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './src/screen/DetailsScreen';

const stack = createStackNavigator();

const navigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Restaurants',
          headerStyle: {
            backgroundColor: '#fd499e',
          },
          headerTintColor: '#fff',
        }}
      />
      <stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#fd499e',
          },
          headerTintColor: '#fff',
        }}
      />
    </stack.Navigator>
  );
};

const App = () => {
  return <NavigationContainer>{navigating()}</NavigationContainer>;
};

const styles = StyleSheet.create({});

export default App;
