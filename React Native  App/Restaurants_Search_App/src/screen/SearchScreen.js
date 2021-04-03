import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import SearchBar from '../component/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../component/ResultsList';

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#fd499e" />
      <SearchBar
        text={term}
        setText={setTerm}
        endEditing={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          navigation={navigation}
          title="Low Price"
          result={filterResultByPrice('$')}
        />
        <ResultsList
          navigation={navigation}
          title="Medium Price"
          result={filterResultByPrice('$$')}
        />
        <ResultsList
          navigation={navigation}
          title="High Price"
          result={filterResultByPrice('$$$')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde3e3',
    flex: 1,
  },
});

export default SearchScreen;
