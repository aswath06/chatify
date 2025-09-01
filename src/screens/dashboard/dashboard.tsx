import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Heading } from '../../components'
import { moderateScale } from '../../utils/scalingUtils'

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Chats');

  const tabs = ['Chats', 'Groups', 'Status', 'Calls'];

  return (
    <SafeAreaView style={styles.container}>
      <Heading />
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <View style={styles.tabItem}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeLine} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    paddingTop: moderateScale(40),
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: moderateScale(60),
    marginTop: moderateScale(20),
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: 'black',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  activeTab: {
    color: '#07DC8A',
  },
  activeLine: {
    height: 2,
    backgroundColor: '#07DC8A',
    width: '100%',
    marginTop: moderateScale(4),
    borderRadius: 1,
  },
})
