import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultDetails from './ResultDetails';

const ResultsList = ({title, result, navigation}) => {
  if (!result.length) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal={true}
        data={result}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id})}>
              <ResultDetails results={item} />
            </TouchableOpacity>
            )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 7,
  },
});
export default ResultsList;
