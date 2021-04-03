
//change App to Stack_Navigation from index.js
import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Details"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
    </View>
  );
}
function DetailsScreen() {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
const Stack = createStackNavigator();
function Stack_Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Stack_Navigation;
