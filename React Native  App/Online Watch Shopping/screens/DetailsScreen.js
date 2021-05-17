/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';

const DetailsScreen = ({ navigation, route }) => {
    const { item } = route.params;
    const data = useSelector((state) => {
        return state.data;
    });
    const itemAvailable = data.find((favouriteData) => {
        return favouriteData.id === item.id;
    });
    const dispatch = useDispatch();
    return (
        <ScrollView style={styles.list}>
            <View style={styles.container}>
                <View style={styles.cardView}>
                    <Image source={{ uri: item.image1 }} style={styles.imageView} />
                    <View style={styles.heartView}>
                        <FontAwesome5 name={itemAvailable !== undefined && itemAvailable.id === item.id ? 'gratipay' : 'heart'} color={itemAvailable !== undefined && itemAvailable.id === item.id ? '#ff2e63' : 'black'} size={28} onPress={() => { itemAvailable !== undefined && itemAvailable.id === item.id ? dispatch({ type: 'Delete_Data', payload: item.id }) : dispatch({ type: 'Add_Data', payload: item }) }} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.title}>Brand : {item.brand}</Text>
                    <Text style={styles.product}>Product Code : {item.productCode}</Text>
                    <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('Login')}>
                        <FontAwesome5 name={'shopping-cart'} color={'white'} size={16} />
                        <Text style={styles.btnText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: '10%',
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },
    cardView: {
        width: '90%',
        backgroundColor: 'white',
        elevation: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    imageView: {
        height: 300,
        width: '100%',
    },
    btnView: {
        marginVertical: 8,
        flexDirection: 'row',
        backgroundColor: '#ff2e63',
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 40,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 22,
        color: 'white',
        paddingLeft: 7,
    },
    heartView: {
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    product: {
        fontSize: 20,
        color: '#ff2e63',
        fontWeight: 'bold',
    },
});

export default DetailsScreen;
