import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Data} from '../Information/Data';
import ActionButton from 'react-native-action-button';
import {Card} from 'react-native-elements';

function Home(props) {
  return (
    <View style={{backgroundColor: '#eceaea', flex: 1}}>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile', {item})}>
            <View>
              <Card
                containerStyle={{padding: 8, margin: 4, marginHorizontal: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 80, width: 80, borderRadius: 40}}
                  />
                  <View style={{marginLeft: 15, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        marginBottom: 4,
                      }}>
                      {item.Name}
                    </Text>
                    <Text style={{fontSize: 20, color: '#4caaf3'}}>
                      {item.Position}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <ActionButton
        buttonColor="rgba(15, 42, 219, 1)"
        onPress={() => props.navigation.navigate('Create')}
      />
    </View>
  );
}

export default Home;
