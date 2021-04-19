/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CreateNotes = ({ navigation }) => {
    const [note, setNote] = useState({
        id: '',
        title: '',
        desc: '',
        date: '',
    });
    const { title, desc } = note;

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var createDate = date + '/' + month + '/' + year + '    ' + hours + ' : ' + min + ' : ' + sec;
    const dispatch = useDispatch();

    return (
        <View>
            <StatusBar animated={true} backgroundColor="#f4511e" />
            <Text style={styles.titleText}>Title</Text>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={(text) => setNote({ ...note, title: text })}
                placeholder="Enter your title"
                onEndEditing={() => setNote({ ...note, id: uuid.v4(), date: createDate })}
            />
            <Text style={styles.titleText}>Description</Text>
            <TextInput
                style={styles.titleInput}
                value={desc}
                onChangeText={(text) => setNote({ ...note, desc: text })}
                placeholder="Enter your description"
                multiline={true}
                numberOfLines={3}
            />
            <TouchableOpacity
                style={styles.titleInput}
                onPress={() => {
                    note.title && note.desc !== '' ?
                        (dispatch({ type: 'Add_Data', payload: note }),
                            navigation.navigate('Notes List')) : null;
                }}>
                <View style={styles.buttonStyle}>
                    <FontAwesome5 name="save" size={30} color="#f4511e" />
                    <Text style={styles.textButton}>Save</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        fontSize: 25,
        margin: 10,
    },
    titleInput: {
        padding: 5,
        fontSize: 25,
        borderWidth: 2,
        borderColor: '#f4511e',
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        color: '#f4511e',
    },
    textButton: {
        fontSize: 25,
        marginHorizontal: 10,
    },
    buttonStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
});

export default CreateNotes;
