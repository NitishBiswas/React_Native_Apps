import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      address: '',
    };
  }
  submit() {
    alert([this.state.name, this.state.password, this.state.address]);
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder={'Enter your name'}
          onChangeText={(text) => {
            this.setState({name: text});
          }}
          style={styles.textBox}
        />
        <TextInput
          placeholder={'Enter your password'}
          onChangeText={(text) => {
            this.setState({password: text});
          }}
          secureTextEntry={true}
          style={styles.textBox}
        />
        <TextInput
          placeholder={'Enter your address'}
          onChangeText={(text) => {
            this.setState({address: text});
          }}
          style={styles.textBox}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.submit();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    borderColor: 'skyblue',
    borderWidth: 2,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 25,
  },
});

export default Form;
