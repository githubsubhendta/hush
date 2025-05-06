import React from 'react';
import {
  View,
  Text,

  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import {Easing} from 'react-native';
import GetPremiumPopup from '../../components/GetPremiumPopup';
import { navigate } from '../../utils/NavigationUtil'; 

import { useModernMode } from '../../context/ModerModeContext'; 
const {width, height} = Dimensions.get('window');
const isTablet = width > 600;
import {useTheme} from '../../context/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {
    Blur_NFSW_Switch_Off,
    Blur_NFSW_Switch_On,
    darkmode_off_svg,
    darkmode_on_svg,
    fire_svg,
    get_premium_dark_svg,
    get_premium_svg,
    global_svg,
    local_svg,
    modern_mode_off_svg,
    modern_mode_on_svg,
    notification_svg,
    NSFW_off_svg,
    NSFW_open_svg,
    setting_svg,
    user_setting,
    watch_earn_dark_svg,
    watch_earn_svg,
  avatar_svg,
  chat_icon_white,
  heart_svg2
} from "../../utils/constant/TabSVGimage"

const Header = ({onTabPress}) => {
  const [activeTab, setActiveTab] = useState('Hot');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isBlurNSFW, setIsBlurNSFW] = useState(false);
  const {isModernOn, toggleModernMode} = useModernMode();

  // const [isDarkModeOn, setIsDarkModeOn] = useState(false);
  const {isDarkModeOn, toggleTheme} = useTheme();
  // const [isModernOn, setIsModernOn] = useState(false);
  const slideAnim = useState(new Animated.Value(width))[0];
  const [modalVisible, setModalVisible] = useState(false);

  const textColorStyle = {
    color: isDarkModeOn ? '#FFFFFF' : '#000000',
  };

  const premiumButtonStyle = {
    backgroundColor: isDarkModeOn ? '#FFFFFF' : '#3D33E5',
  };
  const buttonTextStyle = {
    color: isDarkModeOn ? '#000000' : '#FFFFFF',
  };

  const watchButtonStyle = {
    backgroundColor: isDarkModeOn ? '#FFFFFF' : '#2F0E40',
  };

  const handleTabPress = tab => {
    setActiveTab(tab);
    onTabPress(tab);
  };

  const handleNotificationScreen = () => {
    navigate('NotificationScreen');
  };

  const handleSetting = () => {
    navigate('SettingScreen');
    setSettingsVisible(false);
  };

  const openSettings = () => {
    setSettingsVisible(true);
    slideAnim.setValue(width);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const closeSettings = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setSettingsVisible(false));
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, {backgroundColor: 'transparent'}]}>
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={handleNotificationScreen}>
            <SvgXml xml={notification_svg} width={18.55} height={22} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openSettings}>
            <SvgXml xml={user_setting} width={18.55} height={22} />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          animationType="none"
          visible={settingsVisible}>
          <Pressable style={styles.modalOverlay} onPress={closeSettings}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    width: isTablet ? '40%' : '70%',
                    transform: [{translateX: slideAnim}],
                    backgroundColor: isDarkModeOn ? '#191919' : '#fff',
                  },
                ]}>
                <TouchableOpacity
                  style={styles.titleContainer}
                  onPress={handleSetting}>
                  <SvgXml xml={setting_svg} width={14} height={14} />
                  <Text style={[styles.modalTitle, textColorStyle]}>
                    Settings
                  </Text>
                </TouchableOpacity>

                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, textColorStyle]}>
                    Dark Mode
                  </Text>
                  <TouchableOpacity onPress={toggleTheme}>
                    <SvgXml
                      xml={isDarkModeOn ? darkmode_on_svg : darkmode_off_svg}
                      width={65}
                      height={26}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, textColorStyle]}>
                    NSFW
                  </Text>
                  <TouchableOpacity onPress={() => setIsNSFW(!isNSFW)}>
                    <SvgXml
                      xml={isNSFW ? NSFW_open_svg : NSFW_off_svg}
                      width={65}
                      height={26}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, textColorStyle]}>
                    Blur NSFW
                  </Text>
                  <TouchableOpacity onPress={() => setIsBlurNSFW(!isBlurNSFW)}>
                    <SvgXml
                      xml={
                        isBlurNSFW ? Blur_NFSW_Switch_On : Blur_NFSW_Switch_Off
                      }
                      width={65}
                      height={26}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, textColorStyle]}>
                    Modern Mode
                  </Text>
                  <TouchableOpacity onPress={toggleModernMode}>
                    <SvgXml
                      xml={
                        isModernOn ? modern_mode_on_svg : modern_mode_off_svg
                      }
                      width={65}
                      height={26}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.buttonWrapper}>
                    <View style={styles.iconWrapper1}>
                      <SvgXml
                        xml={
                          isDarkModeOn ? get_premium_dark_svg : get_premium_svg
                        }
                        width={40}
                        height={40}
                      />
                    </View>
                    <View style={[styles.button, premiumButtonStyle]}>
                      <Text style={[styles.buttonText, buttonTextStyle]}>
                        Get Premium
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonWrapper}>
                    <View style={styles.iconWrapper1}>
                      <SvgXml
                        xml={
                          isDarkModeOn ? watch_earn_svg : watch_earn_dark_svg
                        }
                        width={40}
                        height={40}
                      />
                    </View>
                    <View style={[styles.button, watchButtonStyle]}>
                      <Text style={[styles.buttonText, buttonTextStyle]}>
                        Watch & Earn
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>

      <GetPremiumPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
    // </ImageBackground>
  );
};

