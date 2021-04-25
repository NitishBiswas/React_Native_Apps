/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const App = () => {
  const StudentDetails = [
    {
      id: '1',
      Name: 'Joy',
      Roll: '01',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '2',
      Name: 'Nitish',
      Roll: '05',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '3',
      Name: 'Rikta',
      Roll: '06',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '4',
      Name: 'Abdi',
      Roll: '07',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '5',
      Name: 'Kabbo',
      Roll: '23',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '6',
      Name: 'Mehedi',
      Roll: '33',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '7',
      Name: 'Joy',
      Roll: '01',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '8',
      Name: 'Nitish',
      Roll: '05',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '9',
      Name: 'Rikta',
      Roll: '06',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '10',
      Name: 'Abdi',
      Roll: '07',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '11',
      Name: 'Kabbo',
      Roll: '23',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
    {
      id: '12',
      Name: 'Mehedi',
      Roll: '33',
      DOB: '12/12/12',
      img: 'https://scontent.fdac48-1.fna.fbcdn.net/v/t1.6435-9/144198472_869661150244442_7492683024860694586_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=RQVqmuXOAHAAX833PgH&_nc_ht=scontent.fdac48-1.fna&oh=e70d72de3630d77ebb31c999aebd806f&oe=60AB4BC2',
    },
  ];
  return (
    <View>
      <FlatList
        data={StudentDetails}
        keyExtractor={(std) => std.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ elevation: 5, borderRadius: 10, backgroundColor: 'white', margin: 10, padding: 10, height: 200 }}>

              <Image source={{ uri: item.img }} style={{ height: 100, width: 100, borderRadius: 50 }} />

              <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                <Text style={{ fontSize: 22 }}>{item.Name}</Text>
                <Text style={{ fontSize: 22 }}>{item.Roll}</Text>
              </View>
            </View>
          );
        }}
      />
      <FlatList
        data={StudentDetails}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ elevation: 5, borderRadius: 10, backgroundColor: 'white', margin: 10, padding: 10, flexDirection: 'row' }}>

              <Image source={{ uri: item.img }} style={{ height: 100, width: 100, borderRadius: 50 }} />

              <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                <Text style={{ fontSize: 22 }}>{item.Name}</Text>
                <Text style={{ fontSize: 22 }}>{item.Roll}</Text>
              </View>

            </View>
          );
        }}
      />
    </View>
  );
};

export default App;