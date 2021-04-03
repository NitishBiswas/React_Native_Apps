import React, {useState} from 'react';
import {View, StyleSheet, Modal, Alert, TextInput, Button} from 'react-native';
import {Card} from 'react-native-elements';

const CreateEmployee = () => {
  const [Name, setName] = useState('');
  const [Position, setPosition] = useState('');
  const [Gmail, setGmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Blood, setBlood] = useState('');
  const [Image, setImage] = useState('');
  const [modal, setModal] = useState('false');

  function insertFromCamera() {
    Alert.alert('hello');
  }
  return (
    <Card containerStyle={{flex: 1, margin: 6}}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your name"
        value={Name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your position in office"
        value={Position}
        onChangeText={(text) => setPosition(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your gmail"
        value={Gmail}
        onChangeText={(text) => setGmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your number"
        value={Phone}
        keyboardType={'number-pad'}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your blood group"
        value={Blood}
        onChangeText={(text) => setBlood(text)}
      />
      <View style={{margin: 8}}>
        <Button
          title="Upload Image"
          onPress={() => setModal(true)}
          color={'blue'}
        />
      </View>
      <View style={{margin: 8}}>
        <Button title="Save" onPress={() => setModal(true)} color={'blue'} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal('false')}>
        <View style={styles.modalView}>
          <View style={styles.modalButton}>
            <Button
              title="Camera"
              onPress={() => insertFromCamera()}
              color={'blue'}
            />
            <Button
              title="Gallery"
              onPress={() => insertFromCamera()}
              color={'blue'}
            />
          </View>
          <Button
            title="Cancel"
            onPress={() => setModal(false)}
            color={'blue'}
          />
        </View>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    margin: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 15,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    height: '15%',
    width: '100%',
    backgroundColor: '#e5e2e2',
  },
});
export default CreateEmployee;
