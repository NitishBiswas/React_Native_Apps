import * as React from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Scroll from './Components/Scroll';

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 55}}>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Scroll />
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('./Images/list.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}
const DetailsStack = createStackNavigator();

function DetailsStackScreen() {
  return (
    <DetailsStack.Navigator>
      <DetailsStack.Screen name="Details" component={DetailsScreen} />
      <DetailsStack.Screen name="Settings" component={SettingsScreen} />
    </DetailsStack.Navigator>
  );
}
const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function HomeScreenTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
      <Tab.Screen name="Details" component={DetailsStackScreen} />
    </Tab.Navigator>
  );
}
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/*<Tab.Navigator>*/}
      {/*  <Tab.Screen name="Home" component={HomeStackScreen} />*/}
      {/*  <Tab.Screen name="Settings" component={SettingsStackScreen} />*/}
      {/*  <Tab.Screen name="Details" component={DetailsStackScreen} />*/}
      {/*</Tab.Navigator>*/}
      <Drawer.Navigator initialRouteName={HomeScreenTab}>
        <Drawer.Screen name="Home" component={HomeScreenTab} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="About" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
