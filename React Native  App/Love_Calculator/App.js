import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';

const App = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [data, setData] = useState([]);

  const checkLove = () => {
    if (text1 !== '' && text2 !== '') {
      fetch(
        `https://love-calculator.p.rapidapi.com/getPercentage?fname=${text1}&sname=${text2}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '7156010219msh9a9de5e29db8cf3p15808djsn474cf3c84818',
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
          },
        },
      )
        .then(result => result.json())
        .then(response => {
          setData(response);
          setText1('');
          setText2('');
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#0238fd" />
      <ImageBackground
        source={require('./image/img_2.png')}
        style={styles.imageView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Love Calculator</Text>
        </View>
        <View style={styles.textView}>
          <TextInput
            value={text1}
            onChangeText={text => setText1(text)}
            placeholder="Enter your name..."
            placeholderTextColor={'white'}
            style={styles.textInput}
          />
          <TextInput
            value={text2}
            onChangeText={text => setText2(text)}
            placeholder="Enter your partner name..."
            placeholderTextColor={'white'}
            style={styles.textInput}
          />
          <Button title="Check" onPress={() => checkLove()} />
          <View style={styles.textView}>
            <Text style={styles.resultText}>{data.fname}</Text>
            <Text style={styles.resultInput}>{data.percentage} %</Text>
            <Text style={styles.resultInput}>{data.sname}</Text>
            <Text style={styles.result}>{data.result}</Text>
          </View>
        </View>
        <Text style={styles.info}>nitishbiswas.cse@gmail.com</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    height: 55,
    width: '100%',
    backgroundColor: '#0238fd',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#fff',
  },
  imageView: {
    flex: 1,
  },
  textInput: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#0238fd',
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  textView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  resultInput: {
    alignSelf: 'center',
    fontSize: 34,
    color: 'white',
  },
  resultText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 34,
    color: 'white',
  },
  result: {
    alignSelf: 'center',
    marginTop: '46%',
    fontSize: 25,
    color: 'white',
  },
  info: {
    fontSize: 20,
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
    color: 'white',
  },
});

export default App;
