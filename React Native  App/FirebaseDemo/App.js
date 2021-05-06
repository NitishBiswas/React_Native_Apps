/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import firebase from 'firebase';
import { config } from './config';

const App = () => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  LogBox.ignoreLogs(['Setting a timer']);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Enter Name"
        value={name}
        style={{ width: '80%', padding: 7, fontSize: 20, borderBottomWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Enter Roll"
        value={roll}
        style={{ width: '80%', padding: 7, fontSize: 20, borderBottomWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setRoll(text)}
      />
      <TouchableOpacity
        onPress={() => {
          const id = Math.floor(Math.random() * 10000000) + 1;
          console.log(id);
          firebase.database().ref(`user/${id}`).set({
            Name: name,
            Roll: roll,
          }).then(() => Alert.alert('Inserted!'))
            .catch(() => console.log('Error'));
        }}
        style={{ width: '80%' }}>
        <Text
          style={{
            fontSize: 22,
            borderWidth: 2,
            padding: 5,
            width: '100%',
            textAlign: 'center',
            borderColor: 'purple',
            borderRadius: 5,
            marginTop: 10,
          }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
