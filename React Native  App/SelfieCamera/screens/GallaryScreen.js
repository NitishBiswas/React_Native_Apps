/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width;

const GallaryScreen = ({ route }) => {
    const { images } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [img, setImg] = useState('');
    const [newImages, setNewImages] = useState(images);

    const deleteImage = (deleteImg) => {
        const newImage = newImages.filter((item) => {
            if (item !== deleteImg) {
                return item;
            }
        });
        setNewImages(newImage);
        setModalVisible(false);
        storeData(newImage);
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@storage_Key', jsonValue);
        } catch (e) {
            Alert.alert('Info', 'Something went wrong!');
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listView}
                data={newImages}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setImg(item);
                            setModalVisible(true);
                        }}>
                            <Image source={{ uri: item }} style={styles.image} />
                        </TouchableOpacity>
                    );
                }}
                numColumns={3}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.fullImage}>
                    <ImageBackground source={{ uri: img }} style={styles.fullImage}>
                        <View style={styles.modalButtonView}>
                            <FontAwesome5 onPress={() => deleteImage(img)} name={'trash'} style={styles.closeButton} size={30} color={'red'} />
                            <FontAwesome5 onPress={() => setModalVisible(false)} name={'times'} style={styles.closeButton} size={30} color={'red'} />
                        </View>

                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    listView: {
        flex: 1,
    },
    image: {
        height: width / 3 - 12,
        width: width / 3 - 12,
        margin: 5,
        alignSelf: 'center',
    },
    imageView: {
        flex: 1,
    },
    fullImage: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-end',
    },
    closeButton: {
        margin: 10,
        opacity: 0.7,
    },
    modalButtonView: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default GallaryScreen;
