/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text> Custom Alert ! </Text>
      <View style={{ margin: 10 }} />
      <Button color="blue" title="Custom Alert" onPress={() => Alert.alert('My Title', 'My massege ......', [
        { text: 'Yes', onPress: () => console.log('Yes tapped!') },
        { text: 'No', onPress: () => console.log('No tapped!') },
      ])} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
