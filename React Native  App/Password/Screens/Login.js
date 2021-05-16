/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    LogBox,
    StatusBar,
    Image,
    StyleSheet,
    Alert,
    Modal,
    ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import { config } from '../Firebases/config';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

const Login = ({ navigation }) => {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [newGmail, setNewGmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [data, setData] = useState({});
    const [hasGmail, setHasGmail] = useState(false);
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

    const logIn = (g, p) => {
        firebase.auth().signInWithEmailAndPassword(g, p)
            .then((res) => {
                setGmail('');
                setPassword('');
                navigation.navigate('Home');
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    const findAccount = () => {
        var mail = newGmail.replace(/[.@]/g, '');
        firebase.database().ref(`user/${mail}`).once('value', (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
                setHasGmail(true);
            } else {
                Alert.alert('Info', 'Incorrect Gmail!');
            }
        });
    };

    const resetPassword = () => {
        var mail = data.Gmail.replace(/[.@]/g, '');
        firebase.auth().signInWithEmailAndPassword(data.Gmail, data.Password)
            .then(() => {
                firebase.auth().currentUser.updatePassword(newPassword)
                    .then(() => {
                        navigation.navigate('Home');
                        firebase.database().ref(`user/${mail}`).update({
                            Password: newPassword,
                        });
                        setHasGmail(false);
                    })
                    .catch((err) => Alert.alert('Info', err.toString().replace('Error:', '')));
            })
            .catch((err) => Alert.alert('Info', err.toString().replace('Error:', '')));
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
            <View style={styles.headerSection}>
                <View style={styles.imageView}>
                    <Image source={require('../images/logo.jpg')} style={styles.image} />
                </View>
            </View>
            <View style={styles.scroll}>
                <ScrollView style={styles.footerSection}>
                    <View style={styles.scrollView}>
                        <View style={styles.insideScrollView}>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'envelope'} size={25} color={'#FF4700'} />
                                <Text style={styles.iconText}>Gmail</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your gmail"
                                    // secureTextEntry={gmail !== '' ? false : true}
                                    value={gmail}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setGmail(text)}
                                />
                                {gmail !== '' ? <FontAwesome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
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
                                    setLoading(true);
                                    logIn(gmail, password);
                                }}
                                style={styles.loginbuttonView}>
                                <FontAwesome5 style={styles.icon} name={'sign-in-alt'} size={25} color={'#fff'} />
                                <Text
                                    style={styles.loginBtn}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Signup')}
                                style={styles.signupbuttonView}>
                                <FontAwesome5 style={styles.icon} name={'user-plus'} size={25} color={'#FF4700'} />
                                <Text
                                    style={styles.signinBtn}>Signup</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModal(true)}
                                style={styles.forgotView}>
                                <Text style={styles.forgotText}>Forgot Password ?</Text>
                                <FontAwesome5 style={styles.icon} name={'frown'} size={25} color={'#FF4700'} />
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
                    setHasGmail(false);
                }}
            >
                <View style={styles.modalView}>
                    {hasGmail ? <View style={styles.modalViewAlignment}>
                        <View style={styles.iconView}>
                            <FontAwesome5 name={'lock'} size={25} color={'#fff'} />
                            <Text style={styles.resetText}>Password</Text>
                        </View>
                        <View style={styles.passwordInputView}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={passwordVisible}
                                value={newPassword}
                                style={styles.passwordInput}
                                onChangeText={(text) => setNewPassword(text)}
                            />
                            {newPassword !== '' ? <FontAwesome5 onPress={() => {
                                setPasswordVisible(!passwordVisible);
                            }} style={styles.icon} name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color={'#FF4700'} /> : null}
                        </View>
                        <TouchableOpacity
                            onPress={() => resetPassword()}
                            style={styles.signupbuttonView}>
                            <FontAwesome5 style={styles.icon} name={'save'} size={25} color={'#FF4700'} />
                            <Text
                                style={styles.signinBtn}>Save</Text>
                        </TouchableOpacity>
                    </View> :
                        <View style={styles.modalViewAlignment}>
                            <View style={styles.iconView}>
                                <FontAwesome5 name={'envelope'} size={25} color={'#fff'} />
                                <Text style={styles.resetText}>Gmail</Text>
                            </View>
                            <View style={styles.passwordInputView}>
                                <TextInput
                                    placeholder="Enter your gmail"
                                    // secureTextEntry={newGmail !== '' ? false : true}
                                    value={newGmail}
                                    style={styles.passwordInput}
                                    onChangeText={(text) => setNewGmail(text)}
                                />
                                {newGmail !== '' ? <FontAwesome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                            </View>
                            <TouchableOpacity
                                onPress={() => findAccount()}
                                style={styles.signupbuttonView}>
                                <FontAwesome5 style={styles.icon} name={'search'} size={25} color={'#FF4700'} />
                                <Text
                                    style={styles.signinBtn}>Find Account</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <TouchableOpacity onPress={() => {
                        setModal(false);
                        setHasGmail(false);
                    }}>
                        <Text style={styles.cancleBtn}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    headerSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    imageView: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'white',
        elevation: 20,
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
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
    forgotView: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    forgotText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF4700',
        marginRight: 5,
    },
    modalView: {
        height: 240,
        width: '100%',
        backgroundColor: '#FF4700',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 15,
    },
    resetText: {
        fontSize: 22,
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalViewAlignment: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    cancleBtn: {
        fontSize: 22,
        color: 'white',
        marginTop: 15,
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
        height: '65%',
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
    noInternet: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Login;
