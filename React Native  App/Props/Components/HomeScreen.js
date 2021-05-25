/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';
import HeaderView from './HeaderView';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <HeaderView title="Home" />
            <Text>Home Screen</Text>
            <Button title="Move to Details" onPress={() => navigation.navigate('Details')} />
        </View>
    )
}


export default HomeScreen;