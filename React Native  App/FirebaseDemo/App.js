/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  LogBox,
  StatusBar,
  Image,
} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import { config } from './config';

const App = () => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [data, setData] = useState([]);
  LogBox.ignoreLogs(['Setting a timer']);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  return (
    <LinearGradient style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'white' }} colors={['#FF4700', '#fff']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
      <StatusBar backgroundColor="#FF4700" />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={{ borderWidth: 2, borderRadius: 100, borderColor: 'white', elevation: 20 }}>
          <Image source={require('./images/logo.jpg')} style={{ height: 200, width: 200, borderRadius: 100 }} />
        </View>
      </View>
      <View style={{ alignItems: 'center', backgroundColor: 'white', height: '60%', borderTopStartRadius: 50, borderTopEndRadius: 50, elevation: 4 }}>
        <TextInput
          placeholder="Enter Name"
          value={name}
          style={{
            width: '80%',
            padding: 10,
            fontSize: 20,
            // borderWidth: 2,
            marginVertical: 20,
            // borderColor: '#ff2e63',
            borderRadius: 20,
            color: '#FF4700',
            elevation: 4,
            backgroundColor: 'white',
          }}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter Roll"
          value={roll}
          style={{
            width: '80%',
            padding: 10,
            fontSize: 20,
            // borderWidth: 2,
            marginBottom: 10,
            // borderColor: '#ff2e63',
            borderRadius: 20,
            color: '#FF4700',
            elevation: 4,
            backgroundColor: 'white',
          }}
          onChangeText={(text) => setRoll(text)}
        />
        <TouchableOpacity
          onPress={() => {
            // var users = firebase.database().ref('user');
            // console.log(users);
            // users.once('value', (snapshot) => {
            //   setData(snapshot.toJSON());
            //   console.log(data);
            // });
            // var userRef = firebase.database().ref(`user/${name}`);
            // var exists;
            // userRef.once('value', (snapshot) => {
            //   exists = snapshot.exists();
            //   setData(snapshot.toJSON());
            // })
            //   .then(() => {
            //     if (exists) {
            //       if (data.Name.includes('N')) {
            //         console.log('Yes');
            //       }
            //       if (data.Name === name && data.Roll === roll) {
            //         alert('Maching');
            //       }
            //     } else {
            //       userRef.set({
            //         Name: name,
            //         Roll: roll,
            //       })
            //         .then(() => Alert.alert('Inserted!'))
            //         .catch(() => console.log('Error'));
            //     }
            //   })
          }}
          style={{ width: '80%', elevation: 4, backgroundColor: 'white', borderRadius: 20, marginTop: 15 }}>
          <Text
            style={{
              fontSize: 22,
              // borderWidth: 2,
              padding: 8,
              width: '100%',
              textAlign: 'center',
              // borderColor: '#ff2e63',
              borderRadius: 10,
              // marginTop: 10,
              color: '#FF4700',
            }}>Save</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>

  );
};

export default App;
