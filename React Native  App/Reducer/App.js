/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ACTIONS = {
  INCREMENT: 'Increment',
  DECREMENT: 'Decrement',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const App = () => {

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const increment = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };
  const decrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={increment} style={styles.btnView}>
        <Text style={styles.btnText}> + </Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>{state.count}</Text>
      <TouchableOpacity onPress={decrement} style={styles.btnView}>
        <Text style={styles.btnText}> - </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    borderWidth: 2,
    borderColor: 'blue',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  btnText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default App;
