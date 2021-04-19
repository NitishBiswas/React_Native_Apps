/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('Notes List');
    }, 5000);
    return (
        <View style={styles.container}>
            <StatusBar animated={false} backgroundColor="white" barStyle="dark-content" />
            <LottieView style={styles.welcome} source={require('../animation/42618-welcome.json')} autoPlay loop />
            <LottieView source={require('../animation/18168-stay-safe-stay-home.json')} autoPlay loop />
            <Text style={styles.info}>nitishbiswas.cse@gmail.com</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        position: 'absolute',
        bottom: 50,
        fontSize: 20,
        color: 'blue',
    },
    welcome: {
        position: 'absolute',
        bottom: 200,
    },
});

export default SplashScreen;
