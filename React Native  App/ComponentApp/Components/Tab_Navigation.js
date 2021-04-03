
//change App to Tab_Navigation from index.js
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color: 'skyblue'}}>Home Screen</Text>
    </View>
  )
}
function DetailsScreen() {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color: 'skyblue'}}>Details Screen</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

function Tab_Navigation() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tab_Navigation;
