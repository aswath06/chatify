import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Arrowback, Chaticon, HelpIcon, LogoutIcon, NotificationIcon, PersonIcon, Phoneicon, SecurityIcon } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { getUser, removeUser } from '../../store/storage';
import { ProfileCard } from '../../components/profiecard';
import { ListRow } from '../../components';

type UserType = {
  name: string;
  email: string;
  profileImg: string;
};

const SettingPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser({
          name: storedUser.username,
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

const handleLogoutConfirm = async () => {
  try {
    await removeUser(); // remove user from AsyncStorage
    setLogoutModalVisible(false);

    // Navigate in the next frame to avoid updating navigation during render
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }], // your Welcome screen
      });
    }, 0);

    Alert.alert('Logged out successfully!');
  } catch (error) {
    console.error('Error logging out:', error);
    Alert.alert('Error logging out. Please try again.');
  }
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
        onQRPress={handleQRPress}
        onTextPress={() => navigation.navigate('Profile')} // <-- fix here
    onAvatarPress={() => console.log('Avatar pressed')} // optional
      />

      <View style={styles.line} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ListRow
          icon={<PersonIcon />}
          heading="Account"
          onPress={() => console.log('Account pressed')}
        />
        <ListRow
          icon={<Chaticon />}
          heading="Chat"
          onPress={() => console.log('Chat pressed')}
        />
        <ListRow
          icon={<NotificationIcon />}
          heading="Notification"
          onPress={() => console.log('Notification pressed')}
        />
        <ListRow
          icon={<SecurityIcon />}
          heading="Security"
          onPress={() => console.log('Security pressed')}
        />
        <ListRow
          icon={<HelpIcon />}
          heading="Help"
          onPress={() => console.log('Help pressed')}
        />
        <ListRow
          icon={<LogoutIcon />}
          heading="Logout"
          onPress={() => setLogoutModalVisible(true)}
          showArrow={false}
          iconBackgroundColor="#FFE8EC"
        />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
  visible={logoutModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setLogoutModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Are you sure you want to logout?</Text>

      <View style={styles.modalButtonRow}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: 'white',borderColor:'#31C48D' ,borderWidth:moderateScale(1)}]}
          onPress={() => setLogoutModalVisible(false)}
        >
          <Text style={styles.cancelbutton}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: '#31C48D' }]}
          onPress={handleLogoutConfirm}
        >
          <Text style={[styles.modalButtonText, { color: 'white' }]}>Yes, Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
modalContainer: {
  height: moderateScale(219),
  backgroundColor: 'white',
  borderTopLeftRadius: moderateScale(50),
  borderTopRightRadius: moderateScale(50),
  paddingHorizontal: moderateScale(20),
  paddingTop: moderateScale(50),
  alignItems: 'center',
},
modalText: {
  fontSize: moderateScale(18),
  fontWeight: '500',
  textAlign: 'center',
  marginBottom: moderateScale(30),
},
modalButtonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: moderateScale(20),
},
modalButton: {
  width: moderateScale(140),
  height: moderateScale(50),
  borderRadius: moderateScale(30),
  justifyContent: 'center',
  alignItems: 'center',
},
modalButtonText: {
  fontSize: moderateScale(16),
  fontWeight: '600',
  color: '#31C48D',
},
cancelbutton: {
  fontSize: moderateScale(16),
  fontWeight: '600',
  color: '#31C48D',
  backgroundColor:'white'
},

});
