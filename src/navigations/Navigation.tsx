import React from 'react';
// Packages
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GetStarted } from '../screens';
// Screens

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Getsatrted">
        <RootStack.Screen name="Getsatrted" component={GetStarted} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};