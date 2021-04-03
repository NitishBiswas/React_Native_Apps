import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  Switch, ScrollView,
} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import ContactComponent from './Components/ContactComponent';
import AboutComponent from './Components/AboutComponent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Avatar, Card, ListItem} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeData} from './shared/HomeData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CustomDrawer} from './Components/CustomDrawer';
import {Comments} from './shared/Comments';

function HomeScreen() {
  return (
    <FlatList
      numColumns={2}
      data={HomeData}
      renderItem={({item}) => (
        <View
          style={{
            flex: 100,
            flexDirection: 'column',
            margin: 10,
            backgroundColor: '#ffffff',
          }}>
          <View>
            <Image
              style={{height: 200, width: '100%'}}
              source={{uri: item.foodImg}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.foodName}
            </Text>
            <Text style={{fontSize: 18, color: 'red'}}>{item.price}</Text>
            <Text style={{fontSize: 15}}>{item.foodDescription}</Text>
          </View>
          <View />
        </View>
      )}
      keyExtractor={(item) => item.foodId}
    />
  );
}

const Stack1 = createStackNavigator();
function HomeStack({navigation}) {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="Home"
        component={HomeScreen}
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
          title: 'Home',
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
    </Stack1.Navigator>
  );
}
function renderComment(props) {
  const comments = props.Comments;
  const commentItem = ({index, item}) => {
    return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Text style={{fontSize: 14}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 14}}>
          {'--' + item.author + ', ' + item.date}
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      data={comments}
      renderItem={commentItem}
      keyExtractor={(item) => item.id}
    />
  );
}
function Details({route}) {
  const {fId, fName, fImage, fDetails, fPrice} = route.params;
  return (
    <ScrollView>
      <Card>
        <Card.Title style={{fontSize: 25}}>{fName}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{height: 200, width: '100%'}}
          source={{uri: fImage}}
        />
        <Card.Title
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Price : {fPrice}
        </Card.Title>
        <Text style={{fontSize: 18}}>{fDetails}</Text>
      </Card>
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        {renderComment({Comments})}
      </Card>
    </ScrollView>
  );
}

function MenuScreen({navigation}) {
  return (
    <FlatList
      style={{margin: 5, backgroundColor: '#d9d9d9'}}
      data={HomeData}
      renderItem={({item}) => (
        <ListItem
          key={item.foodId}
          bottomDivider
          style={{margin: 5}}
          onPress={() => {
            navigation.navigate('Details', {
              fId: item.foodId,
              fName: item.foodName,
              fImage: item.foodImg,
              fPrice: item.price,
              fDetails: item.foodDescription,
            });
          }}>
          <Avatar rounded={true} source={{uri: item.foodImg}} />
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 20}}>
              {item.foodName}
            </ListItem.Title>
            <ListItem.Subtitle style={{fontSize: 15}}>
              {item.foodDescription}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
      keyExtractor={(item) => item.foodId}
    />
  );
}

const Stack2 = createStackNavigator();
function MenuStack({navigation}) {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="Menu"
        component={MenuScreen}
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
          title: 'Menu',
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
      <Stack2.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#1eb7f4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack2.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={'Home'}
        drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            drawerIcon: () => (
              <FontAwesome5 name={'home'} size={24} color={'#41b1ee'} />
            ),
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={AboutComponent}
          options={{
            drawerIcon: () => (
              <FontAwesome5 name={'address-card'} size={24} color={'#41b1ee'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Menu"
          component={MenuStack}
          options={{
            drawerIcon: () => (
              <FontAwesome5 name={'bars'} size={24} color={'#41b1ee'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact Us"
          component={ContactComponent}
          options={{
            drawerIcon: () => (
              <FontAwesome5 name={'address-book'} size={24} color={'#41b1ee'} />
            ),
          }}
        />
        {/*<Drawer.Screen name="Hello" component={Details} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
