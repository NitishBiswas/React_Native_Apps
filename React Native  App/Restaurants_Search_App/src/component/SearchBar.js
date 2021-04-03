import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({text, setText, endEditing}) => {
  return (
    <View style={styles.barStyle}>
      <FontAwesome name="search" style={styles.iconStyle} />
      <TextInput
        placeholder="Search"
        autoCorrect={false}
        style={styles.textInputStyle}
        placeholderTextColor="#000"
        onChangeText={setText}
        value={text}
        onEndEditing={endEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    height: 50,
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 6,
  },
  iconStyle: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 20,
  },
});

export default SearchBar;
