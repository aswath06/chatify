import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Logo } from '../../assets/icons';

export const GetStarted = () => {
  return (
    <View style={styles.container}>
      <Text>Get Started</Text>
      <Logo/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
