import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { Righticon } from '../../assets/icons';

type ListRowProps = {
  icon: React.ReactNode; // pass icon component
  heading: string;
  onPress?: () => void;
  showArrow?: boolean; // optional, default true
  iconBackgroundColor?: string; // optional, default #E7F9F2
};

export const ListRow: React.FC<ListRowProps> = ({
  icon,
  heading,
  onPress,
  showArrow = true,
  iconBackgroundColor = '#E7F9F2',
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>
          {icon}
        </View>
        <Text style={styles.heading}>{heading}</Text>
      </View>
      {showArrow && <Righticon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEF2',
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  icon: {
    height: moderateScale(56),
    width: moderateScale(56),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
  },
  heading: {
    fontSize: moderateScale(16),
    color: 'black',
    fontWeight: '500',
  },
});
