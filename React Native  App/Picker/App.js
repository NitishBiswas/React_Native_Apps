import React, {Component} from 'react';
import {View, Button} from 'react-native';
class App extends Component {
    render() {
        return (
            <View>
              <Button title='Image' onPress={()=>console.warn('Hello')}/>
            </View>
        );
    }
}

export default App;
