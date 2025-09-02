import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { Logo, Phoneicon } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { InputBox, Loading } from '../../components';
import axios from 'axios';
import { useUserStore } from '../../store/useUserStore';
import { BASE_URL } from '../../config/apiConfig';

export const Signup = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const handleSignup = async () => {
  if (!name || !username || !email) {
    return Alert.alert('Error', 'Please fill all fields.');
  }

  setIsLoading(true);

  try {
    // 1️⃣ Signup request
    const response = await axios.post(`${BASE_URL}/users`, {
      name,
      email,
      username,
      profileImg: 'https://example.com/profile.jpg',
      dateOfBirth: '2000-01-01',
    });

    // Save user in Zustand
    setUser(response.data);

    // 2️⃣ Trigger email verification
    await axios.post(`${BASE_URL}/users/verify-email`, {
      email: email.trim(),
    });

    setIsLoading(false);

    // Navigate to OTP page
    navigation.navigate('otp', { phoneNumber: email.trim() });
  } catch (error: any) {
    setIsLoading(false);
    Alert.alert('Signup Failed', error.response?.data?.error || error.message);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.heading}>Sign up for free</Text>

      <InputBox
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        width="90%"
        height={50}
      >
        <Phoneicon />
      </InputBox>

      <InputBox
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        width="90%"
        height={50}
      >
        <Phoneicon />
      </InputBox>

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

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Did you have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signupButtonText}>Sign in</Text>
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
  container: {
    flex: 1,
    paddingTop: moderateScale(60),
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginTop: moderateScale(85),
    marginBottom: moderateScale(53),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20),
    width: '90%',
  },
  rememberText: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: 'black',
  },
  button: {
    marginTop: moderateScale(30),
    backgroundColor: '#31C48D',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(150),
    borderRadius: moderateScale(24),
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(32),
    alignItems: 'center',
  },
  signupText: {
    fontSize: moderateScale(16),
    color: 'black',
  },
  signupButtonText: {
    fontSize: moderateScale(16),
    color: '#31C48D',
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
