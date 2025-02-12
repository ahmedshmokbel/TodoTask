import { View, Text } from 'react-native';
import React from 'react';
import IconsComponent from '../layout/IconsComponent';

const NoSearchResults = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IconsComponent name="Search" color={'#C2C7CC'} size={50}   />
      <Text style={{ fontSize: 18, color: 'black', marginBottom: 10, textAlign: 'center' }} >
        No results found.
      </Text>
      {props.seachOrEmpty === 'noSearch' &&
        <Text style={{ maxWidth: '60%', fontSize: 16, color: 'black', textAlign: 'center' }}>
          Try changing the search term.
        </Text>}
    </View>
  );
};

export default NoSearchResults;
