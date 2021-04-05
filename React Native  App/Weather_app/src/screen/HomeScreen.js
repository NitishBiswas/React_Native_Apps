import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const HomeScreen = () => {
  return(
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#22abfd" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
    </View>
  )
}

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
});

export default HomeScreen;
