/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FAB from 'react-native-fab';

const NotesList = ({ navigation }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key');
            jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData().catch(err => console.log(err));
    });

    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor="#f4511e" barStyle="light-content" />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.listView}
                            onPress={() => navigation.navigate('Details', { id: item.id })}
                        >
                            <View style={styles.textView}>
                                <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.descText} numberOfLines={1}>{item.desc}</Text>
                                <Text style={styles.dateText} numberOfLines={1}>{item.date}</Text>
                            </View>
                            <FontAwesome5 style={styles.buttonStyle} color="red" name="trash-alt" size={28} onPress={() => dispatch({ type: 'Delete_Data', payload: item.id })} />
                        </TouchableOpacity>
                    );
                }}
            />
            <FAB buttonColor="#f4511e" iconTextColor="#FFFFFF" onClickAction={() => { navigation.navigate('Create Notes'); }} visible={true} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listView: {
        height: 100,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 15,
        marginVertical: 5,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 20,
    },
    buttonStyle: {
        alignSelf: 'center',
    },
    titleText: {
        fontSize: 25,
        color: '#f4511e',
        fontWeight: 'bold',
    },
    descText: {
        fontSize: 20,
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 10,
    },
    textView: {
        width: '90%',
    },
});

export default NotesList;
