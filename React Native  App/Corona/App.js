/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#3303CC" />
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>করোনা আপডেট</Text>
      </View>
      <WebView
        ref={webViewRef}
        source={{
          uri:
            'https://corona.gov.bd/?gclid=Cj0KCQjwmcWDBhCOARIsALgJ2Qcge5BcDsVvoS0obv2UIO6TZbO7jHfwZDQ1uQrl7s-YXNS1VY4bvGUaAubVEALw_wcB',
        }}
      />
      <Button title="back" onPress={() => goback()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#3303CC',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
  },
});

export default App;
