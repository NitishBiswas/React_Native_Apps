/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Animated, StyleSheet, PanResponder } from 'react-native';

const App = () => {
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  // Animated.timing(position, {
  //   toValue: { x: 200, y: 500 },
  //   duration: 5000,
  //   useNativeDriver: false,
  // }).start();

  const rotate = position.x.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '360deg'],
  });

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y },
    ],
      { useNativeDriver: false }
    ),
  });

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[styles.animatedView, {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate },
        ],
      }]}>
        <Text style={styles.text1}>Nitish Biswas</Text>
      </Animated.View> */}
      <Animated.View {...pan.panHandlers} style={[styles.animatedView, {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate },
        ],
      }]}>
        <Text style={styles.text1}>Nitish Biswas</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    height: 100,
    width: 200,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
  },
  text1: {
    fontSize: 25,
    color: 'blue',
  },
});

export default App;
