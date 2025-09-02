import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Arrowback } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { getUser } from '../../store/storage';
import { ProfileCard } from '../../components/profiecard';

type UserType = {
  name: string;
  email: string;
  profileImg: string;
};

const SettingPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser({
          name: storedUser.name,
          email: storedUser.email,
          profileImg: storedUser.profileImg,
        });
      }
    };
    fetchUser();
  }, []);

  const handleEditPress = () => {
    Alert.alert('Edit button pressed!');
  };

  const handleQRPress = () => {
    Alert.alert('QR button pressed!');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.heading}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.heading}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrowback />
        </TouchableOpacity>
        <Text style={styles.headingtext}>Settings</Text>
      </View>

      <View style={styles.line} />

      <ProfileCard
        name={user.name}
        email={user.email}
        image={user.profileImg}
        onEditPress={handleEditPress}
        onQRPress={handleQRPress}
      />

      <View style={styles.line} />
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    padding: moderateScale(20),
    paddingTop: moderateScale(47),
    backgroundColor: 'white',
  },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(25),
  },
  headingtext: {
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: 'black',
  },
  line: {
    height: 1,
    backgroundColor: '#EBEEF2',
    marginVertical: moderateScale(24),
  },
});
