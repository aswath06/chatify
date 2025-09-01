import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import React from 'react';
import { moderateScale } from '../../utils/scalingUtils';

type ChatItemProps = {
  image: string; // URL of the image
  name: string;
  email: string;
  time: string;
};

export const ChatItem: React.FC<ChatItemProps> = ({ image, name, email, time }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginRight: moderateScale(15),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: 'black',
  },
  time: {
    fontSize: moderateScale(12),
    color: '#888',
  },
  email: {
    fontSize: moderateScale(14),
    color: '#555',
    marginTop: moderateScale(2),
  },
});
