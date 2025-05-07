// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   Modal,
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

// const videoUrl = 'https://your-video-url.mp4';

// const VideoScreen = () => {
//   const {isDarkModeOn} = useTheme();
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
//   const videoRef = useRef(null);
//   const [paused, setPaused] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleTap = () => {
//     setPaused(prev => !prev);
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
//             <TouchableOpacity
//               onPress={() => setIsModalVisible(true)}
//               style={{zIndex: 999}} 
//             >
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
//                 <SvgXml xml={heart_svg2} width={18} height={16} />
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
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   dragHandleDark: {
//     alignSelf: 'center',
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     marginTop: -10,
//     marginBottom: 16,
//   },

//   container: {
//     flex: 1,
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
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalOverlay: {
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingVertical: 30,
//     paddingHorizontal: 15,
//   },
//   modalContent: {
//     paddingVertical: 10,
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
// });

// export default VideoScreen;



// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator
// } from 'react-native';
// import Video from 'react-native-video';
// import { SvgXml } from 'react-native-svg';
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
// import { useTheme } from '../../context/ThemeContext';
// import CustomActionModal from '../CustomActionModal';
// import { WatchPosts } from '../../services/api';

// const { width, height } = Dimensions.get('window');
// const videoHeight = (width * 19) / 16;

// const VideoScreen = () => {
//   const { isDarkModeOn } = useTheme();
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
//   const videoRef = useRef(null);
//   const [paused, setPaused] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleTap = () => {
//     setPaused(prev => !prev);
//   };

//   // Function to format createdAt to "time ago"
//   const getTimeAgo = (createdAt) => {
//     if (!createdAt) return 'Just now';
    
//     const now = new Date();
//     const created = new Date(createdAt);
//     const diffInSeconds = Math.floor((now - created) / 1000);

//     if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
//     const minutes = Math.floor(diffInSeconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     return `${days}d ago`;
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await WatchPosts.getWatchPosts({});
        
//         console.log('Full API Response:', response);
        
//         // More flexible data extraction
//         const receivedPosts = 
//           response?.data?.posts || 
//           response?.data || 
//           response?.posts || 
//           (Array.isArray(response) ? response : []);
        
//         if (!Array.isArray(receivedPosts)) {
//           throw new Error('Received posts data is not an array');
//         }
        
//         setPosts(receivedPosts.filter(post => post !== null && post !== undefined));
//       } catch (err) {
//         console.error('Error fetching posts:', err);
//         setError(err.message || 'Failed to load posts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Render loading state
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={[styles.container, styles.centerContent]}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={styles.loadingText}>Loading posts...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={[styles.container, styles.centerContent]}>
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity 
//             style={styles.retryButton}
//             onPress={() => {
//               setError(null);
//               setLoading(true);
//               fetchPosts();
//             }}
//           >
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Render empty state
//   if (!loading && posts.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={[styles.container, styles.centerContent]}>
//           <Text style={styles.emptyText}>No posts available</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Get the first post
//   const post = posts[0];

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.container}>
//           {/* NSFW Tag */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             {post?.isNsfw && (
//               <View style={styles.nsfwTag}>
//                 <Text style={styles.nsfwText}>NSFW</Text>
//               </View>
//             )}
//             <TouchableOpacity
//               onPress={() => setIsModalVisible(true)}
//               style={{ zIndex: 999 }}
//             >
//               <SvgXml
//                 xml={menu_svg_dark}
//                 width={width * 0.05}
//                 height={width * 0.05}
//                 style={{ position: 'absolute', top: 8, right: 15 }}
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Video Player */}
//           <TouchableOpacity activeOpacity={1} style={styles.videoContainer} onPress={handleTap}>
//             <Video
//               ref={videoRef}
//               source={{ uri: post?.mediaUrl || 'https://youtu.be/7fHCj5l01Qg?si=VhArFpFxtJpt8ZgR' }}
//               style={styles.video}
//               resizeMode="cover"
//               paused={paused}
//               repeat={true}
//               muted={muted}
//               onError={e => console.log('Video Error:', e)}
//             />
//           </TouchableOpacity>

//           {/* Caption */}
//           {post?.text && (
//             <Text style={styles.caption}>{post.text}</Text>
//           )}

//           {/* Bottom Actions */}
//           <View style={styles.bottomContainer}>
//             <View style={styles.userInfo}>
//               <View style={styles.avatar}>
//                 <SvgXml xml={avatar_svg} width={width * 0.07} height={width * 0.07} />
//               </View>
//               <View style={{ flexDirection: 'column' }}>
//                 <Text style={styles.username}>
//                   {post?.userId ? post.userId.slice(0, 8) : 'Anonymous'}
//                 </Text>
//                 <Text style={styles.timeAgo}>
//                   {getTimeAgo(post?.createdAt)}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.actions}>
//               <TouchableOpacity style={styles.actionButton}>
//                 <SvgXml xml={heart_svg2} width={18} height={16} />
//                 <Text style={styles.actionText}>{post?.heartsCount || 0}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <SvgXml xml={comment_svg} width={18} height={16} />
//                 <Text style={styles.actionText}>{post?.repliesCount || 0}</Text>
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
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#030303',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   centerContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   emptyText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   retryButton: {
//     backgroundColor: '#444',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   retryText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   dragHandleDark: {
//     alignSelf: 'center',
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     marginTop: -10,
//     marginBottom: 16,
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
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalOverlay: {
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingVertical: 30,
//     paddingHorizontal: 15,
//   },
//   modalContent: {
//     paddingVertical: 10,
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
// });

// export default VideoScreen;

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import { SvgXml } from 'react-native-svg';
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
import { useTheme } from '../../context/ThemeContext';
import CustomActionModal from '../CustomActionModal';
import { WatchPosts } from '../../services/api';

const { width, height } = Dimensions.get('window');
const videoHeight = (width * 19) / 16;

// Utility function to detect video source and convert Instagram URLs to embed format
const getVideoSource = (url) => {
  console.log('Processing URL:', url);
  if (!url) return { type: 'unknown', url };

  // YouTube URL detection
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    console.log('YouTube Video ID:', youtubeMatch[1]);
    return { type: 'youtube', videoId: youtubeMatch[1] };
  }

  // Instagram URL detection
  const instagramRegex = /instagram\.com/;
  if (instagramRegex.test(url)) {
    console.log('Instagram URL detected');
    const postIdMatch = url.match(/\/p\/([^\/]+)/);
    const embedUrl = postIdMatch ? `https://www.instagram.com/p/${postIdMatch[1]}/embed` : url;
    return { type: 'instagram', url: embedUrl };
  }

  // Direct video file detection
  const videoFileRegex = /\.(mp4|mov|avi|webm)$/i;
  if (videoFileRegex.test(url)) {
    console.log('Direct video URL detected');
    return { type: 'video', url };
  }

  console.log('Unknown video type');
  return { type: 'unknown', url };
};

