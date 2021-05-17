/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import LoginScreen from './screens/LoginScreen';
import { reducer } from './reducer/reducer';

const store = createStore(reducer);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NavigateScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#ff0041',
      },
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="Watch" component={HomeScreen}
        options={{
          headerTitle: 'Watch Shop',
          headerTitleAlign: 'center',
        }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Favourite" component={FavouritesScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#ff0041',
      },
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ff0041',
      },
      tabBarLabelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      tabBarActiveBackgroundColor: '#ff0041',
      tabBarActiveTintColor: 'white',
      tabBarInactiveBackgroundColor: 'white',
      tabBarInactiveTintColor: '#ff0041',
    }}>
      <Tab.Screen name="Home" component={NavigateScreen} options={{
        headerShown: false,
        tabBarIcon: (tabData) => <FontAwesome5 name={'home'} size={20} color={tabData.color} />,
      }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{
        tabBarIcon: (tabData) => <FontAwesome5 name={'heart'} size={20} color={tabData.color} />,
      }} />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {MyTabs()}
      </NavigationContainer>
    </Provider>

  );
};

export default App;
