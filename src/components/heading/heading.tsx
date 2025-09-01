import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { moderateScale } from '../../utils/scalingUtils';
import { MoreIcon, Searchicon } from '../../assets/icons';

export const Heading = () => {
  return (
    <View style={styles.container}>
      {/* Left: Title */}
      <Text style={styles.title}>Chatify</Text>

      {/* Right: Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Searchicon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MoreIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: 'black',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: moderateScale(15),
  },
});
