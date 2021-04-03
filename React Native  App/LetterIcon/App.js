import React, {Component} from 'react';
import {View} from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
type props = {};
class App extends Component {
  render() {
    return (
      <View>
        <RNMaterialLetterIcon
          size={80}
          border={true}
          borderColor={'#dd2c00'}
          borderSize={2}
        />
      </View>
    );
  }
}

export default App;
