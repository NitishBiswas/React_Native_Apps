import React, {Component} from 'react';
import {TextInput, Button, View} from 'react-native';

class Input extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder={'Enter your name'}
          style={{fontSize: 25, color: 'green'}}
          onChangeText={(e)=>{this.setState({name:e})}}
        />
        <Button title="Check" onPress={()=>{alert(this.state.name)}} />
      </View>
    );
  }
}

export default Input;
