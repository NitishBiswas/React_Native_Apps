import React from 'react';
import SearchScreen from './src/screen/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from './src/reducers/reducer';
import DetailScreen from './src/screen/DetailScreen';
import Repository from './src/screen/Repository';
import Follower from './src/screen/Follower';

const store = createStore(reducer);

const stack = createStackNavigator();
const navigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={SearchScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          title: 'GitHub User',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <stack.Screen
        name="Repositories"
        component={Repository}
        options={{
          title: 'Repositories',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <stack.Screen
        name="Followers"
        component={Follower}
        options={{
          title: 'Followers',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>{navigating()}</NavigationContainer>
    </Provider>
  );
};

export default App;
