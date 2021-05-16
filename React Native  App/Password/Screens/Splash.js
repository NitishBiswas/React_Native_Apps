/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import { config } from '../Firebases/config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

const Splash = ({ navigation }) => {
    const [hasUser, setHasUser] = useState(null);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setHasUser(true);
        } else {
            setHasUser(false);
        }
    });

    setTimeout(() => {
        // eslint-disable-next-line no-lone-blocks
        { hasUser ? navigation.navigate('Home') : navigation.navigate('Login'); }
    }, 3000);

    return (
        <View style={styles.container}>
            <LottieView source={require('../images/stayhom.json')} autoPlay loop />
            <Text style={styles.info}>nitishbiswas.cse@gmail.com</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    info: {
        fontSize: 20,
        color: '#FF4700',
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
    },
});

export default Splash;
