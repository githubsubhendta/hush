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
  Pressable,
} from 'react-native';

import {goBack, navigate} from '../utils/NavigationUtil';

const {width, height} = Dimensions.get('window');
import {SvgXml} from 'react-native-svg';
import {
  arrow_svg,
  arrow_svg_white,
  avatar_svg,
  back_arrow_svg,
  Selected_SVG,
  Selected_Svg_dark,
  SVG_not_slected,
} from '../utils/constant/TabSVGimage';
import ChatRatingModal from '../components/ChatRatingModal';
import {useTheme} from '../context/ThemeContext';

const SettingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState({});
  const {isDarkModeOn} = useTheme();

  const backgroundColor = isDarkModeOn ? '#030303' : '#FFFFFF';
  const textColor = isDarkModeOn ? '#FFFFFF' : '#000000';
  const cardBackgroundColor = isDarkModeOn ? '#191919' : '#FFFFFF';
  const titleColor = isDarkModeOn ? '#FFFFFF' : '#000000';
  const borderColor = isDarkModeOn ? '#1e1e1e' : '#f8f5e7 ';

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
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Setting</Text>
        </View>

        <View style={[styles.mainContainer, {backgroundColor}]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <SvgXml xml={avatar_svg} width={80} height={80} />
              </View>

              <Text style={[styles.username, {color: textColor}]}>
                cyan_blackbird
              </Text>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  {backgroundColor: isDarkModeOn ? '#FFFFFF' : '#5A31F4'},
                ]}
                onPress={handleEditProfile}>
                <Text
                  style={[
                    styles.editButtonText,
                    {color: isDarkModeOn ? '#000000' : '#FFFFFF'},
                  ]}>
                  Edit Name
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, {color: titleColor}]}>
              MY PROFILE
            </Text>
            <View style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
              {profileOptions.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.optionItem,
                    {
                      borderBottomColor: borderColor,
                      borderBottomWidth:
                        index !== profileOptions.length - 1 ? 1 : 0,
                    },
                  ]}
                  onPress={() => {
                    if (option.name === 'Chat Votes') {
                      setModalVisible(true);
                    } else {
                      navigate(option.screen);
                    }
                  }}>
                  <Text style={[styles.optionText, {color: textColor}]}>
                    {option.name}
                  </Text>
                  <SvgXml
                    xml={isDarkModeOn ? arrow_svg_white : arrow_svg}
                    width={8}
                    height={12}
                  />
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, {color: titleColor}]}>
              PUSH NOTIFICATIONS
            </Text>
            <View style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
              {notifications.map((notif, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.notificationItem,
                    {
                      borderBottomColor: borderColor,
                      borderBottomWidth:
                        index !== notifications.length - 1 ? 1 : 0,
                    },
                  ]}
                  onPress={() => toggleNotification(notif)}>
                  <Text style={[styles.optionText, {color: textColor}]}>
                    {notif}
                  </Text>
                  <SvgXml
                    xml={
                      isDarkModeOn && !selectedNotifications[notif]
                        ? Selected_Svg_dark
                        : selectedNotifications[notif]
                        ? Selected_SVG
                        : SVG_not_slected
                    }
                    width={16}
                    height={16}
                  />
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionTitle, {color: titleColor}]}>
              SPREAD THE WORLD
            </Text>
            <View style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
              {spreadWorld.map((spread, index) => (
                <View
                  key={index}
                  style={[
                    styles.notificationItem,
                    {
                      borderBottomColor: borderColor,
                      borderBottomWidth:
                        index !== spreadWorld.length - 1 ? 1 : 0,
                    },
                  ]}>
                  <Text style={[styles.optionText, {color: textColor}]}>
                    {spread}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[styles.sectionTitle, {color: titleColor}]}>
              SUPPORT
            </Text>
            <View style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
              {support.map((supp, index) => (
                <View
                  key={index}
                  style={[
                    styles.notificationItem,
                    {
                      borderBottomColor: borderColor,
                      borderBottomWidth: index !== support.length - 1 ? 1 : 0,
                    },
                  ]}>
                  <Text style={[styles.optionText, {color: textColor}]}>
                    {supp}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.logo}>
              <Image
                source={
                  isDarkModeOn
                    ? require('../images/Hush_Dark.png') 
                    : require('../images/Hush.png') 
                }
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    marginTop: height * 0.03,
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
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    marginTop: 8,
  },
  editButtonText: {
    // color: '#fff',
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
    borderRadius: 20,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.05,
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1.3,
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
  },
  logo: {
    marginTop: height * 0.03,
    width: width * 0.3,
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default SettingScreen;