// Single video item component
const VideoItem = ({ post, isVisible, onTap }) => {
  const { isDarkModeOn } = useTheme();
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(!isVisible); // Pause when not visible
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const videoSource = getVideoSource(post?.mediaUrl);

  // Update paused state based on visibility
  useEffect(() => {
    setPaused(!isVisible);
  }, [isVisible]);

  // Function to format createdAt to "time ago"
  const getTimeAgo = (createdAt) => {
    if (!createdAt) return 'Just now';
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor((now - created) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <View style={styles.container}>
      {/* NSFW Tag and Menu */}
      <View style={styles.headerContainer}>
        {post?.isNsfw && (
          <View style={styles.nsfwTag}>
            <Text style={styles.nsfwText}>NSFW</Text>
          </View>
        )}
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.menuButton}>
          <SvgXml
            xml={menu_svg_dark}
            width={width * 0.05}
            height={width * 0.05}
          />
        </TouchableOpacity>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {videoSource.type === 'youtube' ? (
          <YoutubePlayer
            height={videoHeight}
            play={!paused}
            videoId={videoSource.videoId}
            onError={(e) => console.log('YouTube Error:', e)}
          />
        ) : videoSource.type === 'instagram' ? (
          <WebView
            source={{ uri: videoSource.url }}
            style={styles.video}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            androidHardwareAccelerationDisabled={false}
            onError={(e) => console.log('WebView Error:', e)}
            onMessage={(event) => console.log('WebView Message:', event.nativeEvent.data)}
          />
        ) : videoSource.type === 'video' ? (
          <>
            <Video
              ref={videoRef}
              source={{ uri: videoSource.url }}
              style={styles.video}
              resizeMode="contain"
              paused={paused}
              repeat={true}
              muted={muted}
              useTextureView={false}
              onLoad={(data) => console.log('Video Loaded:', data)}
              onError={(e) => console.log('Video Error:', e)}
              onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
            />
            {buffering && (
              <View style={styles.bufferingContainer}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Unsupported video format</Text>
          </View>
        )}
      </View>

      {/* Caption */}
      {post?.text && <Text style={styles.caption}>{post.text}</Text>}

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <SvgXml xml={avatar_svg} width={width * 0.07} height={width * 0.07} />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.username}>
              {post?.userId ? `User_${post.userId.slice(0, 4)}` : 'Anonymous'}
            </Text>
            <Text style={styles.timeAgo}>{getTimeAgo(post?.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <SvgXml xml={heart_svg2} width={24} height={24} />
            <Text style={styles.actionText}>{post?.heartsCount || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <SvgXml xml={comment_svg} width={24} height={24} />
            <Text style={styles.actionText}>{post?.repliesCount || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <SvgXml xml={share_svg} width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <SvgXml xml={ChatIcon} width={20} height={20} />
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
};

const VideoScreen = () => {
  const { isDarkModeOn } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await WatchPosts.getWatchPosts({});
        console.log('Full API Response:', response);
        const receivedPosts =
          response?.data?.posts ||
          response?.data ||
          response?.posts ||
          (Array.isArray(response) ? response : []);
        if (!Array.isArray(receivedPosts)) {
          throw new Error('Received posts data is not an array');
        }
        setPosts(receivedPosts.filter((post) => post !== null && post !== undefined));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle scroll to update current index
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              fetchPosts();
            }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render empty state
  if (!loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.emptyText}>No posts available</Text>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={({ item, index }) => (
          <VideoItem
            post={item}
            isVisible={index === currentIndex}
            onTap={() => setPaused((prev) => !prev)}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    backgroundColor: '#000',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 20,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%', // Ensure the header takes full width
  },
  nsfwTag: {
    backgroundColor: '#FF0000',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  nsfwText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  caption: {
    color: '#fff',
    fontSize: width * 0.038,
    marginVertical: 12,
    lineHeight: width * 0.05,
    width: '100%', // Ensure the caption takes full width
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%', // Ensure the bottom container takes full width
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 12,
  },
  userTextContainer: {
    flexDirection: 'column',
  },
  username: {
    color: '#fff',
    fontSize: width * 0.038,
    fontWeight: 'bold',
  },
  timeAgo: {
    color: '#999',
    fontSize: width * 0.032,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  actionText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: width * 0.035,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  chatText: {
    color: '#000',
    marginLeft: 6,
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: videoHeight,
    backgroundColor: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.04,
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: width * 0.04,
  },
  retryButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  emptyText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
});

export default VideoScreen;