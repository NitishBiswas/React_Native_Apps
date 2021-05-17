/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Username</Text>
                <TextInput
                    style={styles.textInput}
                />
                <Text style={styles.inputText}>Password</Text>
                <TextInput
                    style={styles.textInput}
                />
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btnView}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnView}>
                        <Text style={styles.btnText}>Registartion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: '90%',
    },
    textInput: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: '#ff0041',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        fontSize: 20,
        color: '#ff0041',
        marginBottom: 10,
    },
    inputText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff0041',
        marginBottom: 5,
    },
    btn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
    },
    btnView: {
        backgroundColor: '#ff0041',
        padding: 10,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnText: {
        fontSize: 20,
        color: 'white',
    },
});

export default LoginScreen;
