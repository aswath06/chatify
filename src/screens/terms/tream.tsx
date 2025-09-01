import { ScrollView, StyleSheet, Text, SafeAreaView, View, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Arrowback } from '../../assets/icons';
import { moderateScale } from '../../utils/scalingUtils';

export const Tream = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Arrowback/>
        </TouchableOpacity>
        <Text style={styles.text}>Privacy Policy</Text>
        </View>
        <View style={styles.line}/>
        <ScrollView contentContainerStyle ={ styles.pargagap}>
        <Text style={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        <Text style={styles.para}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: moderateScale(20),
    paddingTop: moderateScale(41),
  },
  text: {
    fontSize: moderateScale(22),
    fontWeight:'800',
    color:'black',
  },
  heading:{
    flexDirection:'row',
    alignItems:'center',
    gap:moderateScale(13)
  },
  para:{
    color :'black',
    fontSize:moderateScale(20)

  },
  pargagap:{
    gap:moderateScale(20),
  },
  line:{
    height:moderateScale(1),
    marginVertical:moderateScale(6),
    backgroundColor: '#000000',

  }
});
