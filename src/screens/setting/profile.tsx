import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Arrowback, Editicon, MoreIcon, Shareicon } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getUser, storeUser } from '../../store/storage';
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';
import * as ImagePicker from 'react-native-image-picker';

export const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [profileImg, setProfileImg] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setOriginalUser(user);
        setName(user.name || '');
        setUsername(user.username || '');
        setEmail(user.email || '');
        setProfileImg(formatImageUrl(user.profileImg));
        setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth) : new Date());
      }
    };
    fetchUser();
  }, []);

  const formatImageUrl = (uri: string) => {
    if (!uri) return '';
    return uri.startsWith('http') ? uri : `${BASE_URL}/${uri.replace(/^\/?/, '')}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDateOfBirth(selectedDate);
  };

  const isModified = () => {
    if (!originalUser) return false;
    return (
      name !== originalUser.name ||
      username !== originalUser.username ||
      email !== originalUser.email ||
      dateOfBirth.toISOString() !== new Date(originalUser.dateOfBirth).toISOString() ||
      profileImg !== formatImageUrl(originalUser.profileImg)
    );
  };

  // ---------------- Image Picker ---------------- //
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', maxWidth: 500, maxHeight: 500, quality: 0.7 },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          alert('Error picking image: ' + response.errorMessage);
          return;
        }

        const asset = response.assets?.[0];
        if (!asset) return;

        // Preview locally
        setProfileImg(asset.uri);

        // Upload immediately
        await uploadProfile({ uri: asset.uri, type: asset.type, name: asset.fileName });
      }
    );
  };

  const uploadProfile = async (image?) => {
    if (!originalUser) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth.toISOString());

    if (image) {
      formData.append('profileImg', image);
    }

    try {
      setUploading(true);
      const res = await axios.put(`${BASE_URL}/users/${originalUser.userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updatedUser = res.data;
      setOriginalUser(updatedUser);
      setProfileImg(formatImageUrl(updatedUser.profileImg));
      await storeUser(updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    // If profileImg is local URI, send it; else just send form data
    let image;
    if (profileImg && !profileImg.startsWith('http')) {
      const filename = profileImg.split('/').pop();
      image = { uri: profileImg, type: 'image/jpeg', name: filename };
    }
    await uploadProfile(image);
  };

  const handleCancel = () => {
    if (originalUser) {
      setName(originalUser.name);
      setUsername(originalUser.username);
      setEmail(originalUser.email);
      setDateOfBirth(new Date(originalUser.dateOfBirth));
      setProfileImg(formatImageUrl(originalUser.profileImg));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(80) }}>
        {/* Appbar */}
        <View style={styles.appbarjus}>
          <View style={styles.appbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Arrowback />
            </TouchableOpacity>
            <Text style={styles.headingtext}>Profile</Text>
          </View>
          <View style={styles.icons}>
            <View style={styles.imagecon}>
              <Shareicon />
            </View>
            <View style={styles.imagecon}>
              <MoreIcon color='#10C17D'/>
            </View>
          </View>
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: profileImg || 'https://lh3.googleusercontent.com/a/ACg8ocJUDVcUKiE7vKDEZiBiHdfVkEa8dPU1vioE9hyLdZMQevYJ-eoK=s192-c' }} 
            style={styles.image} 
          />
          <TouchableOpacity style={styles.editIconContainer} onPress={pickImage}>
            <Editicon />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <View style={{ marginBottom: moderateScale(16) }}>
            <Text style={styles.label}>Name <Text style={styles.asterisk}>*</Text></Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
          </View>

          <View style={{ marginBottom: moderateScale(16) }}>
            <Text style={styles.label}>Username <Text style={styles.asterisk}>*</Text></Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter your username" />
          </View>

          <View style={{ marginBottom: moderateScale(16) }}>
            <Text style={styles.label}>Email <Text style={styles.asterisk}>*</Text></Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Enter your email" />
          </View>

          <View style={{ marginBottom: moderateScale(16) }}>
            <Text style={styles.label}>Date of Birth <Text style={styles.asterisk}>*</Text></Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{dateOfBirth.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>

          {isModified() && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={uploading}>
                <Text style={styles.buttonText1}>{uploading ? 'Uploading...' : 'Update'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: moderateScale(50) },
  imageContainer: { marginVertical: moderateScale(20), alignItems:'center', justifyContent:'center' },
  image: { width: moderateScale(150), height: moderateScale(150), borderRadius: moderateScale(53) },
  editIconContainer: { position: 'absolute', bottom: 0, right: moderateScale(120), backgroundColor: '#31C48D', borderRadius: moderateScale(16), padding: moderateScale(6), alignItems: 'center', justifyContent: 'center' },
  appbar: { flexDirection: 'row', alignItems: 'center', gap: moderateScale(25) },
  headingtext: { fontSize: moderateScale(26), fontWeight: '700', color: 'black' },
  icons: { flexDirection:'row', gap:moderateScale(16) },
  imagecon: { backgroundColor:'#E1F4F2', borderRadius:moderateScale(12), width:moderateScale(40), height:moderateScale(40), alignItems:'center', justifyContent:'center' },
  appbarjus: { flexDirection:'row', justifyContent:'space-between', paddingHorizontal: moderateScale(20) },
  form: { paddingHorizontal: moderateScale(20), marginTop: moderateScale(20) },
  label: { fontSize: moderateScale(16), fontWeight: '600', marginBottom: moderateScale(8), color:'black' },
  input: { backgroundColor: '#F2F2F2', borderRadius: moderateScale(12), paddingHorizontal: moderateScale(12), paddingVertical: moderateScale(14), fontSize: moderateScale(16), marginBottom: moderateScale(16), color:'black' },
  asterisk: { color: 'red' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: moderateScale(20) },
  updateButton: { backgroundColor: '#10C17D', padding: moderateScale(14), borderRadius: moderateScale(12), flex: 1, marginLeft: moderateScale(8) },
  cancelButton: { backgroundColor: 'white', padding: moderateScale(14), borderRadius: moderateScale(12), flex: 1, marginRight: moderateScale(8), borderColor:"#10C17D", borderWidth:moderateScale(1)},
  buttonText: { color: 'black', fontWeight: '600', textAlign: 'center', fontSize:moderateScale(18)},
  buttonText1:{ color: 'white', fontWeight: '600', textAlign: 'center' ,fontSize:moderateScale(18)},
});
