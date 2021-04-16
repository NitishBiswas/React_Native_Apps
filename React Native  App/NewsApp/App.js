/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tab1 from './src/screen/Tab1';
import Tab3 from './src/screen/Tab3';
import Tab2 from './src/screen/Tab2';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tabs.Navigator screenOptions={{
      tabBarActiveTintColor: 'white',
      tabBarStyle: { backgroundColor: 'blue' },
      tabBarIndicatorStyle: { backgroundColor: 'white' },
      tabBarLabelStyle: { fontSize: 16 }
    }}>
      <Tabs.Screen name="General" component={Tab3} />
      <Tabs.Screen name="Business" component={Tab2} />
      <Tabs.Screen name="Technology" component={Tab1} />
    </Tabs.Navigator>
  )
}

const navigating = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TabScreen" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="blue" />
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>News App</Text>
      </View>
      {navigating()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  }
})

export default App;
