import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

const App = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [msg, setMsg] = useState('');
  const [health, setHealth] = useState('');;
  const calculateBMI = () => {
    let bmi = 0;
    let h = height / 3.281;
    bmi = weight / (h * h);
    bmi = bmi.toFixed(2);
    let wg;
    if (bmi < 18.5) {
      setMsg('Under Weight!');
      wg = h * h * 19.5 - weight;
      setHealth('Increase your weight at least ' + wg.toFixed(2) + ' kg !');
    } else if (bmi >= 18.5 <= 24.9) {
      setHealth('');
      setMsg('Congratulations! Healthy Body!');
    } else if (bmi >= 25 <= 29.9) {
      setMsg('Pre-Obesity!');
      wg = weight - h * h * 26;
      setHealth('Decrease your weight at least ' + wg.toFixed(2) + ' kg !');
    } else if (bmi >= 34.9 >= 30) {
      setMsg('Obesity Class 1!');
      wg = weight - h * h * 31;
      setHealth('Decrease your weight at least ' + wg.toFixed(2) + ' kg !');
    } else if (bmi >= 35 <= 39.9) {
      setMsg('Obesity Class 2!');
      wg = weight - h * h * 36;
      setHealth('Decrease your weight at least ' + wg.toFixed(2) + ' kg !');
    } else if (bmi >= 40) {
      setMsg('Obesity Class 3!');
      wg = weight - h * h * 41;
      setHealth('Decrease your weight at least ' + wg.toFixed(2) + ' kg !');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#1c03fd" />
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>BMI</Text>
      </View>
      <Text style={styles.text}>Height</Text>
      <TextInput
        value={height}
        placeholder="Enter your height.."
        onChangeText={text => setHeight(text)}
        style={styles.inputStyle}
      />
      <Text style={styles.text}>Weight</Text>
      <TextInput
        value={weight}
        placeholder="Enter your weight.."
        onChangeText={text => setWeight(text)}
        style={styles.inputStyle}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          Keyboard.dismiss();
          calculateBMI();
        }}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          setHealth('');
          setMsg('');
          setHeight('');
          setWeight('');
          Keyboard.dismiss();
        }}>
        <Text style={styles.redText}>Clear</Text>
      </TouchableOpacity>
      {height || weight !== '' ? (
        <View style={styles.resultView}>
          <Text style={styles.buttonText}>{msg}</Text>
          <Text style={styles.buttonText}>{health}</Text>
        </View>
      ) : null}
      <Text style={styles.info}>nitishbiswas.cse@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9cbfa',
  },
  headerStyle: {
    backgroundColor: '#1c03fd',
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'white',
  },
  inputStyle: {
    color: '#1c03fd',
    fontSize: 22,
    padding: 10,
    borderWidth: 2,
    borderColor: '#1c03fd',
    borderRadius: 7,
    margin: 10,
  },
  buttonStyle: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#1c03fd',
    borderRadius: 7,
    margin: 10,
  },
  buttonText: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#1c03fd',
  },
  resultView: {
    marginTop: '20%',
  },
  info: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#1c03fd',
    position: 'absolute',
    bottom: 10,
  },
  text: {
    fontSize: 22,
    color: '#1c03fd',
    marginLeft: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  redText: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'red',
  }
});

export default App;
