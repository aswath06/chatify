import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../assets/icons';

export const GetStarted = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('dashboard'); // Navigate to Welcome after 1 second
    }, 1000); // 1000ms = 1 sec

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo />
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
