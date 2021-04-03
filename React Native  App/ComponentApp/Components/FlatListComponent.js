import React from 'react';
import {View, Text, FlatList} from 'react-native';

class FlatListComponent extends React.Component() {
  MyData = [
    {title: 'Bangladesh', subtitle: 'This is a country name...'},
    {title: 'India', subtitle: 'This is a country name...'},
    {title: 'Canada', subtitle: 'This is a country name...'},
    {title: 'America', subtitle: 'This is a country name...'},
    {title: 'Japan', subtitle: 'This is a country name...'},
    {title: 'Bhutan', subtitle: 'This is a country name...'},
    {title: 'Malaysia', subtitle: 'This is a country name...'},
    {title: 'Spain', subtitle: 'This is a country name...'},
    {title: 'France', subtitle: 'This is a country name...'},
    {title: 'Italy', subtitle: 'This is a country name...'},
    {title: 'England', subtitle: 'This is a country name...'},
    {title: 'German', subtitle: 'This is a country name...'},
    {title: 'Portugal', subtitle: 'This is a country name...'},
  ];
  ChildView = ({ChildTitle, ChildSubtitle}) => {
    return (
      <View style={{backgroundColor: 'white', padding: 10, margin: 7}}>
        <Text style={{color: 'red', fontSize: 25}}>{ChildTitle}</Text>
        <Text style={{color: 'black', fontSize: 20}}>{ChildSubtitle}</Text>
      </View>
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.MyData}
          renderItem={({item}) => (
            <this.ChildView
              ChildTitle={item.title}
              ChildSubtitle={item.subtitle}
            />
          )}
        />
      </View>
    );
  }
}

export default FlatListComponent;
