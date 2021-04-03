import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const [data, setData] = useState('');
  const getResult = () => {
    const userName = state.split(' ').join('');
    fetch(`https://api.github.com/users/${userName}`)
      .then(result => result.json())
      .then(results => {
        setData(results);
        dispatch({type: 'Add_Data', payload: {details: results, users: state}});
        console.log(data);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#f4511e" />
      <View style={styles.imagePadding}>
        <Image
          source={require('../image/img_3.png')}
          style={styles.imageView}
        />
      </View>
      <Text style={styles.textView}>GitHub User</Text>
      <View style={styles.inputView}>
        <TextInput
          value={state}
          onChangeText={text => setState(text)}
          placeholder="Search here..."
          placeholderTextColor={'black'}
          style={styles.textInput}
        />
        <Button
          title="Search"
          color="#f4511e"
          onPress={() => {
            getResult();
            navigation.navigate('Details');
          }}
        />
      </View>
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
  textInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#f4511e',
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
  },
  inputView: {
    width: '90%',
    marginTop: '15%',
    alignSelf: 'center',
    flex: 1,
  },
  imageView: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  imagePadding: {
    paddingVertical: 20,
  },
  textView: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
