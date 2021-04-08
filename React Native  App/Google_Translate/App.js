import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor='white' />
      <WebView source={{uri: 'https://translate.google.com'}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
