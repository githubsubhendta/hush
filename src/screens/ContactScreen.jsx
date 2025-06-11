

import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const chatData = [
  {
    id: '1',
    name: 'User_1234',
    message: 'Thank you so much, bro! It really means a lot t...',
    time: 'Just now',
    unread: true,
    avatarColor: '#FFA07A',
  },
  {
    id: '2',
    name: 'breen mint',
    message: '9 new messages',
    time: '2m ago',
    unread: true,
    avatarColor: '#87CEFA',
  },
  {
    id: '3',
    name: 'swan_official18906',
    message: 'Helooo how you doingggg',
    time: '10m ago',
    unread: false,
    avatarColor: '#FFB6C1',
  },
  {
    id: '4',
    name: 'User_1234',
    message: 'Thank you bro means a lot to me as a person wh...',
    time: '12m ago',
    unread: false,
    avatarColor: '#98FB98',
  },
  {
    id: '5',
    name: 'cyan blackbird',
    message: 'make some noise',
    time: '3d ago',
    unread: false,
    avatarColor: '#FFA500',
  },
  {
    id: '6',
    name: 'swan_official18906',
    message: 'Helooo how you doingggg',
    time: '3d ago',
    unread: true,
    avatarColor: '#BA55D3',
  },
  {
    id: '7',
    name: 'swan_official18906',
    message: 'Helooo how you doingggg',
    time: '3d ago',
    unread: true,
    avatarColor: '#BA55D3',
  },
  {
    id: '8',
    name: 'swan_official18906',
    message: 'Helooo how you doingggg',
    time: '3d ago',
    unread: true,
    avatarColor: '#BA55D3',
  },
  {
    id: '9',
    name: 'swan_official18906',
    message: 'Helooo how you doingggg',
    time: '3d ago',
    unread: true,
    avatarColor: '#BA55D3',
  },
];

export default function ChatScreen() {
  const {isDarkModeOn} = useTheme();
  const [selectedTab, setSelectedTab] = useState('General');
  const [search, setSearch] = useState('');
  const [favoriteUsers, setFavoriteUsers] = useState([]); // ⭐ FAVORITES state

  const containerStyle = {
    backgroundColor: isDarkModeOn ? '#030303' : '#FFFFFF',
    tabBackgroundColor: isDarkModeOn ? '#FFFFFF' : '#392EBD',
    tabInactiveBackgroundColor: isDarkModeOn ? '#191919' : '#F7F7F7',
    tabTextColor: isDarkModeOn ? '#FFFFFF' : '#000',
    tabTextActiveColor: isDarkModeOn ? '#000' : '#FFFFFF',
    userTextColor: isDarkModeOn ? '#FFFFFF' : '#000',
  };

  // ⭐ Toggle Favorite Function
  const toggleFavorite = userId => {
    setFavoriteUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  // ⭐ Filter Chat Data
  const filteredChatData = chatData.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    if (selectedTab === 'Favorites') {
      return favoriteUsers.includes(item.id) && matchesSearch;
    } else {
      return matchesSearch;
    }
  });

  // ⭐ Render Chat Item with Favorite Button
  const renderChatItem = ({item}) => {
    const isFavorite = favoriteUsers.includes(item.id);

    return (
      <View style={styles.chatItem}>
        <View style={[styles.avatar, {backgroundColor: item.avatarColor}]} />
        <View style={styles.chatTextContainer}>
          <View style={styles.chatHeader}>
            <Text
              style={[styles.chatName, {color: containerStyle.userTextColor}]}>
              {item.name}
            </Text>
            {item.unread && <View style={styles.redDot} />}
          </View>

          <Text
            style={[styles.chatMessage, {color: containerStyle.userTextColor}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.message}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.chatTime}>{item.time}</Text>
          {/* Favorite Button */}
          {/* <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            style={styles.favoriteButton}>
            <Text style={{fontSize: 18}}>
              {isFavorite ? '💛' : '🤍'}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: containerStyle.backgroundColor},
      ]}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: containerStyle.backgroundColor},
          ]}>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for Messages"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    selectedTab === 'General'
                      ? containerStyle.tabBackgroundColor
                      : containerStyle.tabInactiveBackgroundColor,
                },
              ]}
              onPress={() => setSelectedTab('General')}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab === 'General'
                        ? containerStyle.tabTextActiveColor
                        : containerStyle.tabTextColor,
                  },
                ]}>
                General
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    selectedTab === 'Favorites'
                      ? containerStyle.tabBackgroundColor
                      : containerStyle.tabInactiveBackgroundColor,
                },
              ]}
              onPress={() => setSelectedTab('Favorites')}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab === 'Favorites'
                        ? containerStyle.tabTextActiveColor
                        : containerStyle.tabTextColor,
                  },
                ]}>
                Favorites
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <FlatList
              data={filteredChatData}
              keyExtractor={item => item.id}
              renderItem={renderChatItem}
              contentContainerStyle={[
                styles.chatList,
                filteredChatData.length === 0 && {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text style={styles.noUserText}>No user found</Text>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    height: SCREEN_HEIGHT * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  noUserText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'start',
    marginTop: 0,
  },

  tabContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '700',
    fontSize: 14,
  },
  chatList: {
    paddingBottom: SCREEN_HEIGHT * 0.1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  chatMessage: {
    fontSize: 10,
    flexShrink: 1,
  },
  chatTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-start',
  },
  favoriteButton: {
    marginTop: 8,
  },
});
