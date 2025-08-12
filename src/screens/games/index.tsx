//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultScreenStyle } from '../../styles/defaultScreenStyle';

// create a component
const Games: React.FC = () => {
  return (
    <View style={defaultScreenStyle.container}>
      <Text>Games</Text>
    </View>
  );
};

//make this component available to the app
export default Games;
