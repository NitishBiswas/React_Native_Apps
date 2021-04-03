import React from 'react';
import {Card} from 'react-native-elements';
import { Text, TouchableOpacity, View } from "react-native";;
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ContactScreen(){
  return(
    <Card>
      <Card.Title style={{fontSize: 25, fontWeight: 'bold'}}>
        Contact Information
      </Card.Title>
      <Card.Divider />
      <View>
        <Text style={{fontSize: 23}}>House No.84, Road No. 7/A</Text>
        <Text style={{fontSize: 23}}>Satmasjid Road, Dhaka 1205</Text>
        <Text style={{fontSize: 23}}>Bangladesh</Text>
        <Text style={{fontSize: 23}}>Hours: Open & Closes 11PM</Text>
        <Text style={{fontSize: 23}}>Phone: 09613-777888</Text>
        <Text style={{fontSize: 23}}>Order: foodpanda.com.bd</Text>
      </View>
    </Card>
  );
}

const Stack = createStackNavigator();
function ContactComponent({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact Info"
        component={ContactScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FontAwesome5
                name={'bars'}
                size={24}
                color={'white'}
                style={{paddingLeft: 10}}
              />
            </TouchableOpacity>
          ),
          title: 'Contact Info',
          headerStyle: {
            backgroundColor: '#1eb7f4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default ContactComponent;
