import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/loadingloti.json')} // update path if needed
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60, // space from top
  },
  lottie: {
    width: 174,
    height: 161,
  },
});
