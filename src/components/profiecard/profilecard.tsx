import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { Addicon, Editicon, QrcodeIcon, Searchicon } from '../../assets/icons';

type ProfileCardProps = {
  name: string;
  email: string; // replaced phone with email
  image: string; // URL string
  onEditPress?: () => void;
  onQRPress?: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  image,
  onEditPress,
  onQRPress,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: image }} style={styles.profileImage} />
        {onEditPress && (
          <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
            <Editicon width={moderateScale(20)} height={moderateScale(20)} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.status}>Available</Text> 
      </View>

      {onQRPress && (
        <TouchableOpacity style={styles.qrIcon} onPress={onQRPress}>
          <QrcodeIcon width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    backgroundColor: '#07DC8A',
    borderRadius: moderateScale(20),
    padding: moderateScale(2),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: moderateScale(15),
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: moderateScale(14),
    color: '#555',
    marginTop: moderateScale(2),
  },
  status: {
    fontSize: moderateScale(14),
    color: '#07DC8A',
    marginTop: moderateScale(2),
  },
  qrIcon: {
    marginLeft: moderateScale(10),
  },
});