const StoryPostDetailScreen = ({route}) => {
  const {post} = route.params;
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#1C2526' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';

  return (
    <View style={[styles.detailContainer, {backgroundColor}]}>
      <ScrollView contentContainerStyle={styles.detailContent}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <SvgXml xml={avatar_svg} width="32" height="32" />
          </View>
          <View>
            <Text style={[styles.username, {color: textColor}]}>
              {post.username}
            </Text>
            <Text style={[styles.time, {color: textColor}]}>{post.time}</Text>
          </View>
        </View>
        {post.nsfw && (
          <View style={styles.nsfwTag}>
            <Text style={styles.nsfwText}>NSFW</Text>
          </View>
        )}
        <Text style={[styles.detailTitle, {color: textColor}]}>
          {post.title}
        </Text>
        <Text style={[styles.detailDescription, {color: textColor}]}>
          {post.description}
        </Text>
        <View style={styles.reactions}>
          <SvgXml xml={heart_svg2} width="18" height="17" />
          <Text style={[styles.reactionText, {color: textColor}]}>
            {post.likes}
          </Text>
          <SvgXml
            xml={chat_icon_white}
            width="18"
            height="17"
            style={{marginLeft: 10}}
          />
          <Text style={[styles.reactionText, {color: textColor}]}>
            {post.comments}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flexDirection: 'row',
    top: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#392EBD',
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: '300',
    color: 'white',
    marginLeft: 5,
  },
  activeText: {
    fontWeight: '700',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
    marginRight: 5,
  },
  iconWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconWrapper1: {
    position: 'absolute',
    top: 4,
    // backgroundColor: 'white',
    borderRadius: 40,
    padding: 5,
  },
  modalContainer: {
    width: isTablet ? '40%' : '50%',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    position: 'absolute',
    right: 10,
    top: 100,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE8D5',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE8D5',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  iconWrapper1: {
    position: 'absolute',
    top: -14,
    padding: 5,
  },
  button: {
    width: 93,
    height: 29,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  premiumButton: {
    backgroundColor: '#3D33E5',
  },
  watchButton: {
    backgroundColor: '#2F0E40',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 500,
    color: 'white',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  detailContent: {
    paddingBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    color: '#aaa',
    fontSize: 12,
  },
  nsfwTag: {
    backgroundColor: 'red',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    alignSelf: 'flex-start',
  },
  nsfwText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Arial',
    marginBottom: 12,
    marginTop: 8,
  },
  detailDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  reactionText: {
    marginLeft: 4,
    fontSize: 12,
  },
});

export default StoryPostDetailScreen;
