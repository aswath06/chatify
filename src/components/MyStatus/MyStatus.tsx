import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { Addicon } from '../../assets/icons';

export const MyStatus = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.plusIcon}>
          <Addicon/>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>My Status</Text>
        <Text style={styles.subtitle}>Tap to add Status update</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#07DC8A',
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  textWrapper: {
    marginLeft: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: 'gray',
  },
});
