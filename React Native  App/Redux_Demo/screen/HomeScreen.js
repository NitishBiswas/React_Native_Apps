import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => {
    return state;
  });

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => dispatch({type: 'ADD_DATA', payload: data + 1})}>
        <Text style={styles.textStyle}>Increase</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>{data}</Text>
      <TouchableOpacity
        onPress={() => dispatch({type: 'ADD_DATA', payload: data - 1})}>
        <Text style={styles.textStyle}>Decrease</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    margin: 5,
  },
});

export default HomeScreen;
