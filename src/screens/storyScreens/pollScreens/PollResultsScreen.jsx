// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import StoryHeader from '../../../components/StoryHeader';
// import Svg, {SvgXml} from 'react-native-svg';
// import {
//   avatar_svg,
//   block_user_svg,
//   chat_icon_black,
//   chat_icon_white,
//   Flag_SVG,
//   heart_svg_black,
//   heart_svg_white,
//   Left_Arrow_SVG,
//   menu_svg_dark,
//   Right_Arrow_SVG,
//   share_svg,
//   share_svg_dark,
//   Star_svg,
// } from '../../../utils/constant/TabSVGimage';
// import CustomActionModal from '../../../components/CustomActionModal';

// const {width, height} = Dimensions.get('window');

// // Responsive scaling utility
// const scale = size => (width / 375) * size;
// const scaleHeight = size => (height / 667) * size;

// const PollResultsScreen = ({route}) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const {
//     post: initialPost,
//     nsfw: initialNsfw,
//     posts = [],
//     currentIndex = 0,
//   } = route.params;
//   const [currentPost, setCurrentPost] = useState(initialPost);
//   const [currentNsfw, setCurrentNsfw] = useState(initialNsfw);
//   const [currentIndexState, setCurrentIndexState] = useState(currentIndex);

//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';
//   const textColor = isDarkModeOn ? '#fff' : '#000';
//   //   const borderColor = isDarkModeOn ? '#212121' : '#EEE8D5';
//   const buttonBackgroundColor = isDarkModeOn ? '#FFFFFF' : '#EEE8D5E5';
//   const shareBGColor = isDarkModeOn ? '#FFFFFF' : '#392EBD';
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground
//         source={require('../../../images/headerBg.png')}
//         resizeMode="cover"
//         style={styles.background}>
//         <View style={styles.header}>
//           <StoryHeader />
//         </View>

