/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DetailScreen = ({ navigation, route }) => {
    const { id } = route.params;

    const data = useSelector((state) => { return state.data; });
    const [detail] = data.filter((item) => {
        return item.id === id;
    });
    const [editable, setEditable] = useState(false);
    const [button, setButton] = useState('Edit');
    const [icon, setIcon] = useState('edit');

    const [note, setNote] = useState(detail);
    const { title, desc } = note;

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var createDate = day + '/' + month + '/' + year + '    ' + hours + ' : ' + min + ' : ' + sec;

    const dispatch = useDispatch();
    return (
        <View>
            <StatusBar animated={true} backgroundColor="#f4511e" />
            <Text style={styles.titleText}>Title</Text>
            <TextInput
                editable={editable}
                style={styles.titleInput}
                value={title}
                onChangeText={(text) => setNote({ ...note, title: text })}
                placeholder="Enter your title"
                onEndEditing={() => setNote({ ...note, date: createDate })}
            />
            <Text style={styles.titleText}>Description</Text>
            <TextInput
                editable={editable}
                style={styles.titleInput}
                value={desc}
                onChangeText={(text) => setNote({ ...note, desc: text })}
                placeholder="Enter your description"
                multiline={true}
                numberOfLines={3}
                onEndEditing={() => setNote({ ...note, date: createDate })}
            />
            <TouchableOpacity
                style={styles.titleInput}
                onPress={() => {
                    button === 'Edit' ? (
                        setEditable(true),
                        setButton('Update'),
                        setIcon('save')
                    ) : note.title && note.desc !== '' ?
                        (dispatch({ type: 'Update_Data', payload: note }),
                            navigation.navigate('Notes List')) : null;
                }}>
                <View style={styles.buttonStyle}>
                    <FontAwesome5 name={icon} size={30} color="#f4511e" />
                    <Text style={styles.textButton}>{button}</Text>
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

export default DetailScreen;
