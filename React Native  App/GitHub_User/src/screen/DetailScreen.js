import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => {
    return state.data;
  });
  const user = useSelector(state => {
    return state.user;
  });
  const repositories = () => {
    fetch(`https://api.github.com/users/${user}/repos`)
      .then(result => result.json())
      .then(results => {
        dispatch({type: 'Add_Repo', payload: results});
        console.log(results);
      })
      .catch(err => console.log(err));
  };
  const followers = () => {
    fetch(`https://api.github.com/users/${user}/followers`)
      .then(data => data.json())
      .then(follower => {
        dispatch({type: 'Add_Follow', payload: follower});
        console.log(follower);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.imagePadding}>
                <Image
                  source={{uri: item.avatar_url}}
                  style={styles.imageView}
                />
              </View>
              <Text style={styles.textView}>{item.name}</Text>
              <Text style={styles.bioText}>{item.bio}</Text>
              <Text style={styles.bioText}>{item.location}</Text>
              <TouchableOpacity
                style={styles.touchText}
                onPress={() => {
                  repositories();
                  navigation.navigate('Repositories');
                }}>
                <Text style={styles.repoView}>
                  {item.public_repos} Repositories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchText}
                onPress={() => {
                  followers();
                  navigation.navigate('Followers');
                }}>
                <Text style={styles.repoView}>{item.followers} Followers</Text>
              </TouchableOpacity>
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
  imageView: {
    borderRadius: 125,
    height: 250,
    width: 250,
  },
  imagePadding: {
    paddingVertical: 15,
    alignSelf: 'center',
  },
  textView: {
    fontSize: 38,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 10,
  },
  repoView: {
    fontSize: 18,
    color: '#0154fa',
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: '25%',
  },
  touchText: {
    borderWidth: 2,
    borderColor: '#f4511e',
    borderRadius: 7,
    marginVertical: 10,
    width: '100%',
  },
  info: {
    position: 'relative',
    bottom: 25,
    alignSelf: 'center',
    color: '#f4511e',
    fontSize: 16,
  },
});

export default DetailScreen;