//         <View style={[styles.mainContainer, {backgroundColor}]}>
//           <View style={styles.userRow}>
//             <View style={styles.leftSide}>
//               <View style={styles.avatar}>
//                 <SvgXml xml={avatar_svg} width={scale(32)} height={scale(32)} />
//               </View>
//               <Text style={[styles.username, {color: textColor}]}>
//                 {currentPost.username}
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   gap: scale(5),
//                   marginLeft: scale(10),
//                 }}>
//                 <SvgXml xml={Star_svg} width={scale(13)} height={scale(13)} />
//                 <Text>60</Text>
//               </View>
//             </View>
//             <View style={styles.rightSide}>
//               <Text style={[styles.time, {color: textColor}]}>
//                 {currentPost.time}
//               </Text>
//               <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//                 <SvgXml
//                   xml={menu_svg_dark}
//                   width={scale(18)}
//                   height={scale(10)}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={[styles.card, {backgroundColor: backgroundColor}]}>
//             <View style={styles.headerImage}>
//               <View style={styles.headerOverlay}>
//                 {currentNsfw && <Text style={styles.nsfw}>NSFW</Text>}
//                 <View style={styles.pollContainer}>
//                   <Text style={styles.title}>{currentPost.title}</Text>
//                   <View style={styles.pollOptionsContainer}>
//                     <View style={styles.pollOption}>
//                       <Text style={styles.pollOptionText}>No</Text>
//                     </View>
//                     <View style={styles.pollOption}>
//                       <Text style={styles.pollOptionText}>Yes</Text>
//                     </View>
//                     <View style={styles.pollOption}>
//                       <Text style={styles.pollOptionText}>Other</Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity style={styles.viewResultsButton}>
//                     <Text style={styles.viewResultsText}>
//                       VIEW POLL RESULTS
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.bottomRow}>
//               <View style={styles.leftSide}>
//                 <SvgXml
//                   xml={isDarkModeOn ? heart_svg_white : heart_svg_black}
//                 />
//                 <Text
//                   style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
//                   {currentPost.likes}
//                 </Text>
//                 <SvgXml
//                   xml={isDarkModeOn ? chat_icon_white : chat_icon_black}
//                 />
//                 <Text
//                   style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
//                   {currentPost.comments}
//                 </Text>
//               </View>
//               <View style={styles.rightSide}>
//                 <View
//                   style={{
//                     padding: 10,
//                     backgroundColor: shareBGColor,
//                     borderRadius: 12,
//                   }}>
//                   <SvgXml
//                     xml={isDarkModeOn ? share_svg : share_svg_dark}
//                     width={16}
//                     height={14}
//                   />
//                 </View>
//                 <View
//                   style={{
//                     paddingHorizontal: 10,
//                     paddingVertical: 8,
//                     backgroundColor: shareBGColor,
//                     borderRadius: 12,
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <SvgXml
//                     xml={isDarkModeOn ? chat_icon_black : chat_icon_white}
//                     width={14}
//                     height={14}
//                   />
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       fontSize: 14,
//                       textAlign: 'center',
//                       color: isDarkModeOn ? '#000' : '#fff',
//                     }}>
//                     Chat
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* <View style={styles.scrollArea}>
//               <ScrollView
//                 contentContainerStyle={styles.contentContainer}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}>
//                 <Text style={[styles.content, {color: textColor}]}>
//                   {currentPost.description
//                     ? currentPost.description
//                     : 'No description'}
//                 </Text>
//               </ScrollView>
//             </View> */}
//           </View>
//         </View>
//       </ImageBackground>
//       <CustomActionModal
//         visible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         ModalBackgroundColor={ModalBackgroundColor}
//         ModalTextColor={ModalTextColor}
//         isDarkModeOn={isDarkModeOn}
//         share_svg={share_svg}
//         share_svg_dark={share_svg_dark}
//         Flag_SVG={Flag_SVG}
//         block_user_svg={block_user_svg}
//         styles={styles}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//   },
//   header: {
//     height: scaleHeight(100),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: scaleHeight(16),
//   },
//   mainContainer: {
//     flex: 1,
//     borderTopLeftRadius: scale(16),
//     borderTopRightRadius: scale(16),
//     backgroundColor: 'transparent',
//     paddingHorizontal: scale(16),
//   },
//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingTop: scaleHeight(10),
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//   },

//   leftSide: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rightSide: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//     paddingRight: scale(8),
//   },

//   avatar: {
//     marginRight: scale(8),
//   },

//   card: {
//     marginVertical: width * 0.04,

//     position: 'relative',
//     minHeight: scaleHeight(400),
//   },
//   scrollArea: {
//     maxHeight: scaleHeight(330),
//   },
//   headerImage: {
//     height: (height * 2) / 4.2,
//     borderRadius: scale(16),
//     justifyContent: 'flex-end',
//     overflow: 'hidden',
//   },
//   headerOverlay: {
//     backgroundColor: '#EEE8D5',
//     flex: 1,
//     justifyContent: 'center',
//   },

