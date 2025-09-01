// OTPPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Arrowback } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';
import { Loading } from '../../components';

const { height } = Dimensions.get('window');

export const OTPPage = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<any[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (enteredOtp === '1234') {
        navigation.navigate('dashboard'); // navigate to your next page
      } else {
        alert('Incorrect OTP');
      }
    }, 1500); // simulate loading for 1.5s
  };

  const handleResend = () => {
    console.log('Resend code');
    setTimer(60);
    setCanResend(false);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrowback />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter OTP Code</Text>
      </View>

      {/* Center content */}
      <View style={styles.centerContent}>
        <View style={styles.infoBox}>
          <Text style={styles.subTitle}>
            Code has been sent to <Text style={styles.phone}>{phoneNumber}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (inputsRef.current[index] = el)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, index)}
              />
            ))}
          </View>

          <TouchableOpacity disabled={!canResend} onPress={handleResend}>
            <Text style={[styles.resendText, canResend && styles.resendActive]}>
              {canResend ? 'Resend Code' : 'Resend code in '}
              {!canResend && <Text style={styles.timer}>{timer} s</Text>}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Button at bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: isOtpComplete ? '#31C48D' : '#a5d6a7' }
          ]}
          onPress={handleVerify}
          disabled={!isOtpComplete}
        >
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* Loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Loading />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: moderateScale(20), marginBottom: moderateScale(20), alignSelf: 'center', paddingTop: moderateScale(54) },
  headerTitle: { fontSize: moderateScale(22), fontWeight: 'bold', marginLeft: 10, color: 'black' },

  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoBox: { alignItems: 'center' },
  subTitle: { fontSize: moderateScale(22), marginBottom: moderateScale(155), textAlign: 'center', color: 'black' },
  phone: { fontWeight: 'bold' },

  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 28 },
  otpInput: { width: moderateScale(70), height: moderateScale(70), borderWidth: 1, borderColor: '#a5d6a7', borderRadius: moderateScale(10), textAlign: 'center', fontSize: moderateScale(20) },

  resendText: { fontSize: moderateScale(22), marginTop: moderateScale(10), color: 'black' },
  resendActive: { color: '#31C48D', fontWeight: 'bold', textDecorationLine: 'underline' },
  timer: { color: '#31C48D', fontWeight: 'bold' },

  bottomButtonContainer: { paddingBottom: moderateScale(40), alignItems: 'center' },
  verifyButton: { paddingVertical: moderateScale(15), paddingHorizontal: moderateScale(150), borderRadius: moderateScale(30) },
  verifyText: { color: '#fff', fontSize: moderateScale(16), fontWeight: 'bold' },

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

