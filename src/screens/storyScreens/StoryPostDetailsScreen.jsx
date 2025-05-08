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
// import {useTheme} from '../../context/ThemeContext';
// import StoryHeader from '../../components/StoryHeader';
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
// } from '../../utils/constant/TabSVGimage';
// import CustomActionModal from '../../components/CustomActionModal';

// const {width, height} = Dimensions.get('window');

// // Responsive scaling utility
// const scale = size => (width / 375) * size;
// const scaleHeight = size => (height / 667) * size;

// const StoryPostDetailsScreen = ({route}) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const {post, nsfw} = route.params;

//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';
//   const textColor = isDarkModeOn ? '#fff' : '#000';
//   const borderColor = isDarkModeOn ? '#212121' : '#EEE8D5';
//   const buttonBackgroundColor = isDarkModeOn ? '#FFFFFF' : '#EEE8D5E5';
//   const shareBGColor = isDarkModeOn ? '#FFFFFF' : '#392EBD';
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground
//         source={require('../../images/headerBg.png')}
//         resizeMode="cover"
//         style={styles.background}>
//         <View style={styles.header}>
//           <StoryHeader />
//         </View>

//         <View style={[styles.mainContainer, {backgroundColor}]}>
//           <View style={styles.userRow}>
//             {/* Left side: Avatar and Username */}
//             <View style={styles.leftSide}>
//               <View style={styles.avatar}>
//                 <SvgXml xml={avatar_svg} width={scale(32)} height={scale(32)} />
//               </View>

//               <Text style={[styles.username, {color: textColor}]}>
//                 {post.username}
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

//             {/* Right side: Time and Menu */}
//             <View style={styles.rightSide}>
//               <Text style={[styles.time, {color: textColor}]}>{post.time}</Text>
//               <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//                 <SvgXml
//                   xml={menu_svg_dark}
//                   width={scale(18)}
//                   height={scale(10)}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={[
//               styles.card,
//               {backgroundColor: backgroundColor, borderColor: borderColor},
//             ]}>
//             <ImageBackground
//               source={post.image || require('../../images/post1.png')}
//               style={styles.headerImage}
//               resizeMode="cover">
//               <View style={styles.headerOverlay}>
//                 {nsfw && <Text style={styles.nsfw}>NSFW</Text>}
//                 <Text style={styles.title}>{post.title}</Text>
//               </View>
//             </ImageBackground>

//             <View style={styles.scrollArea}>
//               <ScrollView
//                 contentContainerStyle={styles.contentContainer}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}>
//                 <Text style={[styles.content, {color: textColor}]}>
//                   {post.description ? post.description : 'No description'}
//                 </Text>
//               </ScrollView>
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.arrowButton,
//                   styles.leftButton,
//                   {backgroundColor: buttonBackgroundColor},
//                 ]}>
//                 <SvgXml
//                   xml={Left_Arrow_SVG}
//                   width={scale(9)}
//                   height={scale(16)}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.arrowButton,
//                   styles.rightButton,
//                   {backgroundColor: buttonBackgroundColor},
//                 ]}>
//                 <SvgXml
//                   xml={Right_Arrow_SVG}
//                   width={scale(9)}
//                   height={scale(16)}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.bottomRow}>
//             <View style={styles.leftSide}>
//               <SvgXml xml={isDarkModeOn ? heart_svg_white : heart_svg_black} />
//               <Text style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
//                 {post.likes}
//               </Text>

//               <SvgXml xml={isDarkModeOn ? chat_icon_white : chat_icon_black} />
//               <Text style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
//                 {post.comments}
//               </Text>
//             </View>
//             <View style={styles.rightSide}>
//               <View
//                 style={{
//                   padding: 10,
//                   backgroundColor: shareBGColor,
//                   borderRadius: 12,
//                 }}>
//                 <SvgXml
//                   xml={isDarkModeOn ? share_svg : share_svg_dark}
//                   width={16}
//                   height={14}
//                 />
//               </View>

//               <View
//                 style={{
//                   paddingHorizontal: 10,
//                   paddingVertical: 8,
//                   backgroundColor: shareBGColor,
//                   borderRadius: 12,
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <SvgXml
//                   xml={isDarkModeOn ? chat_icon_black : chat_icon_white}
//                   width={14}
//                   height={14}
//                 />
//                 <Text
//                   style={{
//                     paddingLeft: 5,
//                     fontSize: 14,
//                     textAlign: 'center',
//                     color: isDarkModeOn ? '#000' : '#fff',
//                   }}>
//                   Chat
//                 </Text>
//               </View>
//             </View>
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
//     height: scaleHeight(110),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: scaleHeight(20),
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
//     borderRadius: scale(16),
//     marginVertical: width * 0.04,
//     borderWidth: 1,
//     position: 'relative',
//     minHeight: scaleHeight(400),
//   },
//   scrollArea: {
//     maxHeight: scaleHeight(350),
//   },
//   headerImage: {
//     height: height * 0.14,
//     borderRadius: scale(16),
//     justifyContent: 'flex-end',
//     overflow: 'hidden',
//   },
//   headerOverlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     flex: 1,
//     justifyContent: 'center',
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
//     fontSize: scale(20),
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#fff',
//   },
//   contentContainer: {
//     padding: scale(16),
//   },
//   content: {
//     fontSize: scale(14),
//     marginBottom: scale(10),
//     lineHeight: scale(24),
//   },
//   buttonContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: scaleHeight(-20),
//   },
//   arrowButton: {
//     width: scale(25),
//     height: scaleHeight(45),
//     borderRadius: scale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: scale(2)},
//     shadowOpacity: 0.2,
//     shadowRadius: scale(4),
//     elevation: scale(4),
//   },
//   leftButton: {
//     marginLeft: scale(-12),
//   },
//   rightButton: {
//     marginRight: scale(-12),
//   },
//   arrowText: {
//     fontSize: scale(20),
//     color: '#000',
//     fontWeight: 'bold',
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

