import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

import {goBack, navigate} from '../utils/NavigationUtil';

const {width, height} = Dimensions.get('window');
import {SvgXml} from 'react-native-svg';
import {
  arrow_svg,
  avatar_svg,
  back_arrow_svg,
  Selected_SVG,
  SVG_not_slected,
} from '../utils/constant/TabSVGimage';
import ChatRatingModal from '../components/ChatRatingModal';

const SettingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState({});

  const notifications = [
    'Poll',
    'Replies',
    'Sister Replies',
    'Likes',
    'Chat',
    'Local',
    'Groups',
    'School',
  ];

  const handleEditProfile = () => {
    navigate('EditUserProfile');
  };

  const profileOptions = [
    {name: 'Profile Details', screen: 'ProfileDetails'},
    {name: 'My Quids', screen: 'MyQuidsScreen'},
    {name: 'My Subscriptions', screen: 'MySubscriptionsScreen'},
    {name: 'Chat Votes', screen: 'ChatVotesScreen'},
    {name: 'App Language', screen: 'SelectLanguage'},
  ];

  const spreadWorld = [
    'Follow us on Instagram',
    'Follow us on Pintrest',
    'Follow us on Tik Tok',
    'Rate our app',
  ];
  const support = ['Email Support', 'FAQ', 'Terms of Use', 'Privacy Policy'];

  const toggleNotification = notif => {
    setSelectedNotifications(prev => ({
      ...prev,
      [notif]: !prev[notif],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <ImageBackground
          source={require('../images/headerBg.png')}
          resizeMode="cover">
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <SvgXml xml={back_arrow_svg} width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Setting</Text>
          </View>
        </ImageBackground>

        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.profileSection}>
              {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} /> */}
              <View style={styles.avatar}>
                <SvgXml xml={avatar_svg} width={80} height={80} />
              </View>

              <Text style={styles.username}>cyan_blackbird</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Edit Name</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>MY PROFILE</Text>
            <View style={styles.card}>
              {profileOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    if (option.name === 'Chat Votes') {
                      setModalVisible(true);
                    } else {
                      navigate(option.screen);
                    }
                  }}>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <SvgXml xml={arrow_svg} width={7.37} height={12} />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
            <View style={styles.card}>
              {notifications.map((notif, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.notificationItem}
                  onPress={() => toggleNotification(notif)}>
                  <Text style={styles.optionText}>{notif}</Text>
                  <SvgXml
                    xml={
                      selectedNotifications[notif]
                        ? Selected_SVG
                        : SVG_not_slected
                    }
                    width={16}
                    height={16}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>SPREAD THE WORLD</Text>
            <View style={styles.card}>
              {spreadWorld.map((spread, index) => (
                <View key={index} style={styles.notificationItem}>
                  <Text style={styles.optionText}>{spread}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>SUPPORT</Text>
            <View style={styles.card}>
              {support.map((supp, index) => (
                <View key={index} style={styles.notificationItem}>
                  <Text style={styles.optionText}>{supp}</Text>
                </View>
              ))}
            </View>

            <View style={styles.logo}>
              <Image
                source={require('../images/Hush.png')}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
            </View>
          </ScrollView>
          <ChatRatingModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            upVotes={1}
            downVotes={0}
            totalChats={5}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingHorizontal: width * 0.05,
  },
  background: {
    flex: 1,
  },
  header: {
    height: height * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === 'android' ? 20 : 40,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.25,
    height: width * 0.25,
    alignItems: 'center',
    borderRadius: width * 0.25,
    borderWidth: 0.3,
  },
  username: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#5A31F4',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    marginTop: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: width * 0.04,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    marginTop: height * 0.05,
    marginBottom: height * 0.015,
  },
  card: {
    borderRadius: 10,
    padding: width * 0.03,
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: width * 0.035,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default SettingScreen;
