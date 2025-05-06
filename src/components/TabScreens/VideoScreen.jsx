// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import Video from 'react-native-video';
// import {SvgXml} from 'react-native-svg';
// import {
//   avatar_svg,
//   chat_icon_black,
//   ChatIcon,
//   comment_svg,
//   heart_svg,
//   heart_svg2,
//   menu_svg_dark,
//   share_svg,
//   share_svg_dark,
// } from '../../utils/constant/TabSVGimage';

// const {width, height} = Dimensions.get('window');
// const videoHeight = (width * 19) / 16;

// const videoUrl = 'https://your-video-url.mp4';

// const VideoScreen = () => {
//   const videoRef = useRef(null);
//   const [paused, setPaused] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [lastTap, setLastTap] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleTap = () => {
//     const now = Date.now();
//     if (lastTap && now - lastTap < 300) {
//       setLiked(true);
//       setTimeout(() => setLiked(false), 1000);
//     } else {
//       setPaused(!paused);
//     }
//     setLastTap(now);
//   };

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.container}>
//           {/* NSFW Tag */}
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View style={styles.nsfwTag}>
//               <Text style={styles.nsfwText}>NSFW</Text>
//             </View>
//             <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//               <SvgXml
//                 xml={menu_svg_dark}
//                 width={width * 0.05}
//                 height={width * 0.05}
//                 style={{position: 'absolute', top: 8, right: 15}}
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Video Player */}
//           <TouchableOpacity
//             activeOpacity={1}
//             style={styles.videoContainer}
//             onPress={handleTap}>
//             <Video
//               ref={videoRef}
//               source={{uri: videoUrl}}
//               style={styles.video}
//               resizeMode="cover"
//               paused={paused}
//               repeat={true}
//               muted={muted}
//               onError={e => console.log('Video Error:', e)}
//             />
//           </TouchableOpacity>

//           {/* Caption */}
//           <Text style={styles.caption}>
//             The music blasting in the background was totally vibing, creating an
//             atmosphere that was just next level...
//           </Text>

//           {/* Bottom Actions */}
//           <View style={styles.bottomContainer}>
//             <View style={styles.userInfo}>
//               <View style={styles.avatar}>
//                 <SvgXml
//                   xml={avatar_svg}
//                   width={width * 0.07}
//                   height={width * 0.07}
//                 />
//               </View>
//               <View style={{flexDirection: 'column'}}>
//                 <Text style={styles.username}>User_1234</Text>
//                 <Text style={styles.timeAgo}>1h ago</Text>
//               </View>
//             </View>

//             <View style={styles.actions}>
//               <TouchableOpacity style={styles.actionButton}>
//                 <SvgXml
//                   xml={liked ? heart_svg : heart_svg2}
//                   width={18}
//                   height={16}
//                 />
//                 <Text style={styles.actionText}>45</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <SvgXml xml={comment_svg} width={18} height={16} />
//                 <Text style={styles.actionText}>10</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <View style={styles.iconWrapper}>
//                   <SvgXml xml={share_svg} width={16} height={14} />
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.chatButton}>
//                 <SvgXml xml={ChatIcon} width={14.67} height={14} />
//                 <Text style={styles.chatText}>Chat</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//       {isModalVisible && (
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.modalOption}>Share Post</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.modalOptionDanger}>Flag Post</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.modalOptionDanger}>Block User</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#030303',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   container: {
//     flex: 1,
//     // paddingHorizontal: width * 0.03,
//     // paddingVertical: height * 0.01,
//     backgroundColor: '#030303',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   nsfwTag: {
//     backgroundColor: 'red',
//     paddingHorizontal: width * 0.02,
//     paddingVertical: height * 0.004,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 14,
//     borderBottomRightRadius: 10,
//   },
//   nsfwText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: width * 0.03,
//   },
//   videoContainer: {
//     width: '100%',
//     height: videoHeight,
//     borderRadius: width * 0.03,
//     overflow: 'hidden',
//     marginTop: height * 0.01,
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   caption: {
//     fontSize: width * 0.035,
//     color: '#fff',
//     marginTop: height * 0.05,
//     textAlign: 'center',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: width * 0.1,
//     height: width * 0.1,
//     borderRadius: width * 0.05,
//     borderWidth: 1,
//     borderColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   username: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: width * 0.02,
//     fontSize: width * 0.04,
//   },
//   timeAgo: {
//     color: '#aaa',
//     marginLeft: width * 0.02,
//     fontSize: width * 0.03,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: Platform.OS === 'android' ? height * 0.01 : height * 0.02,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.04,
//     paddingVertical: height * 0.015,
//     backgroundColor: '#000',
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: width * 0.01,
//   },
//   actionText: {
//     color: '#fff',
//     paddingLeft: 3,
//     fontSize: width * 0.032,
//     textAlign: 'center',
//   },
//   iconWrapper: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: width * 0.02,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chatButton: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: width * 0.04,
//     paddingVertical: height * 0.01,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     marginLeft: width * 0.02,
//   },
//   chatText: {
//     fontSize: width * 0.035,
//     color: '#000',
//   },
//   modalOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#121212',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//   },
//   modalContent: {
//     paddingVertical: 10,
//   },
//   modalOption: {
//     fontSize: 16,
//     color: '#fff',
//     paddingVertical: 12,
//   },
//   modalOptionDanger: {
//     fontSize: 16,
//     color: 'red',
//     paddingVertical: 12,
//   },
// });

// export default VideoScreen;

import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  Modal,
} from 'react-native';
import Video from 'react-native-video';
import {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_black,
  ChatIcon,
  comment_svg,
  Flag_SVG,
  heart_svg2,
  menu_svg_dark,
  share_svg,
  share_svg_dark,
} from '../../utils/constant/TabSVGimage';
import {useTheme} from '../../context/ThemeContext';
import CustomActionModal from '../CustomActionModal';

