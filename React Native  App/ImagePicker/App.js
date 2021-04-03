import React, {Component} from 'react';
import {View, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://reactnative.dev/img/tiny_logo.png',
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          title="ImagePicker"
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            }).then((res) => {
              console.log('Hello' + res.size);
              this.setState({image: res.path});
            });
          }}
        />
        <Button
          title="ImagePicker"
          onPress={() => {
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: true,
            }).then((res) => {
              console.log('Hello' + res.path);
              this.setState({image: res.path});
            });
          }}
        />
        <Button title="Hello" onPress={() => console.warn('hello')} />
        <Image
          style={{height: 300, width: 300}}
          source={{
            uri: this.state.image,
          }}
        />
      </View>
    );
  }
}

export default App;
