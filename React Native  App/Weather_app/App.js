import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screen/SplashScreen';
import SearchScreen from './src/screen/SearchScreen';
import HomeScreen from './src/screen/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabNavigating = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search-plus';
          }
          return <FontAwesome5 name={iconName} size={30} color={color} />;
        },
        tabBarActiveBackgroundColor: '#22abfd',
        tabBarInactiveBackgroundColor: '#22abfd',
        tabBarActiveTintColor: '#2fff00',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold'},
      })}>
      <stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{city: 'Dhaka'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
const stackNavigating = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="HomeScreen"
        component={tabNavigating}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

const App = () => {
  return <NavigationContainer>{stackNavigating()}</NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
