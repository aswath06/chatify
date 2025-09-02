import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ChatItem, Heading, MyStatus, StatusItem } from '../../components';
import { moderateScale } from '../../utils/scalingUtils';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Chats');

  const tabs = ['Chats', 'Groups', 'Status', 'Calls' ,'All users' ];

  const chatData = [
    {
      id: '1',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'John Doe',
      email: 'john.doe@example.com',
      time: '10:30 AM',
      group: false,
    },
    {
      id: '2',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      time: '9:45 AM',
      group: true,
    },
  ];

  const statusChatData = [
    {
      id: '1',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Bhola Record',
      time: '15 minutes ago',
      seen: true,
    },
    {
      id: '2',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Alice Brown',
      time: '30 minutes ago',
      seen: false,
    },
    {
      id: '3',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocJUDVcUKiE7vKDEZiBiHdfVkEa8dPU1vioE9hyLdZMQevYJ-eoK=s576-c-no',
      name: 'Charlie Smith',
      time: '1 hour ago',
      seen: true,
    },
  ];

  // Filter chats based on the active tab
  const filteredChats = chatData.filter((item) => {
    if (activeTab === 'Chats') return !item.group;
    if (activeTab === 'Groups') return item.group;
    return true;
  });

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

      <View style={styles.chathist}>
        {activeTab !== 'Status' && (
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatItem
                image={item.image}
                name={item.name}
                email={item.email}
                time={item.time}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: moderateScale(20) }} />}
          />
        )}

    {activeTab === 'Status' && (
  <>
    <MyStatus
      image="https://randomuser.me/api/portraits/men/1.jpg"
      onPress={() => console.log('Add status')}
    />

    {/* Recent Updates */}
    {statusChatData.some(item => item.seen) && (
      <>
        <Text style={styles.subtitte}>Recent Updates</Text>
        <FlatList
          data={statusChatData.filter(item => item.seen)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StatusItem
              image={item.image}
              name={item.name}
              time={item.time}
              seen={item.seen}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: moderateScale(15) }} />}
        />
      </>
    )}

    {/* Viewed Updates */}
    {statusChatData.some(item => !item.seen) && (
      <>
        <Text style={styles.subtitte}>Viewed Updates</Text>
        <FlatList
          data={statusChatData.filter(item => !item.seen)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StatusItem
              image={item.image}
              name={item.name}
              time={item.time}
              seen={item.seen}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: moderateScale(15) }} />}
        />
      </>
    )}
  </>
)}


      </View>
    </SafeAreaView>
  );
};

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
    gap: moderateScale(30),
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
  chathist: {
    marginTop: moderateScale(41),
  },
  subtitte: {
    fontSize: moderateScale(19),
    paddingVertical: moderateScale(6),
    fontWeight: 'bold',
  },
});
