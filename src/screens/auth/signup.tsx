import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Logo, Phoneicon } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { InputBox, Loading } from '../../components';

export const Signup = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    console.log('Phone Number:', email); // log phone number
    setIsLoading(true);

    // simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP page with phone number
      navigation.navigate('otp', { phoneNumber: email.trim() });
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.heading}>Sign up for free</Text>

      <InputBox
        label="Phone Number"
        placeholder="Phone number"
        value={email}
        onChangeText={setEmail}
        width="90%"
        height={50}
      >
        <Phoneicon />
      </InputBox>

      {/* Remember Me */}
      <View style={styles.rememberContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#ccc', true: '#31C48D' }}
          thumbColor="white"
        />
        <Text style={styles.rememberText}>Remember Me</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Sign In Text */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Did you have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signupButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Overlay */}
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
    paddingTop: moderateScale(203),
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
