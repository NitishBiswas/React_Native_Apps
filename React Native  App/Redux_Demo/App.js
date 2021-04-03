import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './screen/HomeScreen';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/reducer';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
