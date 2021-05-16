/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Modal, StatusBar, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import FAB from 'react-native-fab';
import FontAewsome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase';
import { config } from '../Firebases/config';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';


const Home = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState([]);
    const [noData, setNoData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dataModal, setDataModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [title, setTitle] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [oldTitle, setOldTitle] = useState('Nitish');

    const [gmail, setGmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [img, setImg] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [newLoading, setNewLoading] = useState(false);

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

    const currentUser = firebase.auth().currentUser;
    var mail = currentUser.email.replace(/[.@]/g, '');

    const getData = () => {
        firebase.database().ref(mail).once('value', (snapshot) => {
            if (snapshot.exists()) {
                setData(Object.values(snapshot.val()));
                setLoading(false);
                setNoData(false);
            } else {
                setNoData(true);
                setLoading(false);
            }
        })
            .catch((err) => Alert.alert('Info', err.toString().replace('Error:', '')));
    };

    const getUserInfo = () => {
        firebase.database().ref(`user/${mail}`).once('value', (snapshot) => {
            if (snapshot.exists()) {
                setUserInfo(snapshot.val());
                setName(snapshot.val().Name);
                setNewPassword(snapshot.val().Password);
                setNumber(snapshot.val().Number);
                setGmail(snapshot.val().Gmail);
                setImg(snapshot.val().Image);
            } else {
                Alert.alert('Info', 'Incorrect Gmail!');
            }
        });
        getData();

    };

    const addData = () => {
        console.log(oldTitle);
        console.log(title);
        var modifyTitle = title.replace(/[.@]/g, '');
        var child = firebase.database().ref(`${mail}/${oldTitle}`);
        child.once('value', (snapshot) => {
            if (snapshot.exists()) {
                { title !== oldTitle ? child.remove() : null }
                firebase.database().ref(`${mail}/${modifyTitle}`).set({
                    Title: title,
                    UserName: userName,
                    Password: password,
                })
                    .then(() => {
                        setNewLoading(false);
                        setDataModal(false);
                        getData();
                    })
                    .catch((err) => {
                        setNewLoading(false);
                        Alert.alert('Info', err.toString().replace('Error:', ''));
                    });
            } else {
                firebase.database().ref(`${mail}/${modifyTitle}`).set({
                    Title: title,
                    UserName: userName,
                    Password: password,
                })
                    .then(() => {
                        setNewLoading(false);
                        setDataModal(false);
                        getData();
                    })
                    .catch((err) => {
                        setNewLoading(false);
                        Alert.alert('Info', err.toString().replace('Error:', ''));
                    });
            }
        });
    };

    const updateProfile = () => {
        firebase.auth().signInWithEmailAndPassword(userInfo.Gmail, userInfo.Password)
            .then(() => {
                currentUser.updateEmail(gmail)
                    .then(() => {
                        currentUser.updatePassword(newPassword)
                            .then(() => {
                                firebase.database().ref(`user/${mail}`).remove()
                                    .then(() => {
                                        var userGmail = gmail.replace(/[.@]/g, '');
                                        firebase.database().ref(`user/${userGmail}`).set({
                                            Name: name,
                                            Gmail: gmail,
                                            Number: number,
                                            Password: newPassword,
                                            Image: img,
                                        })
                                            .then(() => {
                                                setNewLoading(false);
                                                setEditable(false);
                                                getUserInfo();
                                            })
                                            .catch((err) => {
                                                setNewLoading(false);
                                                Alert.alert('Info', err.toString().replace('Error:', ''));
                                            });
                                    })
                                    .catch((err) => {
                                        setNewLoading(false);
                                        Alert.alert('Info', err.toString().replace('Error:', ''));
                                    });
                            })
                            .catch((err) => {
                                setNewLoading(false);
                                Alert.alert('Info', err.toString().replace('Error:', ''));
                            });
                    })
                    .catch((err) => {
                        setNewLoading(false);
                        Alert.alert('Info', err.toString().replace('Error:', ''));
                    });
            })
            .catch((err) => {
                setNewLoading(false);
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    const logoutAccount = () => {
        firebase.auth().signOut()
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((err) => {
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    const deleteAccount = () => {
        firebase.auth().signInWithEmailAndPassword(userInfo.Gmail, userInfo.Password)
            .then(() => {
                firebase.database().ref(`user/${mail}`).remove()
                    .then(() => {
                        firebase.database().ref(mail).remove()
                            .then(() => {
                                firebase.auth().currentUser.delete()
                                    .then(() => {
                                        Alert.alert('Info', 'Successfully Deleted !');
                                        navigation.navigate('Login');
                                    })
                                    .catch((err) => {
                                        Alert.alert('Info', err.toString().replace('Error:', ''));
                                    });
                            })
                            .catch((err) => {
                                Alert.alert('Info', err.toString().replace('Error:', ''));
                            });
                    })
                    .catch((err) => {
                        Alert.alert('Info', err.toString().replace('Error:', ''));
                    });
            })
            .catch((err) => {
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    const deleteData = () => {
        firebase.database().ref(`${mail}/${oldTitle}`).remove()
            .then(() => {
                setDataModal(false);
                getData();
            })
            .catch((err) => {
                Alert.alert('Info', err.toString().replace('Error:', ''));
            });
    };

    useEffect(() => {
        getNetInfo();
        getUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => {
                    setProfileModal(true);
                    setEditable(false);
                }}>
                    <Image source={{ uri: userInfo.Image }} style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Home</Text>
                <FontAewsome5 onPress={() => {
                    setProfileModal(true);
                    setEditable(true);
                }} name={'user-edit'} size={25} color={'white'} style={styles.headerIconRight} />
            </View>
            {noData ? <View style={styles.noDataView}>
                {loading ? <LottieView source={require('../images/9965-loading-spinner.json')} autoPlay loop /> : null}
                <Text>No data available !</Text>
            </View> : <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.Title}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setTitle(item.Title);
                                setUserName(item.UserName);
                                setPassword(item.Password);
                                setOldTitle(item.Title);
                                setDataModal(true);
                                setEditable(false);
                                setDeleteBtn(true);
                            }}
                                onLongPress={() => {
                                    setOldTitle(item.Title);
                                    setDeleteModal(true);
                                }}
                                style={styles.listView}>
                                <View style={styles.listViewText}>
                                    <Text style={styles.listTitleText}>{item.Title}</Text>
                                    <Text style={styles.listUsernameText}>{item.UserName}</Text>
                                </View>
                                <View style={styles.listIcon}>
                                    <FontAewsome5 name={'angle-right'} size={25} color={'#FF4700'} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>}

            <Modal
                animationType="fade"
                transparent={true}
                visible={dataModal}
                onRequestClose={() => {
                    setDataModal(false);
                }}
            >
                <LinearGradient
                    style={styles.dataModalContainer}
                    colors={['#FF4700', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <StatusBar backgroundColor="#FF4700" />
                    <FontAewsome5 onPress={() => setDataModal(false)} name={'arrow-alt-circle-left'} color={'white'} size={30} style={styles.headerLeftIcon} />
                    {deleteBtn ? <FontAewsome5 style={styles.headerRightIcon} onPress={() => {
                        setNewLoading(true);
                        deleteData();
                    }} name={'trash'} size={30} color={'white'} /> : null}
                    <Image source={{ uri: userInfo.Image }} style={styles.dataImage} />
                    <View style={styles.scroll}>
                        <ScrollView style={styles.footerSection}>
                            <View style={styles.scrollView}>
                                <View style={styles.insideScrollView}>
                                    <View style={styles.iconView}>
                                        <FontAewsome5 name={'pencil-alt'} size={25} color={'#FF4700'} />
                                        <Text style={styles.iconText}>Title</Text>
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter a title"
                                            // secureTextEntry={title !== '' ? false : true}
                                            value={title}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setTitle(text)}
                                        />
                                        {title !== '' ? <FontAewsome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <View style={styles.iconView}>
                                        <FontAewsome5 name={'atlas'} size={25} color={'#FF4700'} />
                                        <Text style={styles.iconText}>User_Name / Link</Text>
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter an username"
                                            // secureTextEntry={userName !== '' ? false : true}
                                            value={userName}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setUserName(text)}
                                        />
                                        {title !== '' ? <FontAewsome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <View style={styles.iconView}>
                                        <FontAewsome5 name={'lock'} size={25} color={'#FF4700'} />
                                        <Text style={styles.iconText}>Password</Text>
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter a password"
                                            secureTextEntry={passwordVisible}
                                            value={password}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setPassword(text)}
                                        />
                                        {password !== '' ? <FontAewsome5 onPress={() => {
                                            setPasswordVisible(!passwordVisible);
                                        }} style={styles.icon} name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            editable ? addData() : setEditable(true);
                                        }}
                                        style={styles.loginbuttonView}>
                                        <FontAewsome5 style={styles.icon} name={editable ? 'save' : 'edit'} size={25} color={'#fff'} />
                                        <Text
                                            style={styles.loginBtn}>{editable ? 'Save' : 'Edit'}</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        onPress={() => setDataModal(false)}
                                        style={styles.signupbuttonView}>
                                        <Text
                                            style={styles.signinBtn}>Cancle</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </ScrollView>
                        {newLoading ? <LottieView style={styles.loadingView} source={require('../images/9965-loading-spinner.json')} autoPlay loop /> : null}
                    </View>
                </LinearGradient>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={profileModal}
                onRequestClose={() => {
                    setProfileModal(false);
                    setEditable(false);
                }}
            >
                <LinearGradient
                    style={styles.dataModalContainer}
                    colors={['#FF4700', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <StatusBar backgroundColor="#FF4700" />
                    <View style={styles.headerBtnView}>
                        <TouchableOpacity onPress={() => logoutAccount()} style={styles.headerBtn}>
                            <Text style={styles.headerBtnText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteAccount()
                        } style={styles.headerBtn}>
                            <Text style={styles.headerBtnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.profileView} onPress={() => {
                        setImageModal(true);
                        setEditable(true);
                    }}>
                        <Image source={{ uri: userInfo.Image }} style={styles.profileImage} />
                        <FontAewsome5 style={styles.profileIcon} name={'user-edit'} color={'white'} size={25} />
                    </TouchableOpacity>
                    <View style={styles.scroll}>
                        <ScrollView style={styles.footerSection}>
                            <View style={styles.scrollView}>
                                <View style={styles.insideScrollView}>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter your name"
                                            // secureTextEntry={name !== '' ? false : true}
                                            value={name}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setName(text)}
                                        />
                                        {name !== '' ? <FontAewsome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter your gmail"
                                            // secureTextEntry={gmail !== '' ? false : true}
                                            value={gmail}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setGmail(text)}
                                        />
                                        {gmail !== '' ? <FontAewsome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter your number"
                                            keyboardType="number-pad"
                                            // secureTextEntry={number !== '' ? false : true}
                                            value={number}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setNumber(text)}
                                        />
                                        {number !== '' ? <FontAewsome5 style={styles.icon} name={'check-circle'} size={20} color={'#FF4700'} /> : null}
                                    </View>
                                    <View style={styles.passwordInputView}>
                                        <TextInput
                                            editable={editable}
                                            placeholder="Enter your password"
                                            secureTextEntry={newPasswordVisible}
                                            value={newPassword}
                                            style={styles.passwordInput}
                                            onChangeText={(text) => setNewPassword(text)}
                                        />
                                        {newPassword !== '' ? <FontAewsome5 onPress={() => {
                                            setNewPasswordVisible(!newPasswordVisible);
                                        }} style={styles.icon} name={newPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={'#FF4700'} /> : null}
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => {
                                            editable ? [
                                                setNewLoading(true),
                                                updateProfile(),
                                            ] : setEditable(true);
                                        }}
                                        style={styles.loginbuttonView}>
                                        <FontAewsome5 style={styles.icon} name={editable ? 'save' : 'user-edit'} size={25} color={'#fff'} />
                                        <Text
                                            style={styles.loginBtn}>{editable ? 'Update' : 'Edit'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setProfileModal(false);
                                            setEditable(false);
                                        }}
                                        style={styles.signupbuttonView}>
                                        <Text
                                            style={styles.signinBtn}>Cancle</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                        {newLoading ? <LottieView style={styles.loadingView} source={require('../images/9965-loading-spinner.json')} autoPlay loop /> : null}
                    </View>
                </LinearGradient>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={imageModal}
                onRequestClose={() => {
                    setImageModal(false);
                    setEditable(false);
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
                                    enableRotationGesture: true,
                                    includeBase64: true,
                                    mediaType: 'photo',
                                })
                                    .then((res) => {
                                        setImg(`data:${res.mime};base64,${res.data}`);
                                        setImageModal(false);
                                    })
                                    .catch(() =>
                                        setImageModal(true)
                                    );
                            }}
                            style={styles.modalBtn}>
                            <FontAewsome5 style={styles.icon} name={'camera'} size={25} color={'#FF4700'} />
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
                                        setImageModal(false);
                                    })
                                    .catch(() =>
                                        setImageModal(false)
                                    );
                            }}
                            style={styles.modalBtn}>
                            <FontAewsome5 style={styles.icon} name={'image'} size={25} color={'#FF4700'} />
                            <Text
                                style={styles.signinBtn}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setImageModal(false);
                            setEditable(false);
                        }}
                        style={styles.modalBtn}>
                        <Text
                            style={styles.signinBtn}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    setDeleteModal(false);
                }}
            >
                <LinearGradient
                    style={styles.deleteModalView}
                    colors={['#FF4700', '#fc806f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <View>
                        <Text style={styles.deleteModalText}>Do you want to delete ?</Text>
                        <View style={styles.deleteModalBtnView}>
                            <TouchableOpacity onPress={() => {
                                deleteData();
                                setDeleteModal(false);
                            }} style={styles.deleteModalBtn}>
                                <Text style={styles.deleteModalBtnText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setDeleteModal(false)} style={styles.deleteModalBtn}>
                                <Text style={styles.deleteModalBtnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>

            <FAB buttonColor="#FF4700" iconTextColor="#FFFFFF" onClickAction={() => {
                setDataModal(true);
                setDeleteBtn(false);
                setEditable(true);
                setTitle('');
                setUserName('');
                setPassword('');
            }} visible={true} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerView: {
        height: 55,
        width: '100%',
        backgroundColor: '#FF4700',
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 23,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    headerIcon: {
        height: 45,
        width: 45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        marginHorizontal: 8,
    },
    headerIconRight: {
        position: 'absolute',
        right: 20,
    },
    noDataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 25,
        flexDirection: 'row',
        backgroundColor: '#FF4700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupbuttonView: {
        width: '80%',
        elevation: 5,
        borderRadius: 20,
        marginTop: 20,
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
    dataModalContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'center',
    },
    dataImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: '15%',
        marginVertical: '5%',
    },
    profileView: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    profileIcon: {
        position: 'absolute',
        right: 3,
        bottom: 30,
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
        // marginBottom: 25,
    },
    headerBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    headerBtn: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
    },
    headerBtnText: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    listView: {
        width: '94%',
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 4,
        marginVertical: 7,
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center',
    },
    listViewText: {
        width: '90%',
        marginLeft: 15,
    },
    listTitleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF4700',
    },
    listUsernameText: {
        fontSize: 20,
    },
    listIcon: {
        width: '10%',
        alignSelf: 'center',
    },
    dataHeaderBtnView: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    deleteModalView: {
        height: 150,
        width: '90%',
        borderColor: '#FF4700',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: '40%',
    },
    deleteModalText: {
        fontSize: 22,
        color: 'white',
    },
    deleteModalBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    deleteModalBtn: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
        width: 100,
        backgroundColor: '#FF4700',
    },
    deleteModalBtnText: {
        fontSize: 22,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: '60%',
    },
    insideScrollView: {
        alignItems: 'center',
        paddingTop: 10,
    },
    scroll: {
        height: '85%',
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
    headerLeftIcon: {
        position: 'absolute',
        top: 15,
        paddingLeft: 18,
    },
    headerRightIcon: {
        position: 'absolute',
        top: 15,
        right: 18,
    },
});

export default Home;
