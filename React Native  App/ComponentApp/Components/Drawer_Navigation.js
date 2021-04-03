import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

function HomeScreen({navigation}) {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color: 'skyblue'}}>Home Screen</Text>
      <Button title="Open Drawer Navigation" onPress={()=>{navigation.openDrawer()}} />
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
function AboutScreen() {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, color: 'skyblue'}}>About Screen</Text>
    </View>
  )
}

const Drawer = createDrawerNavigator();

function Drawer_Navigation() {
  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={HomeScreen}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Drawer_Navigation;
