import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {Data} from '../Information/Data';
import ActionButton from 'react-native-action-button';
import { Card } from "react-native-elements";

const Home = () => {
  return (
    <View style={{backgroundColor: '#eceaea'}}>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <View>
            <Card containerStyle={{padding : 8, margin: 4, marginHorizontal: 8}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.Image}}
                  style={{height: 90, width: 90, borderRadius: 45}}
                />
                <View style={{marginLeft: 15, justifyContent: 'center'}}>
                  <Text
                    style={{fontSize: 23, fontWeight: 'bold', marginBottom: 4}}>
                    {item.Name}
                  </Text>
                  <Text style={{fontSize: 20, color: '#4caaf3'}}>
                    {item.Position}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <ActionButton
        buttonColor="rgba(15, 42, 219, 1)"
        onPress={() => { console.log("hi")}}
      />
    </View>
  );
};

export default Home;
