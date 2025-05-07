// import React from 'react';
// import {
//   View,
//   Text,

//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Animated,
//   Pressable,
//   Dimensions,
//   SafeAreaView,
//   TouchableWithoutFeedback,
// } from 'react-native';

// import {Easing} from 'react-native';
// import GetPremiumPopup from '../../components/GetPremiumPopup';
// import { navigate } from '../../utils/NavigationUtil';

// import { useModernMode } from '../../context/ModerModeContext';
// const {width, height} = Dimensions.get('window');
// const isTablet = width > 600;
// import {useTheme} from '../../context/ThemeContext';
// import {SvgXml} from 'react-native-svg';
// import {
//     Blur_NFSW_Switch_Off,
//     Blur_NFSW_Switch_On,
//     darkmode_off_svg,
//     darkmode_on_svg,
//     fire_svg,
//     get_premium_dark_svg,
//     get_premium_svg,
//     global_svg,
//     local_svg,
//     modern_mode_off_svg,
//     modern_mode_on_svg,
//     notification_svg,
//     NSFW_off_svg,
//     NSFW_open_svg,
//     setting_svg,
//     user_setting,
//     watch_earn_dark_svg,
//     watch_earn_svg,
//   avatar_svg,
//   chat_icon_white,
//   heart_svg2
// } from "../../utils/constant/TabSVGimage"

// const Header = ({onTabPress}) => {
//   const [activeTab, setActiveTab] = useState('Hot');
//   const [settingsVisible, setSettingsVisible] = useState(false);
//   const [isNSFW, setIsNSFW] = useState(false);
//   const [isBlurNSFW, setIsBlurNSFW] = useState(false);
//   const {isModernOn, toggleModernMode} = useModernMode();

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

//   const handleTabPress = tab => {
//     setActiveTab(tab);
//     onTabPress(tab);
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

//         <View style={styles.iconsContainer}>
//           <TouchableOpacity
//             style={styles.iconWrapper}
//             onPress={handleNotificationScreen}>
//             <SvgXml xml={notification_svg} width={18.55} height={22} />
//             <View style={styles.notificationDot} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={openSettings}>
//             <SvgXml xml={user_setting} width={18.55} height={22} />
//           </TouchableOpacity>
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
//     // </ImageBackground>
//   );
// };

// const StoryPostDetailScreen = ({route}) => {
//   const {post} = route.params;
//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#1C2526' : '#fff';
//   const textColor = isDarkModeOn ? '#fff' : '#000';

//   return (
//     <View style={[styles.detailContainer, {backgroundColor}]}>
//       <ScrollView contentContainerStyle={styles.detailContent}>
//         <View style={styles.userRow}>
//           <View style={styles.avatar}>
//             <SvgXml xml={avatar_svg} width="32" height="32" />
//           </View>
//           <View>
//             <Text style={[styles.username, {color: textColor}]}>
//               {post.username}
//             </Text>
//             <Text style={[styles.time, {color: textColor}]}>{post.time}</Text>
//           </View>
//         </View>
//         {post.nsfw && (
//           <View style={styles.nsfwTag}>
//             <Text style={styles.nsfwText}>NSFW</Text>
//           </View>
//         )}
//         <Text style={[styles.detailTitle, {color: textColor}]}>
//           {post.title}
//         </Text>
//         <Text style={[styles.detailDescription, {color: textColor}]}>
//           {post.description}
//         </Text>
//         <View style={styles.reactions}>
//           <SvgXml xml={heart_svg2} width="18" height="17" />
//           <Text style={[styles.reactionText, {color: textColor}]}>
//             {post.likes}
//           </Text>
//           <SvgXml
//             xml={chat_icon_white}
//             width="18"
//             height="17"
//             style={{marginLeft: 10}}
//           />
//           <Text style={[styles.reactionText, {color: textColor}]}>
//             {post.comments}
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
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
//     backgroundColor: '#fff',
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
//   iconsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     top: 20,
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
//   detailContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   detailContent: {
//     paddingBottom: 20,
//   },
//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     width: '100%',
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#ccc',
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   username: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   time: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   nsfwTag: {
//     backgroundColor: 'red',
//     paddingHorizontal: 7,
//     paddingVertical: 2,
//     borderTopRightRadius: 14,
//     borderBottomRightRadius: 14,
//     alignSelf: 'flex-start',
//   },
//   nsfwText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   detailTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     fontFamily: 'Arial',
//     marginBottom: 12,
//     marginTop: 8,
//   },
//   detailDescription: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   reactions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   reactionText: {
//     marginLeft: 4,
//     fontSize: 12,
//   },
// });

// export default StoryPostDetailScreen;



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import StoryHeader from '../../components/StoryHeader';
import { SvgXml } from 'react-native-svg';
import { Left_Arrow_SVG, Right_Arrow_SVG } from '../../utils/constant/TabSVGimage';

const {width, height} = Dimensions.get('window');

const StoryPostDetailsScreen = ({route}) => {
  const {post} = route.params;
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <StoryHeader />
        </View>

        <View style={[styles.mainContainer, {backgroundColor}]}>
          <View style={styles.card}>
            <ImageBackground
              source={require('../../images/post1.png')}
              style={styles.headerImage}
              resizeMode="cover">
              <View style={styles.headerOverlay}>
                <Text style={styles.nsfw}>NSFW</Text>
                <Text style={styles.title}>Me and a Stranger Person</Text>
              </View>
            </ImageBackground>

            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={[styles.content, {color: textColor}]}>
                At first, I was caught off guard and couldn't understand what he
                was saying. He seemed to be asking for directions but was
                speaking so fast that it was hard to follow. I asked him to slow
                down, and he explained that he was new to the city and had lost
                his way. He looked visibly distressed, clutching a crumpled
                piece of paper with an address written on it. Feeling
                empathetic, I tried to help him by checking the address on my
                phone and guiding him in the right direction.
              </Text>
              <Text style={[styles.content, {color: textColor}]}>
                As I looked at the address, I realized it was quite far from
                where we were standing. I could see the worry etched on his
                face, and I knew I had to do more than just give him directions.
                I offered to walk with him to the nearest subway station, which
                would take him closer to his destination. He seemed relieved and
                grateful, and we started walking together.
              </Text>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.arrowButton, styles.leftButton]}>
                <SvgXml xml={Left_Arrow_SVG} width={9} height={16} />
                {/* <Text style={styles.arrowText}>◄</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.arrowButton, styles.rightButton]}>
                {/* <Text style={styles.arrowText}>►</Text> */}
                <SvgXml xml={Right_Arrow_SVG} width={9} height={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'transparent',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.04,
    borderWidth: 1,
    borderColor: '#EEE8D5',
    position: 'relative',
  },
  headerImage: {
    height: height * 0.14,
    borderRadius: 16,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'center',
  },
  nsfw: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    fontSize: 12,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  arrowButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 20,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  leftButton: {
    marginLeft: -10,
  },
  rightButton: {
    marginRight: -10,
  },
  arrowText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default StoryPostDetailsScreen;
