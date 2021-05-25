/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';
import HeaderView from './HeaderView';

const DetailScreen = ({ navigation }) => {
    return (
        <View>
            <HeaderView title="Details" />
            <Text>Details Screen</Text>
            <Button title="Move to Home" onPress={() => navigation.goBack()} />
        </View>
    )
}


export default DetailScreen;