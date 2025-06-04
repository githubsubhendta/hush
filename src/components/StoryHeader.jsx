// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Animated,
//   Pressable,
//   Dimensions,
//   SafeAreaView,
//   TouchableWithoutFeedback,
// } from 'react-native';

// import {SvgXml} from 'react-native-svg';
// import {
//   back_arrow_svg,
//   Blur_NFSW_Switch_Off,
//   Blur_NFSW_Switch_On,
//   darkmode_off_svg,
//   darkmode_on_svg,
//   fire_svg,
//   get_premium_dark_svg,
//   get_premium_svg,
//   global_svg,
//   local_svg,
//   modern_mode_off_svg,
//   modern_mode_on_svg,
//   notification_svg,
//   NSFW_off_svg,
//   NSFW_open_svg,
//   setting_svg,
//   user_setting,
//   watch_earn_dark_svg,
//   watch_earn_svg,
// } from '../utils/constant/TabSVGimage';
// import {Easing} from 'react-native';
// import GetPremiumPopup from './GetPremiumPopup';
// import {navigate} from '../utils/NavigationUtil';
// import {useTheme} from '../context/ThemeContext';
// import {useModernMode} from '../context/ModerModeContext';
// import { useNavigation } from '@react-navigation/native';
// const {width, height} = Dimensions.get('window');
// const isTablet = width > 600;

// const StoryHeader = ({onTabPress}) => {

//   const [settingsVisible, setSettingsVisible] = useState(false);
//   const [isNSFW, setIsNSFW] = useState(false);
//   const [isBlurNSFW, setIsBlurNSFW] = useState(false);
//   const {isModernOn, toggleModernMode} = useModernMode();
//   const navigation = useNavigation();

//   // const [isDarkModeOn, setIsDarkModeOn] = useState(false);
//   const {isDarkModeOn, toggleTheme} = useTheme();
//   // const [isModernOn, setIsModernOn] = useState(false);
//   const slideAnim = useState(new Animated.Value(width))[0];
//   const [modalVisible, setModalVisible] = useState(false);

//   const textColorStyle = {
//     color: isDarkModeOn ? '#FFFFFF' : '#000000',
//   };

//   const premiumButtonStyle = {
//     backgroundColor: isDarkModeOn ? '#FFFFFF' : '#3D33E5',
//   };
//   const buttonTextStyle = {
//     color: isDarkModeOn ? '#000000' : '#FFFFFF',
//   };

//   const watchButtonStyle = {
//     backgroundColor: isDarkModeOn ? '#FFFFFF' : '#2F0E40',
//   };

//   const handleNotificationScreen = () => {
//     navigate('NotificationScreen');
//   };

//   const handleSetting = () => {
//     navigate('SettingScreen');
//     setSettingsVisible(false);
//   };

//   const openSettings = () => {
//     setSettingsVisible(true);
//     slideAnim.setValue(width);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 700,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeSettings = () => {
//     Animated.timing(slideAnim, {
//       toValue: width,
//       duration: 400,
//       easing: Easing.in(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => setSettingsVisible(false));
//   };

//   return (
//     <SafeAreaView>
//       <View style={[styles.container, {backgroundColor: 'transparent'}]}>
//         <View style={styles.allIconsContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//           <SvgXml xml={back_arrow_svg} width={30} height={30} />
//           </TouchableOpacity>
//           <View style={styles.iconsContainer}>
//             <TouchableOpacity
//               style={styles.iconWrapper}
//               onPress={handleNotificationScreen}>
//               <SvgXml xml={notification_svg} width={18.55} height={22} />
//               <View style={styles.notificationDot} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={openSettings}>
//               <SvgXml xml={user_setting} width={18.55} height={22} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Modal
//           transparent={true}
//           animationType="none"
//           visible={settingsVisible}>
//           <Pressable style={styles.modalOverlay} onPress={closeSettings}>
//             <TouchableWithoutFeedback>
//               <Animated.View
//                 style={[
//                   styles.modalContainer,
//                   {
//                     width: isTablet ? '40%' : '70%',
//                     transform: [{translateX: slideAnim}],
//                     backgroundColor: isDarkModeOn ? '#191919' : '#fff',
//                   },
//                 ]}>
//                 <TouchableOpacity
//                   style={styles.titleContainer}
//                   onPress={handleSetting}>
//                   <SvgXml xml={setting_svg} width={14} height={14} />
//                   <Text style={[styles.modalTitle, textColorStyle]}>
//                     Settings
//                   </Text>
//                 </TouchableOpacity>

