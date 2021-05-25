/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const HeaderView = ({ title }) => {
    return (
        <View style={styles.header}>
            <StatusBar animated={true} backgroundColor="#1EBCFF" />
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#1EBCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        color: 'white',
    },
});


export default HeaderView;