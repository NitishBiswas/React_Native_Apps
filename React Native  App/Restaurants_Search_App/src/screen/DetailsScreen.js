import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import rest from '../api/rest';

const DetailsScreen = ({route}) => {
  const [result, setResult] = useState(null);
  const id = route.params.id;
  const getDetails = async () => {
    const response = await rest.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getDetails(id);
  }, []);
  if (!result) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{result.name}</Text>
      <Text style={styles.text}>
        {result.rating} stars, {result.review_count} reviews
      </Text>
      <FlatList
        data={result.photos}
        keyExtractor={item => item}
        renderItem={({item}) => {
          return <Image style={styles.image} source={{uri: item}} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde3e3',
    flex: 1,
  },
  name: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
  image: {
    height: 250,
    width: 390,
    marginVertical: 5,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fd499e',
  },
});

export default DetailsScreen;
