import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {
  darkmode_off_svg,
  darkmode_on_svg,
  fire_svg,
  get_premium_svg,
  global_svg,
  local_svg,
  modern_mode_off_svg,
  modern_mode_on_svg,
  notification_svg,
  NSFW_off_svg,
  NSFW_open_svg,
  poll_tab_svg,
  setting_svg,
  story_tab_svg,
  user_setting,
  video_tab_svg,
  watch_earn_svg,
} from '../utils/constant/TabSVGimage';
import { Easing } from 'react-native';
import GetPremiumPopup from './GetPremiumPopup';

const {width, height} = Dimensions.get('window');
const isTablet = width > 600;

const WatchHeader = ({onTabPress}) => {
  const [activeTab, setActiveTab] = useState('Video');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);
  const [isModernOn, setIsModernOn] = useState(false);
  const slideAnim = useState(new Animated.Value(width))[0];
  const [modalVisible, setModalVisible] = useState(false);

  const handleTabPress = tab => {
    setActiveTab(tab);
    onTabPress(tab);
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
    <ImageBackground
      source={require('../images/headerBg.png')}
      resizeMode="cover"
      imageStyle={{opacity: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView>
        <View style={[styles.container, {backgroundColor: 'transparent'}]}>
          {/* <StatusBar hidden={false} style={{backgroundColor:'transparent'}} /> */}
          <View style={styles.centerContainer}>
            {/* {['Hot', 'Global', 'Local'].map(tab => ( */}
            {['Video','Story','Poll'].map(tab=>(

              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => handleTabPress(tab)}>
                {activeTab === tab && (
                  <SvgXml
                    xml={
                      tab === 'Video'
                        ? video_tab_svg
                        : tab === 'Story'
                        ? story_tab_svg
                        : poll_tab_svg
                    }
                    width={12}
                    height={14}
                  />
                )}
                <Text
                  style={[
                    styles.menuText,
                    activeTab === tab && styles.activeText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() => onTabPress('Notifications')}>
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
                    },
                  ]}>
                  <View style={styles.titleContainer}>
                    <SvgXml xml={setting_svg} width={14} height={14} />
                    <Text style={styles.modalTitle}>Settings</Text>
                  </View>

                  {/* Dark Mode Toggle */}
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                    <TouchableOpacity
                      onPress={() => setIsDarkModeOn(!isDarkModeOn)}>
                      <SvgXml
                        xml={isDarkModeOn ? darkmode_on_svg : darkmode_off_svg}
                        width={65}
                        height={26}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>NSFW</Text>
                    <TouchableOpacity onPress={() => setIsNSFW(!isNSFW)}>
                      <SvgXml
                        xml={isNSFW ? NSFW_open_svg : NSFW_off_svg}
                        width={65}
                        height={26}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Modern Mode Toggle */}
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Modern Mode</Text>
                    <TouchableOpacity
                      onPress={() => setIsModernOn(!isModernOn)}>
                      <SvgXml
                        xml={
                          isModernOn ? modern_mode_on_svg : modern_mode_off_svg
                        }
                        width={65}
                        height={26}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Buttons */}
                  <View style={styles.buttonContainer}>
                    {/* Get Premium Button */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}  style={styles.buttonWrapper}>
                      <View style={styles.iconWrapper1}>
                        <SvgXml xml={get_premium_svg} width={40} height={40} />
                      </View>
                      <View style={[styles.button, styles.premiumButton]}>
                        <Text style={styles.buttonText}>Get Premium</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Watch & Earn Button */}
                    <TouchableOpacity style={styles.buttonWrapper}>
                      <View style={styles.iconWrapper1}>
                        <SvgXml xml={watch_earn_svg} width={40} height={40} />
                      </View>
                      <View style={[styles.button, styles.watchButton]}>
                        <Text style={styles.buttonText}>Watch & Earn</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </View>

        <GetPremiumPopup
          visible={modalVisible} onClose={() => setModalVisible(false)} />
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconWrapper1: {
    position: 'absolute',
    top: -14,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 5,
  },
  modalContainer: {
    width: isTablet ? '40%' : '50%',
    height: 273,
    maxHeight: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
    backgroundColor: 'white',
    borderRadius: 40,
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
});

export default WatchHeader;
