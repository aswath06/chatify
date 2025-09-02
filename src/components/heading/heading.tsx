import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { MoreIcon, Searchicon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

export const Heading = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Left: Title */}
      <Text style={styles.title}>Chatify</Text>

      {/* Right: Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Searchicon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('SettingPage')}
        >
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
    paddingVertical: moderateScale(10),
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
