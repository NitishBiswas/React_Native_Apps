/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab1 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [uri, setUri] = useState('');
    const [title, setTitle] = useState('');

    const onShare = async (title, uri) => {
        try {
            const result = await Share.share({
                message:
                    `${title} Read more @ | ${uri}`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const apiCall = () => {
        fetch('https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=d8d4393ca6184fbf9a0b6322c5e282b6')
            .then(result => result.json())
            .then(result => {
                setData(result.articles);
                setLoading(false);
            })
            .catch(err => console.log(err));
    };
    const loadingApi = () => {
        return (
            <View style={styles.indecator}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={styles.indicatorText}>Please wait...</Text>
            </View>
        );
    };

    useEffect(() => {
        loadingApi();
        JSON.stringify(apiCall());
    }, []);
    return (
        <View>
            {loading ? loadingApi() : <FlatList
                data={data}
                keyExtractor={item => item.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setUri(item.url);
                            setTitle(item.title);
                            setModal(true);
                        }} style={styles.cardView}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.imageView} source={{ uri: item.urlToImage !== undefined ? item.urlToImage : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-image-available.png&psig=AOvVaw2q2ig-9AylL9TRM22hhgxR&ust=1618636504130000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjd2oCBgvACFQAAAAAdAAAAABAN' }} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.textDescription} numberOfLines={2}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(false)}
            >
                <View style={styles.webView}>
                    <View style={styles.header}>
                        <FontAwesome5 onPress={() => setModal(false)} name="times" size={25} color={'white'} />
                        <FontAwesome5 onPress={() => onShare(title, uri)} name="share-alt" size={25} color={'white'} />
                    </View>
                    <WebView scalesPageToFit startInLoadingState style={styles.webView} source={{ uri: uri }} />
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    indecator: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    indicatorText: {
        fontSize: 20,
        color: 'blue',
        marginTop: 10,
    },
    cardView: {
        height: 110,
        width: '100%',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    imageContainer: {
        flex: 1,
    },
    imageView: {
        height: 100,
        width: 100,
    },
    textContainer: {
        flex: 2.5,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 18,
    },
    webView: {
        flex: 1,
        marginHorizontal: 10,
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
});

export default Tab1;
