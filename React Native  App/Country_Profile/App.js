import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Data} from './Data';

const App = () => {
  const [modal, setModal] = useState(false);
  const [dtl, setDtl] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#ff0099" />
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Country Profile</Text>
      </View>
      <FlatList
        numColumns="2"
        data={Data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.flatListView}
              onPress={() => {
                setDtl(item);
                setModal(true);
              }}>
              <Image source={{uri: item.img}} style={styles.imageView} />
              <Text style={styles.flatText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={styles.container}>
          <StatusBar animated={true} backgroundColor="#ff0099" />
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>{dtl.name}</Text>
          </View>
          <Image source={{uri: dtl.img}} style={styles.detailImage} />
          <Text style={styles.detailText}>{dtl.details}</Text>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd1ea',
  },
  headerStyle: {
    backgroundColor: '#ff0099',
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
  },
  imageView: {
    height: 150,
    width: 180,
    alignSelf: 'center',
  },
  flatListView: {
    height: 200,
    width: '47%',
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#bcbcbc',
    margin: 6,
    padding: 7,
  },
  flatText: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
  },
  detailImage: {
    height: 250,
    width: '97%',
    alignSelf: 'center',
    marginTop: 5,
  },
  detailText: {
    marginTop: 10,
    textAlign: 'justify',
    fontSize: 23,
    width: '97%',
    alignSelf: 'center',
  },
  cancelButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ff0099',
    color: '#ff0099',
    marginTop: 15,
    alignSelf: 'center',
    paddingLeft: '43%',
    width: '97%',
    fontSize: 25,
    paddingVertical: 10,
  },
});

export default App;
