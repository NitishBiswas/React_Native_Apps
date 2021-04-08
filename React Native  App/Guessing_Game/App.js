import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [text, setText] = useState();
  const [result, setResult] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#52e7da" />
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Guessing Game</Text>
      </View>
      <TextInput
        value={text}
        onChangeText={text => {
          setText(text);
          setResult('');
        }}
        keyboardType="number-pad"
        placeholder="Enter any number from 1 to 5"
        style={styles.inputStyle}
      />
      <TouchableOpacity
        onPress={() => {
          let n = Math.floor(Math.random() * 5 + 1);
          if (n === parseInt(text)) {
            setResult('Congratulations!\n Correct answer!');
          } else {
            setResult('Wrong Answer!\nCorrect answer was ' + n);
          }
        }}>
        <Text style={styles.button}>Check</Text>
      </TouchableOpacity>
      {text !== '' ? <Text style={styles.resultStyle}>{result}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5fdfb',
  },
  inputStyle: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#52e7da',
    borderRadius: 7,
    padding: 10,
    fontSize: 20,
    color: 'black',
    width: '90%',
    marginVertical: 20,
  },
  headerStyle: {
    height: 60,
    width: '100%',
    backgroundColor: '#52e7da',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#52e7da',
    borderRadius: 7,
    padding: 10,
    fontSize: 20,
    color: 'black',
    width: '90%',
    paddingLeft: '38%',
  },
  resultStyle: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
    paddingTop: 30,
    padding: 10,
  },
});

export default App;
