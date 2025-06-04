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



// import React, {useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   ActivityIndicator,
//   Linking,
//   FlatList,
// } from 'react-native';
// import Video from 'react-native-video';
// import {SvgXml} from 'react-native-svg';
// import {
//   avatar_svg,
//   block_user_svg,
//   chat_icon_black,
//   ChatIcon,
//   comment_svg,
//   Flag_SVG,
//   heart_svg2,
//   menu_svg_dark,
//   share_svg,
//   share_svg_dark,
// } from '../../utils/constant/TabSVGimage';
// import {useTheme} from '../../context/ThemeContext';
// import CustomActionModal from '../CustomActionModal';

// const {width, height} = Dimensions.get('window');
// const videoHeight = (width * 19) / 16;

// const VideoScreen = () => {
//   // State for fetched posts
//   const [posts, setPosts] = useState([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const flatListRef = useRef(null);

//   const {isDarkModeOn} = useTheme();
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';

//   // Fetch posts from API
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setIsLoadingPosts(true);
//         const response = await fetch(
//           'https://hush-post-service.onrender.com/api/watch',
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPosts(data);
//         setIsLoadingPosts(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoadingPosts(false);
//         console.error('Error fetching posts:', err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const formatTimeAgo = dateString => {
//     try {
//       const now = new Date();
//       const postDate = new Date(dateString);
//       const diffInSeconds = Math.floor((now - postDate) / 1000);

//       if (diffInSeconds < 60) return 'Just now';
//       if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//       if (diffInSeconds < 86400)
//         return `${Math.floor(diffInSeconds / 3600)}h ago`;
//       return `${Math.floor(diffInSeconds / 86400)}d ago`;
//     } catch (e) {
//       return 'Recently';
//     }
//   };

//   const handleVideoPress = mediaUrl => {
//     if (!mediaUrl) return;

//     if (
//       mediaUrl.includes('youtube.com') ||
//       mediaUrl.includes('youtu.be') ||
//       mediaUrl.includes('instagram.com')
//     ) {
//       Linking.openURL(mediaUrl);
//     }
//   };

//   const onViewableItemsChanged = useRef(({viewableItems}) => {
//     if (viewableItems.length > 0) {
//       setCurrentVisibleIndex(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 90,
//   }).current;

//   const renderItem = ({item, index}) => {
//     const isCurrent = index === currentVisibleIndex;

//     return (
//       <View style={styles.videoItemContainer}>
//         {/* NSFW Tag */}
//         {item.isNsfw && (
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View style={styles.nsfwTag}>
//               <Text style={styles.nsfwText}>NSFW</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => setIsModalVisible(true)}
//               style={{zIndex: 999}}>
//               <SvgXml
//                 xml={menu_svg_dark}
//                 width={width * 0.05}
//                 height={width * 0.05}
//                 style={{position: 'absolute', top: 8, right: 15}}
//               />
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Video Player */}
//         <TouchableOpacity
//           activeOpacity={1}
//           style={styles.videoContainer}
//           onPress={() => handleVideoPress(item.mediaUrl)}>
//           <Video
//             source={{uri: item.mediaUrl}}
//             style={styles.video}
//             resizeMode="cover"
//             paused={!isCurrent}
//             repeat={true}
//             muted={false}
//             controls={true} // Add controls for user interaction
//           />
//         </TouchableOpacity>

//         {/* Rest of your code remains the same */}
//         <Text style={styles.caption}>{item.text}</Text>

//         {/* Bottom Actions */}
//         <View style={styles.bottomContainer}>
//           <View style={styles.userInfo}>
//             <View style={styles.avatar}>
//               <SvgXml
//                 xml={avatar_svg}
//                 width={width * 0.07}
//                 height={width * 0.07}
//               />
//             </View>
//             <View style={{flexDirection: 'column'}}>
//               <Text style={styles.username}>{item.userId.substring(0, 8)}</Text>
//               <Text style={styles.timeAgo}>
//                 {formatTimeAgo(item.createdAt)} •{' '}
//                 {item.address?.region || 'Unknown'}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.actions}>
//             <TouchableOpacity style={styles.actionButton}>
//               <SvgXml xml={heart_svg2} width={18} height={16} />
//               <Text style={styles.actionText}>{item.heartsCount}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <SvgXml xml={comment_svg} width={18} height={16} />
//               <Text style={styles.actionText}>{item.repliesCount}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <View style={styles.iconWrapper}>
//                 <SvgXml xml={share_svg} width={16} height={14} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.chatButton}>
//               <SvgXml xml={ChatIcon} width={14.67} height={14} />
//               <Text style={styles.chatText}>Chat</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (isLoadingPosts) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         <ActivityIndicator size="large" color="#fff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         <Text style={{color: '#fff'}}>Error loading posts: {error}</Text>
//       </View>
//     );
//   }

//   if (!posts.length) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         <Text style={{color: '#fff'}}>No posts available</Text>
//       </View>
//     );
//   }

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea}>
//         <FlatList
//           ref={flatListRef}
//           data={posts}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           pagingEnabled
//           showsVerticalScrollIndicator={false}
//           onViewableItemsChanged={onViewableItemsChanged}
//           viewabilityConfig={viewabilityConfig}
//           snapToInterval={height}
//           snapToAlignment="start"
//           decelerationRate="fast"
//           initialNumToRender={3}
//           maxToRenderPerBatch={3}
//           windowSize={5}
//         />
//       </SafeAreaView>

//       {/* Modal */}
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
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#030303',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#030303',
//   },
//   videoItemContainer: {
//     width: width,
//     height: height,
//     justifyContent: 'center',
//   },
//   nsfwTag: {
//     backgroundColor: 'red',
//     paddingHorizontal: width * 0.02,
//     paddingVertical: height * 0.004,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 14,
//     borderBottomRightRadius: 10,
//     position: 'absolute',
//     top: Platform.OS === 'android' ? 10 : 40,
//     left: 10,
//     zIndex: 999,
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
//     backgroundColor: '#000',
//   },
//   caption: {
//     fontSize: width * 0.035,
//     color: '#fff',
//     marginTop: height * 0.05,
//     textAlign: 'center',
//     paddingHorizontal: width * 0.05,
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
// });

// export default VideoScreen;

