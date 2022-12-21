/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Card } from 'react-native-paper';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Card style={
        {
          width: 300,
          height: 50,
          padding: 10,
          justifyContent: 'center',
          position: 'absolute',
          top: 50,
          end: 0
        }}>
        <Text>I would like to be end-aligned!</Text>
      </Card>
    </View>
  );
};

export default App;
