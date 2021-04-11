/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }
  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#fd499e" />
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Stopwatch</Text>
        </View>
        <View style={styles.totalView}>
          <Stopwatch
            laps
            msecs
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
          />
          <View style={styles.buttonStyle}>
            <TouchableHighlight onPress={this.toggleStopwatch}>
              <Text style={styles.cancelButton}>
                {!this.state.stopwatchStart ? 'Start' : 'Stop'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.resetStopwatch}>
              <Text style={styles.cancelButton}>Reset</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd1ea',
  },
  headerStyle: {
    backgroundColor: '#fd499e',
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
  },
  cancelButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ff0099',
    color: '#ff0099',
    marginTop: 15,
    alignSelf: 'center',
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 20,
  },
  buttonStyle: {
    flexDirection: 'row',
  },
  totalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
