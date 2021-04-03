import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const Repository = () => {
  const repo = useSelector(state => {
    return state.repo;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={repo}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          console.log('Yes');
          return (
            <View style={styles.touchText}>
              <Text style={styles.bioText}>{item.name}</Text>
            </View>
          );
        }}
      />
      <Text style={styles.info}>nitishbiswas.cse@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdfd5',
  },
  bioText: {
    fontSize: 22,
    alignSelf: 'center',
  },
  touchText: {
    borderWidth: 2,
    borderColor: '#f4511e',
    borderRadius: 7,
    marginVertical: 10,
    width: '100%',
    padding: 20,
    paddingHorizontal: 40,
  },
  info: {
    position: 'relative',
    bottom: 4,
    alignSelf: 'center',
    color: '#f4511e',
    fontSize: 16,
  },
});

export default Repository;
