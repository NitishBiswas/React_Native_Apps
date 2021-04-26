/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const App = () => {
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  function moveName() {
    Animated.spring(value, {
      toValue: { x: 200, y: 600 },
      useNativeDriver: false,
      bounciness: 20,
      speed: 1,
    }).start();
  }
  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={value.getLayout()}>
        <Text style={styles.nameText}>Nitish Biswas</Text>
      </Animated.View>

      <TouchableOpacity style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }} onPress={moveName}><Text style={styles.nameText}>Click Me</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    fontSize: 25,
    marginTop: 20,
    color: 'blue',
  }
});

export default App;