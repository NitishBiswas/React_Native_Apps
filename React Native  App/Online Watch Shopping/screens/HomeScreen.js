/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground, StatusBar, ActivityIndicator, TouchableOpacityBase } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Data } from '../Data/Data';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [loading]);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listView} onPress={() => navigation.navigate('Details', { item: item })}>
                <ImageBackground source={{ uri: item.image1 }} style={styles.imageBackground}>
                    <View>
                        <Text style={styles.priceText}>{item.price}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.headerListView}>
                    <Text style={styles.codeTextStyle}>Code : {item.productCode}</Text>
                    <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('Login')}>
                        <FontAwesome5 name={'shopping-cart'} color={'white'} size={16} />
                        <Text style={styles.btnText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ff0041" />
            {loading ? <ActivityIndicator size={'large'} color={'#ff0041'} /> : null}
            <FlatList numColumns={2} keyExtractor={item => item.productCode} data={Data} renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listView: {
        height: 200,
        width: '45%',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10,
        backgroundColor: 'white',
    },
    imageBackground: {
        height: '80%',
        width: '100%',
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 5,
    },
    headerListView: {
        alignItems: 'center',
        marginTop: -30,
    },
    codeTextStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnView: {
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#ff2e63',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 40,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 7,
    },
});

export default HomeScreen;
