// import React, {useCallback, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   FlatList,
//   useWindowDimensions,
//   Pressable,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useTheme} from '../../context/ThemeContext';
// import {SvgXml} from 'react-native-svg';
// import {
//   avatar_svg,
//   block_user_svg,
//   chat_icon_white,
//   heart_svg2,
//   menu_svg_white,
//   share_svg,
//   share_svg_dark,
//   Flag_SVG,
// } from '../../utils/constant/TabSVGimage';
// import CustomActionModal from '../CustomActionModal';
// import {navigate} from '../../utils/NavigationUtil';

// const posts = [
//   {
//     id: '1',
//     username: 'user_1234',
//     time: '1h ago',
//     nsfw: false,
//     title: 'The Club Owner Argues why',
//     description:
//       'We were having a blast at the club, dancing and laughing with friends, when suddenly a stern-looking person approached us. "You need to leave now," they said, their voice cutting through the music. Confused, we exchanged glances, unsure of what we had done wrong. Just as we were about to protest, the lights flickered and the music stopped. A hush fell over the crowd, and then we heard a loud crash from the back of the club. Our hearts raced as we realized something unexpected was unfolding, something we never could have imagined happening on such a fun night.',
//     image: require('../../images/post1.png'),
//     likes: 22,
//     comments: 14,
//   },
//   {
//     id: '2',
//     username: 'user_5678',
//     time: '1h ago',
//     nsfw: true,
//     title: 'The Club Owner Argues why',
//     description:
//       'We were having a blast at the club, dancing and laughing with friends, when suddenly a stern-looking person approached us...',
//     image: require('../../images/post1.png'),
//     likes: 25,
//     comments: 18,
//   },
//   {
//     id: '3',
//     username: 'user_9101',
//     time: '1h ago',
//     nsfw: true,
//     title: 'The Club Owner Argues why',
//     description:
//       'We were having a blast at the club, dancing and laughing with friends, when suddenly a stern-looking person approached us...As I looked at the address, I realized it was quite far from where we were standing. I could see the worry etched on his face, and I knew I had to do more than just give him directions. I offered to walk with him to the nearest subway station, which would take him closer to his destination. He seemed relieved and grateful, and we started walking together. ',
//     image: require('../../images/post1.png'),
//     likes: 20,
//     comments: 11,
//   },
// ];

// const StoryScreen = ({navigation}) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#030303' : '#fff';
//   const textColor = isDarkModeOn ? '#fff' : '#000';
//   const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
//   const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
//   const {width} = useWindowDimensions();

//   const cardWidth = width * 0.92;
//   const cardHeight = width * 0.98;

//   const renderPost = useCallback(
//     ({item,index}) => (
//       <View style={styles.postContainer}>
//         <View style={styles.userRow}>
//           <View style={styles.avatar}>
//             <SvgXml xml={avatar_svg} width="32" height="32" />
//           </View>
//           <View>
//             <Text style={[styles.username, {color: textColor}]}>
//               {item.username}
//             </Text>
//             <Text style={[styles.time, {color: textColor}]}>{item.time}</Text>
//           </View>
//         </View>
//         <Pressable
//           onPress={() =>
//             navigate('StoryPostDetail', {
//               post: item,
//               nsfw: item.nsfw,
//               posts, // Pass the full posts array
//               currentIndex: index, // Pass the current post index
//             })
//           }>
//           <ImageBackground
//             source={item.image}
//             style={[styles.imageCard, {width: cardWidth, height: cardHeight}]}
//             imageStyle={{borderRadius: 16}}>
//             <View style={styles.topRow}>
//               {item.nsfw && (
//                 <View style={styles.nsfwTag}>
//                   <Text style={styles.nsfwText}>NSFW</Text>
//                 </View>
//               )}
//               <View style={{flex: 1}} />
//               <TouchableOpacity
//                 style={styles.menuIcon}
//                 onPress={() => setIsModalVisible(true)}>
//                 <SvgXml xml={menu_svg_white} width="20" height="10" />
//               </TouchableOpacity>
//             </View>

