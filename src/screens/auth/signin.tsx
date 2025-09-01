import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Logo } from '../../assets/icons'
import { moderateScale } from '../../utils/scalingUtils'

export const Signin =()=> {
  return (
    <SafeAreaView style={styles.container}>
        <Logo/>
        <Text style={styles.heading}>Sign in to your Account</Text>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   container:{
    flex: 1,
        paddingTop:moderateScale(203),
        alignItems: 'center',   
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'white',
   } ,
   heading:{
    color:'black',
    fontSize:moderateScale(22),
    fontWeight:'bold',
    marginTop:moderateScale(85)

   }
})