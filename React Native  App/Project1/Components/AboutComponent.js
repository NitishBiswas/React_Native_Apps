import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {Avatar, Card, ListItem} from 'react-native-elements';
import {leaders} from '../shared/leaders';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const History = () => {
  return (
    <View style={{flex: 100}}>
      <Card containerStyle={{flex: 55, margin: 7}}>
        <Card.Title style={{fontSize: 23, fontWeight: 'bold'}}>
          Our History
        </Card.Title>
        <Card.Divider />
        <View>
          <Text style={{fontSize: 20, marginBottom: 15}}>
            KFC was founded by Colonel Harland Sanders, an entrepreneur who
            began selling fried chicken from his roadside restaurant in Corbin,
            Kentucky, during the Great Depression. Sanders identified the
            potential of the restaurant franchising concept, and the first
            "Kentucky Fried Chicken" franchise opened in Utah in 1952.
          </Text>
          <Text style={{fontSize: 20}}>
            KFC popularized chicken in the fast-food industry, diversifying the
            market by challenging the established dominance of the hamburger.
          </Text>
        </View>
      </Card>
      <Card containerStyle={{flex: 45, margin: 7}}>
        <Card.Title style={{fontSize: 23, fontWeight: 'bold'}}>
          Corporate Leadership
        </Card.Title>
        <Card.Divider />
        <FlatList
          data={leaders}
          renderItem={({item}) => (
            <ListItem key={item.id} hideChevron={true} bottomDivider>
              <Avatar rounded={true} source={{uri: item.img}} size={75} />
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 20}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{fontSize: 15}}>
                  {item.description}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          keyExtractor={(item) => item.id}
        />
      </Card>
    </View>
  );
};

const Stack = createStackNavigator();
function AboutComponent({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={History}
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
          title: 'About',
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

export default AboutComponent;
