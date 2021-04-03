import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

const IndexScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => {
    return state.data;
  });
  console.log(data);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/img.png')}
        style={styles.imageStyle}>
        <StatusBar animated={true} backgroundColor="#fd499e" />
        <View style={styles.headerStyle}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Add')}>
            <Text style={styles.headerTitle}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={styles.listText}>
                <View style={styles.listStyle}>
                  <Text style={styles.headerTitle}>{item.title}</Text>
                </View>
                <TouchableOpacity style={styles.touchStyle} onPress={() => dispatch({type: 'Delete_Data', payload: item.id})}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde3e3',
  },
  headerStyle: {
    height: 50,
    backgroundColor: '#fd499e',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center',
  },
  headerIcon: {
    marginLeft: '60%',
    alignSelf: 'center',
  },
  listStyle: {
    borderWidth: 2,
    borderColor: '#fd499e',
    borderRadius: 7,
    width: '80%',
    marginVertical: 5,
    marginLeft: 10,
    paddingVertical: 15,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  listText: {
    flexDirection: 'row',
  },
  deleteText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    marginLeft: 8,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  touchStyle: {
    alignSelf: 'center',
  },
});

export default IndexScreen;
