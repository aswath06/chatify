import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';

export const StatusItem = ({ image, name, time, seen }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageWrapper,
          { borderColor: seen ? '#07DC8A' : 'transparent' },
        ]}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30),
  },
  textWrapper: {
    marginLeft: moderateScale(12),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    fontSize: moderateScale(14),
    color: 'gray',
  },
});
