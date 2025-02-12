import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator, navigationRef } from './appNavigator';
import { View, StyleSheet, Text, SafeAreaView, } from 'react-native';


export default function AppContainer() {
const [isLoggedIn, setisLoggedIn] = useState(true);

  return (
    <NavigationContainer ref={navigationRef} >
        
      {isLoggedIn ? (
        // showAppNavigator ?
        <AppNavigator navigation={navigationRef} />

      ) : (
        <View>
          <Text>Login Screen</Text>
        </View>
      )}
      
    </NavigationContainer>
  );
}
