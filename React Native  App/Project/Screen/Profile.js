import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {Card} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Profile = (props) => {
  const {
    id,
    Name,
    Position,
    Phone,
    image,
    Blood,
    Gmail,
  } = props.route.params.item;

  const openDial = (Phone) => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:' + Phone);
    } else {
      Linking.openURL('telprompt:' + Phone);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../Information/back1.jpg')}
        style={{height: '20%', width: '100%'}}
      />
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: image}}
          style={{height: 200, width: 200, borderRadius: 100, marginTop: -80}}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 35, margin: 8, fontWeight: 'bold'}}>
          {Name}
        </Text>
        <Text style={{fontSize: 20, margin: 6}}>{Position}</Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:' + Gmail)}>
        <Card containerStyle={{marginVertical: 6}}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="envelope" color={'blue'} size={30} />
            <Text style={{fontSize: 23, marginLeft: 13, color: 'blue'}}>
              {Gmail}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openDial(Phone)}>
        <Card containerStyle={{marginVertical: 6}}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="phone-alt" color={'blue'} size={28} />
            <Text style={{fontSize: 23, marginLeft: 13, color: 'blue'}}>
              {Phone}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Card containerStyle={{marginVertical: 6}}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="heartbeat" color={'blue'} size={30} />
          <Text style={{fontSize: 23, marginLeft: 13, color: 'blue'}}>
            {Blood}
          </Text>
        </View>
      </Card>
      <View style={{position: 'absolute', bottom: 15, marginLeft: '49%'}}>
        <FontAwesome5
          name="trash"
          color={'blue'}
          size={40}
          onPress={() => Alert.alert('Deleted')}
        />
      </View>
    </View>
  );
};

export default Profile;