//             <LinearGradient
//               colors={['transparent', 'rgba(0, 0, 0, 0.7)', 'rgba(0,0,0,0.7)']}
//               style={styles.bottomShadow}>
//               <View style={styles.overlay}>
//                 <View style={{paddingBottom: 20}}>
//                   <Text style={styles.title}>{item.title}</Text>
//                   {item.description && (
//                     <>
//                       <Text style={styles.description} numberOfLines={5}>
//                         {item.description}
//                       </Text>
//                       <TouchableOpacity
//                         style={styles.readMoreBtn}
//                         onPress={() =>
//                           navigate('StoryPostDetail', {
//                             post: item,
//                             nsfw: item.nsfw,
//                             posts, // Pass the full posts array
//                             currentIndex: index, // Pass the current post index
//                           })
//                         }>
//                         <Text style={styles.readMoreText}>READ MORE</Text>
//                       </TouchableOpacity>
//                     </>
//                   )}
//                 </View>
//                 {item.likes !== undefined && (
//                   <View style={styles.reactions}>
//                     <SvgXml xml={heart_svg2} width="18" height="17" />
//                     <Text style={styles.reactionText}>{item.likes}</Text>
//                     <SvgXml
//                       xml={chat_icon_white}
//                       width="18"
//                       height="17"
//                       style={{marginLeft: 10}}
//                     />
//                     <Text style={styles.reactionText}>{item.comments}</Text>
//                   </View>
//                 )}
//               </View>
//             </LinearGradient>
//           </ImageBackground>
//         </Pressable>
//       </View>
//     ),
//     [textColor, cardWidth, cardHeight, navigation],
//   );

