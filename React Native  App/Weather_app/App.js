import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import SplashScreen from './src/screen/SplashScreen';
import SearchScreen from "./src/screen/SearchScreen";
import HomeScreen from "./src/screen/HomeScreen";

const App = () => {
  return (
    <View style={styles.container}>
      {/*<SplashScreen />*/}
      {/*<SearchScreen />*/}
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
