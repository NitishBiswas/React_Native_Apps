import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const [weather, setWeather] = useState({
    name: '',
    temp: '',
    humidity: '',
    icon: '',
    description: '',
  });
  let value;
  const getWeather = async () => {
    console.log(props.route.params);
    try {
      value = await AsyncStorage.getItem('cityName');
      if (!value) {
        value = props.route.params.city;
      }
    } catch (e) {
      console.log(e.message);
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=16c58b5e56a70d9d165488868f570c47&units=metric`,
    )
      .then(data => data.json())
      .then(result => {
        setWeather({
          name: result.name,
          temp: result.main.temp,
          humidity: result.main.humidity,
          description: result.weather[0].description,
          icon: result.weather[0].icon,
        });
      })
      .catch(err => console.log(err.message));
  };
  useEffect(() => {
    console.log(props.route.params);
    getWeather().catch(err => console.log(err.message));
  }, []);
  console.log(weather.name);
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#22abfd" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <ImageBackground
        source={require('../image/img_2.png')}
        style={styles.imageView}>
        <View style={styles.detailsView}>
          <Text style={styles.textInput}>{weather.name}</Text>
          <Image
            style={styles.iconView}
            source={{
              uri: 'https://openweathermap.org/img/w/' + weather.icon + '.png',
            }}
          />
        </View>
        <Text style={styles.details}>Temperature : {weather.temp} C</Text>
        <Text style={styles.details}>Humidity : {weather.humidity} %</Text>
        <Text style={styles.details}>Description : {weather.description}</Text>
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
    height: 60,
    width: '100%',
    backgroundColor: '#22abfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
  imageView: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  textInput: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  detailsView: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconView: {
    height: 200,
    width: 200,
  },
  details: {
    fontSize: 30,
    color: '#8c028a',
    fontWeight: 'bold',
    marginLeft: 15,
    padding: 10,
  },
  info: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;
