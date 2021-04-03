import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, Switch, Text, View } from "react-native";

export function CustomDrawer({...props}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 100}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          flex: 14,
        }}>
        <Image
          source={require('./Images/kfc.png')}
          style={{height: 100, width: 100, marginRight: 6, borderRadius: 50}}
        />
        <Text style={{fontSize: 20, color: '#6ed24a', fontWeight: 'bold'}}>
          KFC Restaurant
        </Text>
      </View>
      <View style={{flex: 70}}>
        <DrawerItemList {...props} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          flex: 8,
        }}>
        <Text style={{color: '#6ed24a', fontWeight: 'bold', fontSize: 18}}>
          Dark Theme
        </Text>
        <View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#51ee37' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