const {width, height} = Dimensions.get('window');
const videoHeight = (width * 19) / 16;

const videoUrl = 'https://your-video-url.mp4';

const VideoScreen = () => {
  const {isDarkModeOn} = useTheme();
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTap = () => {
    setPaused(prev => !prev);
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* NSFW Tag */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.nsfwTag}>
              <Text style={styles.nsfwText}>NSFW</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{zIndex: 999}} 
            >
              <SvgXml
                xml={menu_svg_dark}
                width={width * 0.05}
                height={width * 0.05}
                style={{position: 'absolute', top: 8, right: 15}}
              />
            </TouchableOpacity>
          </View>

          {/* Video Player */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.videoContainer}
            onPress={handleTap}>
            <Video
              ref={videoRef}
              source={{uri: videoUrl}}
              style={styles.video}
              resizeMode="cover"
              paused={paused}
              repeat={true}
              muted={muted}
              onError={e => console.log('Video Error:', e)}
            />
          </TouchableOpacity>

          {/* Caption */}
          <Text style={styles.caption}>
            The music blasting in the background was totally vibing, creating an
            atmosphere that was just next level...
          </Text>

          {/* Bottom Actions */}
          <View style={styles.bottomContainer}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <SvgXml
                  xml={avatar_svg}
                  width={width * 0.07}
                  height={width * 0.07}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.username}>User_1234</Text>
                <Text style={styles.timeAgo}>1h ago</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <SvgXml xml={heart_svg2} width={18} height={16} />
                <Text style={styles.actionText}>45</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <SvgXml xml={comment_svg} width={18} height={16} />
                <Text style={styles.actionText}>10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.iconWrapper}>
                  <SvgXml xml={share_svg} width={16} height={14} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatButton}>
                <SvgXml xml={ChatIcon} width={14.67} height={14} />
                <Text style={styles.chatText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Modal */}
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
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030303',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dragHandleDark: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: -10,
    marginBottom: 16,
  },

  container: {
    flex: 1,
    backgroundColor: '#030303',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  nsfwTag: {
    backgroundColor: 'red',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.004,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 10,
  },
  nsfwText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.03,
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    borderRadius: width * 0.03,
    overflow: 'hidden',
    marginTop: height * 0.01,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  caption: {
    fontSize: width * 0.035,
    color: '#fff',
    marginTop: height * 0.05,
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  timeAgo: {
    color: '#aaa',
    marginLeft: width * 0.02,
    fontSize: width * 0.03,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? height * 0.01 : height * 0.02,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    backgroundColor: '#000',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.01,
  },
  actionText: {
    color: '#fff',
    paddingLeft: 3,
    fontSize: width * 0.032,
    textAlign: 'center',
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginLeft: width * 0.02,
  },
  chatText: {
    fontSize: width * 0.035,
    color: '#000',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalOverlay: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  modalContent: {
    paddingVertical: 10,
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
});

export default VideoScreen;
