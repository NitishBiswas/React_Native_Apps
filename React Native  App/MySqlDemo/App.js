import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component<Props> {
  state = {
    data: [],
    setModal: false,
    itemId: 0,
    loading: true,
    text: '',
  };
  fetchData = async () => {
    const response = await fetch('http://192.168.1.3:1111/information');
    const information = await response.json();
    this.setState({data: information, loading: false});
  };
  loadingData = () => {
    this.fetchData();
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Welcome</Text>
        <TextInput
          onChangeText={(input1) => this.setState({input1})}
          value={this.state.input1}
          placeholder="Enter your name"
        />
        <TextInput
          onChangeText={(input2) => this.setState({input2})}
          value={this.state.input2}
          placeholder="Enter your phone no"
          keyboardType="number-pad"
        />
        <TextInput
          onChangeText={(input3) => this.setState({input3})}
          value={this.state.input3}
          placeholder="Enter your group"
        />
        <Button
          title="Insert"
          onPress={() => {
            fetch('http://192.168.1.3:1111/information', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                Name: this.state.input1,
                Phone: this.state.input2,
                Blood_Group: this.state.input3,
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response);
                this.setState({
                  input1: '',
                  input2: '',
                  input3: '',
                });
                this.loadingData();
              })
              .catch((error) => console.log(error));
          }}
        />
        <FlatList
          refreshing={this.state.loading}
          onRefresh={() => this.loadingData()}
          data={this.state.data}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                this.setState({
                  setModal: true,
                  itemId: item.ID,
                });
              }}>
              <View
                style={{backgroundColor: '#abc123', padding: 10, margin: 10}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {item.Name}
                </Text>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {item.Phone}
                </Text>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {item.Blood_Group}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModal}
          onRequestClose={() => this.setState({setModal: false})}>
          <View
            style={{
              borderRadius: 10,
              position: 'absolute',
              bottom: '45%',
              width: '80%',
              height: 150,
              backgroundColor: '#ffffff',
              marginHorizontal: '10%',
            }}>
            <View
              style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 22}}>Do you want to delete ?</Text>
              <View style={{flexDirection: 'row', margin: 20}}>
                <View style={{marginRight: 20}}>
                  <Button
                    title="Yes"
                    onPress={() => {
                      fetch('http://192.168.1.3:1111/information', {
                        method: 'delete',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          ID: this.state.itemId,
                        }),
                      })
                        .then((response) => response.json())
                        .then((response) => console.log(response))
                        .catch((err) => console.log(err));
                      this.setState({setModal: false});
                      this.loadingData();
                    }}
                  />
                </View>
                <Button
                  title="No"
                  onPress={() => {
                    this.setState({setModal: false});
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
