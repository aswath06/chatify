import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Logo, Phoneicon } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { InputBox, Loading } from '../../components';
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';

export const Signin = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    if (!email) return; // stop if email is empty

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/users/verify-email`, { email });

      // Pass email to OTP page if API responds with success message
      if (response.status === 200 && response.data.message === 'OTP sent successfully') {
       navigation.navigate('otp', { phoneNumber: email });
      } else {
        console.log('Email verification failed:', response.data.message);
      }
    } catch (error: any) {
      console.error('Verify email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.heading}>Sign in to your Account</Text>

      <InputBox
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        width="90%"
        height={50}
      >
        <Phoneicon />
      </InputBox>

      <View style={styles.rememberContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#ccc', true: '#31C48D' }}
          thumbColor="white"
        />
        <Text style={styles.rememberText}>Remember Me</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Did you have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Loading />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: moderateScale(203), alignItems: 'center', paddingHorizontal: moderateScale(20), backgroundColor: 'white' },
  heading: { color: 'black', fontSize: moderateScale(22), fontWeight: 'bold', marginTop: moderateScale(85), marginBottom: moderateScale(53) },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20), width: '90%' },
  rememberText: { marginLeft: moderateScale(10), fontSize: moderateScale(16), color: 'black' },
  button: { marginTop: moderateScale(30), backgroundColor: '#31C48D', paddingVertical: moderateScale(12), paddingHorizontal: moderateScale(150), borderRadius: moderateScale(24) },
  buttonText: { color: 'white', fontSize: moderateScale(18), fontWeight: 'bold', textAlign: 'center' },
  signupContainer: { flexDirection: 'row', marginTop: moderateScale(32), alignItems: 'center' },
  signupText: { fontSize: moderateScale(16), color: 'black' },
  signupButtonText: { fontSize: moderateScale(16), color: '#31C48D', fontWeight: 'bold' },
  loadingOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
});