//   return (
//     <>
//       <View style={[styles.container, {backgroundColor}]}>
//         <FlatList
//           data={posts}
//           keyExtractor={item => item.id}
//           renderItem={renderPost}
//           contentContainerStyle={{paddingBottom: 16}}
//           showsVerticalScrollIndicator={false}
//           removeClippedSubviews={true}
//           initialNumToRender={3}
//           maxToRenderPerBatch={5}
//           windowSize={5}
//         />
//       </View>
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
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   postContainer: {
//     marginBottom: 24,
//     width: '100%',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     width: '100%',
//     marginBottom: 10,
//   },
//   bottomShadow: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   topRow: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingRight: 15,
//     zIndex: 2,
//   },
//   menuIcon: {
//     zIndex: 1,
//     paddingTop: 10,
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
//     zIndex: 1,
//   },
//   nsfwText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   imageCard: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     fontFamily: 'Arial',
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 8,
//     textShadowColor: 'rgba(0,0,0,10)',
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 3,
//     lineHeight: 25,
//   },
//   description: {
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   readMoreBtn: {
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginTop: 8,
//     marginBottom: 12,
//   },
//   readMoreText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   reactions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     bottom: -6,
//   },
//   reactionText: {
//     color: 'white',
//     marginLeft: 4,
//     fontSize: 12,
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

// export default StoryScreen;

import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_white,
  Flag_SVG,
  heart_svg2,
  menu_svg_white,
  share_svg,
  share_svg_dark,
} from '../../utils/constant/TabSVGimage';
import CustomActionModal from '../CustomActionModal';
import {navigate} from '../../utils/NavigationUtil';
import {StoryGetApi} from '../../services/api';

const StoryScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#fff';
  const readMorebackgroundColor = isDarkModeOn ? '#fff' : '#392EBD';
  const readMoreTextColor = isDarkModeOn ? '#000' : '#fff';

  const textColor = isDarkModeOn ? '#fff' : '#000';

  const {width} = useWindowDimensions();
  const cardWidth = width * 0.92;
  const cardHeight = width * 0.98;

  const fetchStories = async () => {
    try {
      const response = await StoryGetApi.getStories();
      const storiesData = Array.isArray(response) ? response : response?.data;

      const getRelativeTime = dateString => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const units = [
          {label: 'y', seconds: 31536000},
          {label: 'm', seconds: 2592000},
          {label: 'd', seconds: 86400},
          {label: 'h', seconds: 3600},
          {label: 'min', seconds: 60},
          {label: 'second', seconds: 1},
        ];

        for (const unit of units) {
          const interval = Math.floor(diffInSeconds / unit.seconds);
          if (interval >= 1) {
            return `${interval}${unit.label} ago`;
          }
        }
        return 'just now';
      };

      const mappedPosts = storiesData?.map(story => ({
        id: story.id,
        username: story.address?.region || 'Anonymous',
        time: getRelativeTime(story.createdAt),
        nsfw: story.isNsfw,
        title: story.storyTitle,
        description: story.text,
        image: {uri: story.mediaUrl},
        likes: story.heartsCount,
        comments: story.repliesCount,
      }));

      console.log('Fetched stories:', mappedPosts);
      setPosts(mappedPosts || []);
    } catch (err) {
      console.error('Failed to fetch stories:', err);
      setPosts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStories();
  };

  const renderPost = useCallback(
    ({item, index}) => (
      <View style={styles.postContainer}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <SvgXml xml={avatar_svg} width="32" height="32" />
          </View>
          <View>
            <Text style={[styles.username, {color: textColor}]}>
              {item.username}
            </Text>
            <Text style={[styles.time, {color: textColor}]}>{item.time}</Text>
          </View>
        </View>
        <Pressable
          onPress={() =>
            navigate('StoryPostDetail', {
              post: item,
              nsfw: item.nsfw,
              posts,
              currentIndex: index,
            })
          }>
          <ImageBackground
            source={item.image}
            style={[styles.imageCard, {width: cardWidth, height: cardHeight}]}
            imageStyle={{borderRadius: 16}}
            resizeMode="cover">
            <View style={styles.topRow}>
              {item.nsfw && (
                <View style={styles.nsfwTag}>
                  <Text style={styles.nsfwText}>NSFW</Text>
                </View>
              )}
              <View style={{flex: 1}} />
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => setIsModalVisible(true)}>
                <SvgXml xml={menu_svg_white} width="20" height="10" />
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.7)', 'rgba(0,0,0,0.7)']}
              style={styles.bottomShadow}>
              <View style={styles.overlay}>
                <View style={{paddingBottom: 20}}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.description && (
                    <>
                      <Text style={styles.description} numberOfLines={4}>
                        {item.description}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.readMoreBtn,
                          {backgroundColor: readMorebackgroundColor},
                        ]}
                        onPress={() =>
                          navigate('StoryPostDetail', {
                            post: item,
                            nsfw: item.nsfw,
                            posts,
                            currentIndex: index,
                          })
                        }>
                        <Text
                          style={[
                            styles.readMoreText,
                            {color: readMoreTextColor},
                          ]}>
                          READ MORE
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.reactions}>
                  <SvgXml xml={heart_svg2} width="18" height="17" />
                  <Text style={styles.reactionText}>{item.likes}</Text>
                  <SvgXml
                    xml={chat_icon_white}
                    width="18"
                    height="17"
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.reactionText}>{item.comments}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      </View>
    ),
    [textColor, cardWidth, cardHeight, posts],
  );

  const keyExtractor = useCallback(
    item => item.id?.toString() || Math.random().toString(),
    [],
  );

  if (loading && posts.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator
          size="large"
          color={isDarkModeOn ? '#FFFFFF' : '#392EBD'}
        />
      </View>
    );
  }

  return (
    <>
      <View style={[styles.container, {backgroundColor}]}>
        <FlatList
          ref={flatListRef}
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderPost}
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          scrollEnabled={true}
          decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.98}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={10}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
          getItemLayout={(data, index) => ({
            length: cardHeight + 120,
            offset: (cardHeight + 120) * index,
            index,
          })}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDarkModeOn ? '#fff' : '#392EBD'}
            />
          }
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <Text style={{color: textColor}}>No posts available</Text>
              </View>
            )
          }
          ListFooterComponent={
            loading && posts.length > 0 ? (
              <ActivityIndicator
                size="small"
                color="#888"
                style={{marginVertical: 16}}
              />
            ) : null
          }
        />
      </View>

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
  container: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: '4%',
  },
  postContainer: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
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
  imageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    zIndex: 2,
  },
  menuIcon: {
    zIndex: 1,
    paddingTop: 8,
    paddingRight: 15,
  },
  nsfwTag: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  nsfwText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  overlay: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  readMoreBtn: {
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 6,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  reactionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 13,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default StoryScreen;
