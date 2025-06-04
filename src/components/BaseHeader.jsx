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
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Easing} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {useModernMode} from '../context/ModerModeContext';
import GetPremiumPopup from './GetPremiumPopup';
import {navigate} from '../utils/NavigationUtil';
import {setting_svg} from '../utils/constant/TabSVGimage';

const {width} = Dimensions.get('window');
const isTablet = width > 600;

const BaseHeader = ({
  tabs = [],
  defaultTab = '',
  onTabPress = () => {},
  showButtons = true,
  showNSFW = true,
  showModernMode = true,
  customButtons = [],
  modalVisible,
  setModalVisible,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isBlurNSFW, setIsBlurNSFW] = useState(false);

  const slideAnim = useState(new Animated.Value(width))[0];

  const {isDarkModeOn, toggleTheme} = useTheme();
  const {isModernOn, toggleModernMode} = useModernMode();

  const handleTabPress = tab => {
    setActiveTab(tab.key);
    onTabPress(tab.key);
    if (tab.screen) {
      navigate(tab.screen);
    }
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
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {tabs.length > 0 && (
            <View style={styles.centerContainer}>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.tabButton,
                    activeTab === tab.key && styles.activeTab,
                  ]}
                  onPress={() => handleTabPress(tab)}>
                  {activeTab === tab.key && tab.icon && (
                    <SvgXml xml={tab.icon} width={12} height={14} />
                  )}
                  <Text
                    style={[
                      styles.menuText,
                      activeTab === tab.key && styles.activeText,
                    ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.spacer} />
        {/* Icons */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => navigate('NotificationScreen')}>
            <SvgXml
              xml={require('../utils/constant/TabSVGimage').notification_svg}
              width={18.55}
              height={22}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openSettings}>
            <SvgXml
              xml={require('../utils/constant/TabSVGimage').user_setting}
              width={18.55}
              height={22}
            />
          </TouchableOpacity>
        </View>

        {/* Settings Modal */}
        <Modal transparent visible={settingsVisible}>
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
                  <Text
                    style={[
                      styles.settingLabel1,
                      {color: isDarkModeOn ? '#fff' : '#000'},
                    ]}>
                    Settings
                  </Text>
                </TouchableOpacity>
                {/* Dark Mode */}
                <View style={styles.settingItem}>
                  <Text
                    style={[
                      styles.settingLabel,
                      {color: isDarkModeOn ? '#fff' : '#000'},
                    ]}>
                    Dark Mode
                  </Text>
                  <TouchableOpacity onPress={toggleTheme}>
                    <SvgXml
                      xml={
                        isDarkModeOn
                          ? require('../utils/constant/TabSVGimage')
                              .darkmode_on_svg
                          : require('../utils/constant/TabSVGimage')
                              .darkmode_off_svg
                      }
                      width={65}
                      height={26}
                    />
                  </TouchableOpacity>
                </View>

                {/* NSFW */}
                {showNSFW && (
                  <>
                    <View style={styles.settingItem}>
                      <Text
                        style={[
                          styles.settingLabel,
                          {color: isDarkModeOn ? '#fff' : '#000'},
                        ]}>
                        NSFW
                      </Text>
                      <TouchableOpacity onPress={() => setIsNSFW(!isNSFW)}>
                        <SvgXml
                          xml={
                            isNSFW
                              ? require('../utils/constant/TabSVGimage')
                                  .NSFW_open_svg
                              : require('../utils/constant/TabSVGimage')
                                  .NSFW_off_svg
                          }
                          width={65}
                          height={26}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.settingItem}>
                      <Text
                        style={[
                          styles.settingLabel,
                          {color: isDarkModeOn ? '#fff' : '#000'},
                        ]}>
                        Blur NSFW
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsBlurNSFW(!isBlurNSFW)}>
                        <SvgXml
                          xml={
                            isBlurNSFW
                              ? require('../utils/constant/TabSVGimage')
                                  .Blur_NFSW_Switch_On
                              : require('../utils/constant/TabSVGimage')
                                  .Blur_NFSW_Switch_Off
                          }
                          width={65}
                          height={26}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {/* Modern Mode */}
                {showModernMode && (
                  <View style={styles.settingItem}>
                    <Text
                      style={[
                        styles.settingLabel,
                        {color: isDarkModeOn ? '#fff' : '#000'},
                      ]}>
                      Modern Mode
                    </Text>
                    <TouchableOpacity onPress={toggleModernMode}>
                      <SvgXml
                        xml={
                          isModernOn
                            ? require('../utils/constant/TabSVGimage')
                                .modern_mode_on_svg
                            : require('../utils/constant/TabSVGimage')
                                .modern_mode_off_svg
                        }
                        width={65}
                        height={26}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {/* Custom Buttons */}
                {showButtons && (
                  <View style={styles.buttonContainer}>
                    {customButtons.map(({icon, label, onPress}, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.buttonWrapper}
                        onPress={onPress}>
                        <View style={styles.iconWrapper1}>
                          <SvgXml xml={icon} width={40} height={40} />
                        </View>
                        <View
                          style={[
                            styles.button,
                            {
                              backgroundColor: isDarkModeOn
                                ? '#fff'
                                : '#2F0E40',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.buttonText,
                              {color: isDarkModeOn ? '#000' : '#fff'},
                            ]}>
                            {label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>

      {/* Premium Modal */}
      <GetPremiumPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
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
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    flexGrow: 0,
  },
  spacer: {
  flex: 1,
},
  centerContainer: {
    flexDirection: 'row',
    top: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE8D5',
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
    borderRadius: 40,
    padding: 5,
  },
  modalContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    position: 'absolute',
    right: 10,
    top: 100,
    alignSelf: 'flex-end',
    justifyContent: 'center',
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
    fontWeight: '500',
    lineHeight: 10,
    textAlign: 'center',
  },
  settingLabel1: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 4,
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
  button: {
    marginTop: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default BaseHeader;
