import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';

const AddDataScreen = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/img.png')}
        style={styles.imageStyle}>
        <StatusBar animated={true} backgroundColor="#fd499e" />
        <TextInput
          value={text}
          placeholder="Enter Title"
          placeholderTextColor={'white'}
          onChangeText={text => setText(text)}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (text !== '') {
              text === '' ? null : dispatch({type: 'Add_Title', payload: text});
              setText('');
            }
          }}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde3e3',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    color: 'white',
    borderWidth: 2,
    borderColor: '#fd499e',
    borderRadius: 7,
    width: '94%',
    marginVertical: 5,
    marginLeft: 10,
    marginTop: '20%',
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: '#fd499e',
    borderRadius: 7,
    width: '40%',
    marginTop: '10%',
    padding: 10,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
  },
});

export default AddDataScreen;
