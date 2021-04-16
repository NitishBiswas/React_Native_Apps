/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('TabScreen');
    }, 3000);
    return (
        <View style={styles.imageView}>
            <Image source={require('./image/unnamed-removebg-preview.png')} />
            <Text style={styles.textView}>Welcome</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: -100,
    },
    textView: {
        fontSize: 50,
        color: 'white',
        marginTop: -20,
    }
});

export default SplashScreen;