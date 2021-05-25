/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import ListItem from './components/ListItem';

const App = () => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [data, setData] = useState([]);

  const deleteItem = (index) => {
    const arr = [...data];
    arr.splice(index, 1);
    setData(arr);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        value={roll}
        placeholder="Enter your roll"
        onChangeText={(text) => setRoll(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setData([...data, { Name: name, Roll: roll }])}>
        <Text style={styles.input}>Save</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={item => item.Roll}
        renderItem={({ item, index }) => {
          return <ListItem item={item} handledelete={() => deleteItem(index)} />
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 30,
  },
  input: {
    width: '90%',
    padding: 5,
    borderWidth: 2,
    borderColor: 'tomato',
    borderRadius: 10,
    fontSize: 22,
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  listView: {
    width: Dimensions.get('window').width * 90 / 100,
    flex: 1,
    borderWidth: 2,
    borderColor: 'tomato',
    borderRadius: 10,
    marginVertical: 7,
    padding: 4,
  },
  text: {
    fontSize: 22,
  },
});

export default App;