//   pollContainer: {
//     padding: scale(16),
//     width: '100%',
//   },
//   pollQuestion: {
//     fontSize: scale(18),
//     fontWeight: '600',
//     color: '#2F0E40',
//     marginBottom: scale(20),
//   },
//   pollOptionsContainer: {
//     marginBottom: scale(20),
//   },
//   pollOption: {
//     backgroundColor: '#FFFFFF',
//     padding: scale(20),
//     borderRadius: scale(14),
//     marginBottom: scale(20),
//   },
//   pollOptionText: {
//     fontSize: scale(16),
//     color: '#2F0E40',
//   },
//   viewResultsButton: {
//     padding: scale(12),
//     borderRadius: scale(8),
//     alignItems: 'center',
//   },
//   viewResultsText: {
//     color: '#000',
//     fontSize: scale(14),
//     fontWeight: '600',
//   },
//   nsfw: {
//     backgroundColor: 'red',
//     color: '#fff',
//     paddingHorizontal: scale(7),
//     paddingVertical: scale(2),
//     borderTopRightRadius: scale(14),
//     borderBottomRightRadius: scale(14),
//     fontSize: scale(12),
//     position: 'absolute',
//     top: 0,
//     left: 0,
//   },
//   title: {
//     fontSize: scale(24),
//     fontWeight: '700',
//     textAlign: 'start',
//     color: '#2F0E40',
//     padding: scale(8),
//   },
//   contentContainer: {
//     padding: scale(16),
//   },
//   content: {
//     fontSize: scale(14),
//     marginBottom: scale(10),
//     lineHeight: scale(24),
//   },
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalOverlay: {
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//   },
//   modalOption: {
//     fontSize: 16,
//     paddingVertical: 5,
//   },
//   modalOptionDanger: {
//     fontSize: 16,
//     color: 'red',
//     paddingVertical: 12,
//   },
//   buttons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     gap: 8,
//   },
//   dragHandleDark: {
//     alignSelf: 'center',
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     marginTop: -10,
//     marginBottom: 16,
//   },
// });

// export default PollResultsScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import StoryHeader from '../../../components/StoryHeader';
import {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_black,
  chat_icon_white,
  Flag_SVG,
  heart_svg_black,
  heart_svg_white,
  menu_svg_dark,
  Poll_Count_Svg,
  Poll_count_Svg_dark,
  share_svg,
  share_svg_dark,
  Star_svg,
} from '../../../utils/constant/TabSVGimage';
import CustomActionModal from '../../../components/CustomActionModal';

const {width, height} = Dimensions.get('window');

// Responsive scaling utility
const scale = size => (width / 375) * size;
const scaleHeight = size => (height / 667) * size;

const PollResultsScreen = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    post: initialPost,
    nsfw: initialNsfw,
    polls = [],
    currentIndex = 0,
  } = route.params;

  const [currentPost, setCurrentPost] = useState(initialPost);
  const [currentNsfw, setCurrentNsfw] = useState(initialNsfw);

  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';
  const titleColor = isDarkModeOn ? '#fff' : '#2F0E40';
  const shareBGColor = isDarkModeOn ? '#FFFFFF' : '#392EBD';
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
  const headerOverlayBGColor = isDarkModeOn ? '#191919' : '#EEE8D5';

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <StoryHeader />
        </View>

        <View style={[styles.mainContainer, {backgroundColor}]}>
          {/* User Info Row */}
          <View style={styles.userRow}>
            <View style={styles.leftSide}>
              <View style={styles.avatar}>
                <SvgXml xml={avatar_svg} width={scale(32)} height={scale(32)} />
              </View>
              <Text style={[styles.username, {color: textColor}]}>
                {currentPost.username}
              </Text>
              <View style={styles.ratingContainer}>
                <SvgXml xml={Star_svg} width={scale(13)} height={scale(13)} />
                <Text style={{color: textColor}}>60</Text>
              </View>
            </View>
            <View style={styles.rightSide}>
              <Text style={[styles.time, {color: textColor}]}>
                {currentPost.time}
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <SvgXml
                  xml={menu_svg_dark}
                  width={scale(18)}
                  height={scale(10)}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Poll Card */}
          <View style={[styles.card, {backgroundColor}]}>
            <View style={styles.headerImage}>
              <View
                style={[
                  styles.headerOverlay,
                  {backgroundColor: headerOverlayBGColor},
                ]}>
                {currentNsfw && <Text style={styles.nsfw}>NSFW</Text>}
                <View style={styles.pollContainer}>
                  <Text style={[styles.title, {color: titleColor}]}>
                    {currentPost.title}
                  </Text>
                  <View style={styles.pollOptionsContainer}>
                    <View style={styles.pollOption}>
                      <Text style={styles.pollOptionText}>No</Text>
                    </View>
                    <View style={styles.pollOption}>
                      <Text style={styles.pollOptionText}>Yes</Text>
                    </View>
                    <View style={styles.pollOption}>
                      <Text style={styles.pollOptionText}>Other</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.viewResultsButton}>
                    <Text style={[styles.viewResultsText, {color: textColor}]}>
                      VIEW POLL RESULTS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Action Row */}
            <View style={styles.bottomRow}>
              <View style={styles.leftSide}>
                <SvgXml
                  xml={isDarkModeOn ? heart_svg_white : heart_svg_black}
                />
                <Text
                  style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                  {currentPost.likes}
                </Text>
                <SvgXml
                  xml={isDarkModeOn ? chat_icon_white : chat_icon_black}
                />
                <Text
                  style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                  {currentPost.comments}
                </Text>
                <SvgXml
                  xml={isDarkModeOn ? Poll_Count_Svg : Poll_count_Svg_dark}
                />
                <Text
                  style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                  {currentPost.comments}
                </Text>
              </View>
              <View style={styles.rightSide}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: shareBGColor,
                    borderRadius: 12,
                  }}>
                  <SvgXml
                    xml={isDarkModeOn ? share_svg : share_svg_dark}
                    width={16}
                    height={14}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: shareBGColor,
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SvgXml
                    xml={isDarkModeOn ? chat_icon_black : chat_icon_white}
                    width={14}
                    height={14}
                  />
                  <Text
                    style={{
                      paddingLeft: 5,
                      fontSize: 14,
                      textAlign: 'center',
                      color: isDarkModeOn ? '#000' : '#fff',
                    }}>
                    Chat
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.scrollArea}>
                <Text style={{fontSize:scale(14),fontWeight:'700'}}>REPLIES</Text>
              <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Text style={[styles.content, {color: textColor}]}>
                  {currentPost.description
                    ? currentPost.replies
                    : 'No Replies yet!'}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>

      <CustomActionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        ModalBackgroundColor={ModalBackgroundColor}
        ModalTextColor={ModalTextColor}
        isDarkModeOn={isDarkModeOn}
        share_svg={share_svg}
        share_svg_dark={share_svg_dark}
        Flag_SVG={Flag_SVG}
        block_user_svg={block_user_svg}
        styles={styles}
      />
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
    height: scaleHeight(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleHeight(16),
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: scale(16),
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: scaleHeight(10),
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  avatar: {
    marginRight: scale(8),
  },
  username: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  time: {
    fontSize: scale(12),
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5),
    marginLeft: scale(10),
  },
  card: {
    marginVertical: scale(16),
    position: 'relative',
    minHeight: scaleHeight(400),

    overflow: 'hidden',
  },
  headerImage: {
    height: scaleHeight(300),
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
  },
  pollContainer: {
    padding: scale(16),
    width: '100%',
  },
  title: {
    fontSize: scale(22),
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: scale(16),
  },
  pollOptionsContainer: {
    // marginBottom: scale(20),
  },
  pollOption: {
    backgroundColor: '#FFFFFF',
    padding: scale(20),
    borderRadius: scale(14),
    marginBottom: scale(16),
  },
  pollOptionText: {
    fontSize: scale(14),
    color: '#2F0E40',
  },
  viewResultsButton: {
    marginBottom: scale(20),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  viewResultsText: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  nsfw: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderTopRightRadius: scale(14),
    borderBottomRightRadius: scale(14),
    fontSize: scale(12),
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(10),
  },
  countText: {
    paddingHorizontal: scale(3),
    fontSize: scale(14),
  },
  shareButton: {
    padding: scale(10),
    backgroundColor: '#392EBD',
    borderRadius: scale(12),
  },
  chatButton: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    backgroundColor: '#392EBD',
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    paddingLeft: scale(5),
    fontSize: scale(14),
    textAlign: 'center',
  },
  scrollArea: {
    maxHeight: scaleHeight(330),
  },
  contentContainer: {
    padding: scale(16),
  },
  content: {
    textAlign:'center',
    fontSize: scale(14),
    marginBottom: scale(10),
    lineHeight: scale(24),
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalOverlay: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 5,
  },
  modalOptionDanger: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 12,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 8,
  },
  dragHandleDark: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: -10,
    marginBottom: 16,
  },
});

export default PollResultsScreen;
