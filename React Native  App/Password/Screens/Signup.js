/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    LogBox,
    StatusBar,
    StyleSheet,
    Modal,
    Alert,
    ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import { config } from '../Firebases/config';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

const Login = ({ navigation }) => {
    const defaultImage = 'https://res.cloudinary.com/nitishbiswas/image/upload/v1620567867/logo_kdtrst.jpg';
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [img, setImg] = useState(defaultImage);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    LogBox.ignoreLogs(['Setting a timer']);
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const getNetInfo = () => {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                Alert.alert('⚠ Warning', 'Please check your internet connection!');
            }
        });
    };

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(gmail, password)
            .then((res) => {
                firebase.auth().signInWithEmailAndPassword(gmail, password)
                    .then(() => {
                        setLoading(false);
                        navigation.navigate('Home');
                        var mail = gmail.replace(/[.@]/g, '');
                        firebase.database().ref(`user/${mail}`).set({
                            Name: name,
                            Gmail: gmail,
                            Number: number,
                            Password: password,
                            Image: img,
                        })
                            .then(() => Alert.alert('Congratulations!'))
                            .catch((err) => {
                                setLoading(false);
                                Alert.alert('Info', err.toString().replace('Error:', ''));
                            });
                    }).catch((err) => {
                        setLoading(false);
                        Alert.alert('Info', err.toString().replace('Error:', ''));
                    });

            }).catch((err) => {
                setLoading(false);
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    useEffect(() => {
        getNetInfo();
    }, []);

    return (

        <LinearGradient
            style={styles.container}
            colors={['#FF4700', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <StatusBar backgroundColor="#FF4700" />
            <FontAwesome5 onPress={() => navigation.goBack()} name={'arrow-alt-circle-left'} color={'white'} size={35} style={styles.headerLeftIcon} />

            <View style={styles.scroll}>
                <ScrollView style={styles.footerSection}>
                    <View style={styles.scrollView}>
                        <View style={styles.insideScrollView}>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'user-tie'} size={25} color={'#FF4700'} />
                                <Text style={styles.iconText}>Name</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your name"
                                    value={name}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setName(text)}
                                />
                                {name !== '' ? <FontAwesome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                            </View>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'envelope'} size={25} color={'#FF4700'} />
                                <Text style={styles.iconText}>Gmail</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your gmail"
                                    value={gmail}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setGmail(text)}
                                />
                                {gmail !== '' ? <FontAwesome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                            </View>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'phone-alt'} size={25} color={'#FF4700'} />
                                <Text style={styles.iconText}>Number</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your number"
                                    keyboardType="number-pad"
                                    value={number}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setNumber(text)}
                                />
                                {number !== '' ? <FontAwesome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                            </View>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'lock'} size={25} color={'#FF4700'} />
                                <Text style={styles.iconText}>Password</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your password"
                                    secureTextEntry={passwordVisible}
                                    value={password}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                {password !== '' ? <FontAwesome5 onPress={() => {
                                    setPasswordVisible(!passwordVisible);
                                }} style={styles.icon} name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color={'#FF4700'} /> : null}
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setModal(true);
                                }}
                                style={styles.signupbuttonView}>
                                <FontAwesome5 style={styles.icon} name={img !== defaultImage ? 'check-circle' : 'cloud-upload-alt'} size={25} color={'#FF4700'} />
                                <Text
                                    style={styles.signinBtn}>Upload Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true);
                                    signUp();
                                }}
                                style={styles.loginbuttonView}>
                                <FontAwesome5 style={styles.icon} name={'save'} size={25} color={'#fff'} />
                                <Text
                                    style={styles.loginBtn}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {loading ? <LottieView style={styles.loadingView} source={require('../images/9965-loading-spinner.json')} autoPlay loop /> : null}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalBtnView}>
                        <TouchableOpacity
                            onPress={() => {
                                ImagePicker.openCamera({
                                    width: 300,
                                    height: 300,
                                    cropping: true,
                                    includeBase64: true,
                                    enableRotationGesture: true,
                                    mediaType: 'photo',
                                })
                                    .then((res) => {
                                        setImg(`data:${res.mime};base64,${res.data}`);
                                        setModal(false);
                                    })
                                    .catch(() =>
                                        setModal(true)
                                    );
                            }}
                            style={styles.modalBtn}>
                            <FontAwesome5 style={styles.icon} name={'camera'} size={25} color={'#FF4700'} />
                            <Text
                                style={styles.signinBtn}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                ImagePicker.openPicker({
                                    width: 300,
                                    height: 300,
                                    cropping: true,
                                    includeBase64: true,
                                    enableRotationGesture: true,
                                    mediaType: 'photo',
                                })
                                    .then((res) => {
                                        setImg(`data:${res.mime};base64,${res.data}`);
                                        setModal(false);
                                    })
                                    .catch(() =>
                                        setModal(false)
                                    );
                            }}
                            style={styles.modalBtn}>
                            <FontAwesome5 style={styles.icon} name={'image'} size={25} color={'#FF4700'} />
                            <Text
                                style={styles.signinBtn}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false);
                        }}
                        style={styles.modalBtn}>
                        <Text
                            style={styles.signinBtn}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    headerLeftIcon: {
        position: 'absolute',
        top: 15,
        paddingLeft: 18,
    },
    iconView: {
        width: '80%',
        flexDirection: 'row',
        marginTop: 5,
        paddingLeft: 10,
    },
    iconText: {
        fontSize: 22,
        marginLeft: 10,
        color: '#FF4700',
        fontWeight: 'bold',
    },
    passwordInputView: {
        width: '80%',
        borderRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        paddingLeft: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        width: '88%',
        padding: 10,
        fontSize: 20,
        color: '#FF4700',
        backgroundColor: 'white',
        fontWeight: 'bold',
        borderRadius: 20,
    },
    loginbuttonView: {
        width: '80%',
        elevation: 5,
        borderRadius: 20,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#FF4700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupbuttonView: {
        width: '80%',
        elevation: 5,
        borderRadius: 20,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FF4700',
    },
    loginBtn: {
        fontSize: 22,
        padding: 8,
        textAlign: 'center',
        borderRadius: 20,
        color: 'white',
        borderWidth: 2,
        borderColor: '#FF4700',
        fontWeight: 'bold',
    },
    signinBtn: {
        fontSize: 22,
        padding: 8,
        textAlign: 'center',
        borderRadius: 20,
        color: '#FF4700',
        fontWeight: 'bold',
    },
    icon: {
        paddingRight: 5,
    },
    modalView: {
        height: 200,
        width: '100%',
        backgroundColor: '#FF4700',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 15,
    },
    modalBtn: {
        width: '40%',
        elevation: 10,
        borderRadius: 20,
        marginTop: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    modalBtnView: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    scrollView: {
        width: '100%',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: '30%',
    },
    insideScrollView: {
        alignItems: 'center',
        paddingTop: 10,
    },
    scroll: {
        height: '90%',
    },
    footerSection: {
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingTop: 20,
    },
    loadingView: {
        height: 100,
        width: 100,
        position: 'absolute',
        alignSelf: 'center',
    },
});

export default Login;
