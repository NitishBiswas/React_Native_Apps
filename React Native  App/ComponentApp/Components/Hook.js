import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
const Hook = () => {
  const [stateN, setStateN] = useState();
  return (
    <View>
      <Text>{stateN}</Text>
      <TextInput
        placeholder={'Enter update state'}
        onChangeText={(text) => {
          setStateN(text);
        }}
      />
      <Button
        title="Update"
        onPress={() => {
          alert(stateN);
        }}
      />
    </View>
  );
};

export default Hook;