//                 <View style={styles.settingItem}>
//                   <Text style={[styles.settingLabel, textColorStyle]}>
//                     Dark Mode
//                   </Text>
//                   <TouchableOpacity onPress={toggleTheme}>
//                     <SvgXml
//                       xml={isDarkModeOn ? darkmode_on_svg : darkmode_off_svg}
//                       width={65}
//                       height={26}
//                     />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.settingItem}>
//                   <Text style={[styles.settingLabel, textColorStyle]}>
//                     NSFW
//                   </Text>
//                   <TouchableOpacity onPress={() => setIsNSFW(!isNSFW)}>
//                     <SvgXml
//                       xml={isNSFW ? NSFW_open_svg : NSFW_off_svg}
//                       width={65}
//                       height={26}
//                     />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.settingItem}>
//                   <Text style={[styles.settingLabel, textColorStyle]}>
//                     Blur NSFW
//                   </Text>
//                   <TouchableOpacity onPress={() => setIsBlurNSFW(!isBlurNSFW)}>
//                     <SvgXml
//                       xml={
//                         isBlurNSFW ? Blur_NFSW_Switch_On : Blur_NFSW_Switch_Off
//                       }
//                       width={65}
//                       height={26}
//                     />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.settingItem}>
//                   <Text style={[styles.settingLabel, textColorStyle]}>
//                     Modern Mode
//                   </Text>
//                   <TouchableOpacity onPress={toggleModernMode}>
//                     <SvgXml
//                       xml={
//                         isModernOn ? modern_mode_on_svg : modern_mode_off_svg
//                       }
//                       width={65}
//                       height={26}
//                     />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     onPress={() => setModalVisible(true)}
//                     style={styles.buttonWrapper}>
//                     <View style={styles.iconWrapper1}>
//                       <SvgXml
//                         xml={
//                           isDarkModeOn ? get_premium_dark_svg : get_premium_svg
//                         }
//                         width={40}
//                         height={40}
//                       />
//                     </View>
//                     <View style={[styles.button, premiumButtonStyle]}>
//                       <Text style={[styles.buttonText, buttonTextStyle]}>
//                         Get Premium
//                       </Text>
//                     </View>
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.buttonWrapper}>
//                     <View style={styles.iconWrapper1}>
//                       <SvgXml
//                         xml={
//                           isDarkModeOn ? watch_earn_svg : watch_earn_dark_svg
//                         }
//                         width={40}
//                         height={40}
//                       />
//                     </View>
//                     <View style={[styles.button, watchButtonStyle]}>
//                       <Text style={[styles.buttonText, buttonTextStyle]}>
//                         Watch & Earn
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </Animated.View>
//             </TouchableWithoutFeedback>
//           </Pressable>
//         </Modal>
//       </View>

//       <GetPremiumPopup
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 110,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     // backgroundColor: '#fff',
//   },
//   centerContainer: {
//     flexDirection: 'row',
//     top: 20,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   tabButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//   },
//   activeTab: {
//     backgroundColor: '#392EBD',
//     paddingHorizontal: 10,
//   },
//   menuText: {
//     fontSize: isTablet ? 20 : 18,
//     fontWeight: '300',
//     color: 'white',
//     marginLeft: 5,
//   },
//   activeText: {
//     fontWeight: '700',
//   },
//   allIconsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     marginRight: 5,
//   },
//   iconWrapper: {
//     position: 'relative',
//     marginRight: 16,
//   },
//   notificationDot: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     width: 10,
//     height: 10,
//     backgroundColor: 'red',
//     borderRadius: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(50, 50, 50, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//   },
//   iconWrapper1: {
//     position: 'absolute',
//     top: 4,
//     // backgroundColor: 'white',
//     borderRadius: 40,
//     padding: 5,
//   },
//   modalContainer: {
//     width: isTablet ? '40%' : '50%',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//     position: 'absolute',
//     right: 10,
//     top: 100,
//     alignSelf: 'flex-end',
//     justifyContent: 'center',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: 8,
//     marginBottom: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE8D5',
//   },
//   modalTitle: {
//     fontSize: 14,
//     fontWeight: 500,
//     marginLeft: 4,
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE8D5',
//   },
//   settingLabel: {
//     fontSize: 14,
//     fontWeight: 500,
//     lineHeight: 10,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginTop: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   buttonWrapper: {
//     alignItems: 'center',
//   },
//   iconWrapper1: {
//     position: 'absolute',
//     top: -14,
//     padding: 5,
//   },
//   button: {
//     width: 93,
//     height: 29,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   premiumButton: {
//     backgroundColor: '#3D33E5',
//   },
//   watchButton: {
//     backgroundColor: '#2F0E40',
//   },
//   buttonText: {
//     fontSize: 12,
//     fontWeight: 500,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default StoryHeader;

import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';

import BaseHeader from './BaseHeader';
import {
  back_arrow_svg,
  get_premium_svg,
  watch_earn_svg,
} from '../utils/constant/TabSVGimage';
import { goBack } from '../utils/NavigationUtil';

const StoryHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Get screen dimensions
  const {width, height} = Dimensions.get('window');
  
  // Determine if the device is a tablet (you can adjust this threshold as needed)
  const isTablet = width >= 600;
  
  // Responsive sizing
  const iconSize = isTablet ? 40 : 30;
  const horizontalPadding = isTablet ? 20 : 10;
  const topMargin = isTablet ? 35 : 25;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalPadding,
        backgroundColor: 'transparent',
      }}>
      {/* Left: Back Arrow */}
      <View style={{flex: 0, marginTop: topMargin}}>
        <TouchableOpacity onPress={goBack}>
          <SvgXml xml={back_arrow_svg} width={iconSize} height={iconSize} />
        </TouchableOpacity>
      </View>

      {/* Right: Base Header */}
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <BaseHeader
          tabs={[]} // No tabs
          showButtons={true}
          showNSFW={true}
          showModernMode={true}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          customButtons={[
            {
              label: 'Get Premium',
              icon: get_premium_svg,
              onPress: () => setModalVisible(true),
            },
            {
              label: 'Watch & Earn',
              icon: watch_earn_svg,
              onPress: () => console.log('Watch & Earn Pressed'),
            },
          ]}
          // Pass responsive props to BaseHeader if needed
          isTablet={isTablet}
        />
      </View>
    </View>
  );
};

export default StoryHeader;