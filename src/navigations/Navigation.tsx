import React from 'react';
// Packages
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Dashboard, GetStarted, OTPPage, Privacy, Signin, Signup, Tream, Welcome } from '../screens';

// Screens

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="dashboard">
        <RootStack.Screen name="Getsatrted" component={GetStarted} options={{ headerShown: false }} />
        <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <RootStack.Screen name="privacy" component={Privacy}  options={{ headerShown: false }} />
        <RootStack.Screen name="term" component={Tream}  options={{ headerShown: false }} />
        <RootStack.Screen name="Signin" component={Signin}  options={{ headerShown: false }} />
        <RootStack.Screen name="Signup" component={Signup}  options={{ headerShown: false }} />
        <RootStack.Screen name="otp" component={OTPPage}  options={{ headerShown: false }} />
        <RootStack.Screen name="dashboard" component={Dashboard}  options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};