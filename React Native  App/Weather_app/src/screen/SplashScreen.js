import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.imageView}>
      <StatusBar animated={true} backgroundColor="#57aee2" />
      <Image source={require('../image/img.png')} style={styles.imageView} />
      <TouchableOpacity
        style={styles.textView}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.text}>Get Started ></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  textView: {
    position: 'absolute',
    bottom: '8%',
    right: '8%',
    borderWidth: 2,
    borderColor: '#57aee2',
    borderRadius: 7,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default SplashScreen;
