import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';

const Follower = () => {
  const follow = useSelector(state => {
    return state.follow;
  });
  console.log(follow);
  return (
    <View style={styles.container}>
      <FlatList
        data={follow}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.touchText}>
              <View style={styles.imagePadding}>
                <Image
                  source={{uri: item.avatar_url}}
                  style={styles.imageView}
                />
              </View>
              <Text style={styles.bioText}>{item.login}</Text>
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
  imageView: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  imagePadding: {
    paddingVertical: 15,
    alignSelf: 'center',
  },
});

export default Follower;