// export default StoryPostDetailsScreen;

import React, {useState} from 'react';
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
import Svg, {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_black,
  chat_icon_white,
  Flag_SVG,
  heart_svg_black,
  heart_svg_white,
  Left_Arrow_SVG,
  menu_svg_dark,
  Right_Arrow_SVG,
  share_svg,
  share_svg_dark,
  Star_svg,
} from '../../utils/constant/TabSVGimage';
import CustomActionModal from '../../components/CustomActionModal';

const {width, height} = Dimensions.get('window');

// Responsive scaling utility
const scale = size => (width / 375) * size;
const scaleHeight = size => (height / 667) * size;

const StoryPostDetailsScreen = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    post: initialPost,
    nsfw: initialNsfw,
    posts = [],
    currentIndex = 0,
  } = route.params;
  const [currentPost, setCurrentPost] = useState(initialPost);
  const [currentNsfw, setCurrentNsfw] = useState(initialNsfw);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex);

  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';
  const borderColor = isDarkModeOn ? '#212121' : '#EEE8D5';
  const buttonBackgroundColor = isDarkModeOn ? '#FFFFFF' : '#EEE8D5E5';
  const shareBGColor = isDarkModeOn ? '#FFFFFF' : '#392EBD';
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';

  const handleNextPost = () => {
    if (posts.length === 0) return;
    const nextIndex = (currentIndexState + 1) % posts.length; // Loop back to start
    setCurrentIndexState(nextIndex);
    setCurrentPost(posts[nextIndex]);
    setCurrentNsfw(posts[nextIndex].nsfw);
  };

  const handlePreviousPost = () => {
    if (posts.length === 0) return;
    const prevIndex = (currentIndexState - 1 + posts.length) % posts.length; // Loop to end
    setCurrentIndexState(prevIndex);
    setCurrentPost(posts[prevIndex]);
    setCurrentNsfw(posts[prevIndex].nsfw);
  };

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
          <View style={styles.userRow}>
            <View style={styles.leftSide}>
              <View style={styles.avatar}>
                <SvgXml xml={avatar_svg} width={scale(32)} height={scale(32)} />
              </View>
              <Text style={[styles.username, {color: textColor}]}>
                {currentPost.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: scale(5),
                  marginLeft: scale(10),
                }}>
                <SvgXml xml={Star_svg} width={scale(13)} height={scale(13)} />
                <Text>60</Text>
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

          <View
            style={[
              styles.card,
              {backgroundColor: backgroundColor, borderColor: borderColor},
            ]}>
            <ImageBackground
              source={currentPost.image || require('../../images/post1.png')}
              style={styles.headerImage}
              resizeMode="cover">
              <View style={styles.headerOverlay}>
                {currentNsfw && <Text style={styles.nsfw}>NSFW</Text>}
                <Text style={styles.title}>{currentPost.title}</Text>
              </View>
            </ImageBackground>

            <View style={styles.scrollArea}>
              <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Text style={[styles.content, {color: textColor}]}>
                  {currentPost.description
                    ? currentPost.description
                    : 'No description'}
                </Text>
              </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={currentIndexState === 0}
                style={[
                  styles.arrowButton,
                  styles.leftButton,
                  {
                    backgroundColor:
                      currentIndexState === 0 ? '#ccc' : buttonBackgroundColor, // disabled color
                  },
                ]}
                onPress={handlePreviousPost}>
                <SvgXml
                  xml={Left_Arrow_SVG}
                  width={scale(9)}
                  height={scale(16)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={currentIndexState === posts.length - 1}
                style={[
                  styles.arrowButton,
                  styles.rightButton,
                  {
                    backgroundColor:
                      currentIndexState === posts.length - 1
                        ? '#ccc'
                        : buttonBackgroundColor,
                  },
                ]}
                onPress={handleNextPost}>
                <SvgXml
                  xml={Right_Arrow_SVG}
                  width={scale(9)}
                  height={scale(16)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.leftSide}>
              <SvgXml xml={isDarkModeOn ? heart_svg_white : heart_svg_black} />
              <Text style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                {currentPost.likes}
              </Text>
              <SvgXml xml={isDarkModeOn ? chat_icon_white : chat_icon_black} />
              <Text style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
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
    height: scaleHeight(110),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleHeight(20),
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    backgroundColor: 'transparent',
    paddingHorizontal: scale(16),
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: scaleHeight(10),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingRight: scale(8),
  },

  avatar: {
    marginRight: scale(8),
  },

  card: {
    borderRadius: scale(16),
    marginVertical: width * 0.04,
    borderWidth: 1,
    position: 'relative',
    minHeight: scaleHeight(400),
  },
  scrollArea: {
    maxHeight: scaleHeight(350),
  },
  headerImage: {
    height: height * 0.14,
    borderRadius: scale(16),
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
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderTopRightRadius: scale(14),
    borderBottomRightRadius: scale(14),
    fontSize: scale(12),
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: scale(20),
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
  },
  contentContainer: {
    padding: scale(16),
  },
  content: {
    fontSize: scale(14),
    marginBottom: scale(10),
    lineHeight: scale(24),
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(-20),
  },
  arrowButton: {
    width: scale(25),
    height: scaleHeight(45),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: scale(2)},
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: scale(4),
  },
  leftButton: {
    marginLeft: scale(-12),
  },
  rightButton: {
    marginRight: scale(-12),
  },
  arrowText: {
    fontSize: scale(20),
    color: '#000',
    fontWeight: 'bold',
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

export default StoryPostDetailsScreen;
