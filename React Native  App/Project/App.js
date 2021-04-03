// In App.js in a new project
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Screen/Home';
import { Button, View } from "react-native";
import CreateEmployee from './Screen/CreateEmployee';
import Profile from './Screen/Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
function Navigating() {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: 'white',
            headerRight: () => (
              <FontAwesome5
                name="ellipsis-v"
                size={20}
                color={'white'}
                onPress={() => console.log('Hello')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Navigating />
    </NavigationContainer>
  );
}

export default App;
