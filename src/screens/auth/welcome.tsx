import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Logo } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';

export const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo centered */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <Text style={styles.title}>Welcome to Chatify</Text>

      <Text style={styles.subtitle}>
        Read our{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('term')}>
          Privacy Policy
        </Text>
        {'. Tap “Agree and Continue” to accept '}
        <Text style={styles.link} onPress={() => navigation.navigate('privacy')}>
          Terms and Services
        </Text>
        {'.'}
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Signin')}
      >
        <Text style={styles.buttonText}>Agree and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // vertical centering
    paddingTop:moderateScale(359),
    alignItems: 'center',     // horizontal centering
    paddingHorizontal: moderateScale(20),
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(20), // spacing below logo
  },
  title: {
    color: 'black',
    marginTop: moderateScale(20),
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    marginTop: moderateScale(12),
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginBottom:moderateScale(30),
  },
  button: {
    marginTop: moderateScale(30),
    backgroundColor: '#31C48D',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(100),
    borderRadius: moderateScale(24),
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});
