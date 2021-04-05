import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import SplashScreen from './src/screen/SplashScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
