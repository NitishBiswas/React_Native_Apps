/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function ListItem({ item, handledelete }) {
    const swip = () => {
        return (
            <View style={styles.delete}>
                <TouchableOpacity onPress={handledelete}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.listView}>
            <Swipeable renderRightActions={swip}>
                <View>
                    <Text style={styles.text}>{item.Name}</Text>
                    <Text style={styles.text}>{item.Roll}</Text>
                </View>
            </Swipeable>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        padding: 5,
        borderWidth: 2,
        borderColor: 'tomato',
        borderRadius: 10,
        fontSize: 22,
        marginVertical: 10,
    },
    list: {
        flex: 1,
    },
    listView: {
        width: (Dimensions.get('window').width * 90) / 100,
        flex: 1,
        borderWidth: 2,
        borderColor: 'tomato',
        borderRadius: 10,
        marginVertical: 7,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    text: {
        fontSize: 22,
    },
    delete: {
        width: 90,
        backgroundColor: 'tomato',
        justifyContent: 'center',
    },
    deleteText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ListItem;
