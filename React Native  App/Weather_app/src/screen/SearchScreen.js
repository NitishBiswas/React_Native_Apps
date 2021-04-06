import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({navigation}) => {
  const [city, setCity] = useState('');
  const [data, setData] = useState({});
  const citySearch = text => {
    setCity(text);
    fetch(
      `https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${city}&locationType=city&format=json`,
    )
      .then(data => data.json())
      .then(result => setData(result.location.address.splice(0, 9)))
      .catch(err => console.log(err.message));
  };
  const moveHome = async city => {
    try {
      await AsyncStorage.setItem('cityName', city);
    } catch (e) {
      console.log(e.message);
    }
    navigation.navigate('Home', {city: city});
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#22abfd" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Search Screen</Text>
      </View>
      <ImageBackground
        source={require('../image/img_1.png')}
        style={styles.imageView}>
        <View style={styles.textView}>
          <TextInput
            style={styles.textInput}
            value={city}
            placeholder="Type your location..."
            onChangeText={text => citySearch(text)}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => {
              city !== '' ? moveHome(city) : null;
            }}>
            <Text style={styles.text}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item}
          renderItem={({item}) => {
            return (
              <View>
                {city !== '' ? (
                  <TouchableOpacity
                    style={styles.cardView}
                    onPress={() => moveHome(item)}>
                    <Text style={styles.cardText}>{item}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          }}
        />
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
    fontSize: 22,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#22abfd',
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
    color: 'white',
  },
  textView: {
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  cardView: {
    backgroundColor: '#22abfd',
    borderRadius: 8,
    width: '90%',
    marginVertical: 4,
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
