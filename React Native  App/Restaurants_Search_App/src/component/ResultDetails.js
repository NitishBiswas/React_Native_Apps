import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const ResultDetails = ({results}) => {
  return(
    <View style={styles.container}>
      <Image source={{uri: results.image_url}} style={styles.image} />
      <Text style={styles.name}>{results.name}</Text>
      <Text style={styles.text}>{results.rating} stars, {results.review_count} reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#fd499e',
  },
  image: {
    height: 140,
    width: 250,
    marginBottom: 7,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
  }
});

export default ResultDetails;
