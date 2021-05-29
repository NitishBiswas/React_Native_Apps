/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CameraScreen = ({ navigation }) => {
    const cameraRef = useRef(null);
    const [camType, setCamType] = useState(RNCamera.Constants.Type.front);
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
    const [boltColor, setBoltColor] = useState('white');
    const [images, setImages] = useState([]);

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setImages([...images, data.uri]);
            storeData([...images, data.uri]);
        }
    };

    const flipCamera = () => {
        if (camType === RNCamera.Constants.Type.back) {
            setCamType(RNCamera.Constants.Type.front);
        } else {
            setCamType(RNCamera.Constants.Type.back);
        }
    };

    const flashChange = () => {
        if (flash === RNCamera.Constants.FlashMode.off) {
            setFlash(RNCamera.Constants.FlashMode.on);
            setBoltColor('green');
        } else {
            setFlash(RNCamera.Constants.FlashMode.off);
            setBoltColor('white');
        }
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@storage_Key', jsonValue);
        } catch (e) {
            Alert.alert('Info', 'Something went wrong!');
        }
    };


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key');
            jsonValue != null ? setImages(JSON.parse(jsonValue)) : null;
        } catch (e) {
            Alert.alert('Info', 'Something went wrong!');
        }
    };


    useEffect(() => {
        getData();
    });

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={camType}
                flashMode={flash}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={styles.buttonContainer}>
                    <FontAwesome5
                        onPress={() => flashChange()}
                        style={styles.flashIcon}
                        name={'bolt'} size={30} color={boltColor} />
                    <View style={styles.bottomIcon}>
                        <TouchableOpacity activeOpacity="0.4" onPress={() => flipCamera()} style={styles.capture}>
                            <FontAwesome5
                                name={'sync-alt'} size={40} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity="0.4" style={styles.capture} onPress={() => takePicture()}>
                            <FontAwesome5
                                name={'camera'} size={50} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Gallary', { images })} style={[styles.capture, styles.gallaryView]}>
                            <Image source={{ uri: images[images.length - 1] }} style={styles.imageView} />
                        </TouchableOpacity>
                    </View>
                </View>
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    capture: {
        flex: 0,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 20,
    },
    bottomIcon: {
        flexDirection: 'row',
    },
    gallaryView: {
        height: 45,
        width: 45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    flashIcon: {
        alignSelf: 'flex-end',
        marginTop: 10,
        opacity: 0.6,
    },
    imageView: {
        height: 50,
        width: 50,
    },
});

export default CameraScreen;
