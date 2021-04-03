import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import IndexScreen from './src/screen/IndexScreen';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './src/reducers/reducer';
import AddDataScreen from './src/screen/AddDataScreen';

const store = createStore(reducer);
const stack = createStackNavigator();

const navigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={IndexScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Add"
        component={AddDataScreen}
        options={{
          title: 'Add',
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
  return (
    <Provider store={store}>
      <NavigationContainer>{navigating()}</NavigationContainer>
    </Provider>
  );
};

export default App;
