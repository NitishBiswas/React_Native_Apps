import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
class Scroll extends Component {
  render() {
    return (
      <ScrollView horizontal={false}>
        <View style={{height: 300, width: 300, backgroundColor: 'green'}} />
        <View style={{height: 300, width: 300, backgroundColor: 'red'}} />
        <View style={{height: 300, width: 300, backgroundColor: 'blue'}} />
        <View style={{height: 300, width: 300, backgroundColor: 'black'}} />
      </ScrollView>
    );
  }
}

export default Scroll;
