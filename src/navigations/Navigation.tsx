import React, { useEffect, useState } from 'react';
// Packages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import { Dashboard, GetStarted, OTPPage, Privacy, Profile, profile, Signin, Signup, Tream, Welcome } from '../screens';
import SettingPage from '../screens/setting/settingpage';

const USER_KEY = 'user';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedUser) {
          setInitialRoute('Getsatrted'); // If user exists, go to dashboard
        } else {
          setInitialRoute('Welcome'); // Otherwise, show Welcome
        }
      } catch (error) {
        console.error('Error checking user:', error);
        setInitialRoute('Welcome');
      }
    };

    checkUser();
  }, []);

  // Wait for AsyncStorage check
  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialRoute}>
        <RootStack.Screen name="Getsatrted" component={GetStarted} options={{ headerShown: false }} />
        <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <RootStack.Screen name="privacy" component={Privacy}  options={{ headerShown: false }} />
        <RootStack.Screen name="term" component={Tream}  options={{ headerShown: false }} />
        <RootStack.Screen name="Signin" component={Signin}  options={{ headerShown: false }} />
        <RootStack.Screen name="Signup" component={Signup}  options={{ headerShown: false }} />
        <RootStack.Screen name="otp" component={OTPPage}  options={{ headerShown: false }} />
        <RootStack.Screen name="dashboard" component={Dashboard}  options={{ headerShown: false }} />
        <RootStack.Screen name="SettingPage" component={SettingPage}  options={{ headerShown: false }} />
         <RootStack.Screen name="Profile" component={Profile}  options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
