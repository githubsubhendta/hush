// import React, {useState, useEffect, useCallback, useRef} from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   Button,
// } from 'react-native';
// import {TrendingPosts} from '../../services/api';
// import {useNetworkStatus} from '../../hooks/useNetworkStatus';
// import PostItem from '../PostItem';
// import {useTheme} from '../../context/ThemeContext';
// import {useModernMode} from '../../context/ModerModeContext';
// import PostItemModernMode from '../PostItemModernMode';
// import {useBottomTab} from '../../context/BottomTabContext';
// import { useScrollDirection } from '../../context/scrollView';

// const HotTabScreen = () => {
//   const {hideTab, showTab} = useBottomTab();

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const {isDarkModeOn} = useTheme();
//   const {isModernOn} = useModernMode();
//   const isOnline = useNetworkStatus();

//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';

//   const handleScroll = useScrollDirection(showTab, hideTab);

//   const fetchPosts = useCallback(
//     async (pageNumber, isInitial = false) => {
//       if (!hasMore || isFetchingMore || !isOnline) return;
//       if (!isInitial) setIsFetchingMore(true);

//       try {
//         const response = await TrendingPosts.getTrendingPosts({
//           page: pageNumber,
//           limit: 10,
//         });
//         if (Array.isArray(response) && response.length > 0) {
//           setPosts(prev => (isInitial ? response : [...prev, ...response]));
//           setPage(pageNumber + 1);
//         } else {
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.error('Fetch error:', err.message || err);
//       } finally {
//         if (isInitial) setLoading(false);
//         setIsFetchingMore(false);
//       }
//     },
//     [hasMore, isFetchingMore, isOnline],
//   );

//   useEffect(() => {
//     if (isOnline) fetchPosts(1, true);
//     else setLoading(false);
//   }, [isOnline, fetchPosts]);

//   const renderItem = useCallback(
//     ({item}) =>
//       isModernOn ? (
//         <PostItemModernMode
//           image={item?.mediaUrl}
//           avatar={require('../../images/avatar.png')}
//           postText={item?.text}
//           time={item?.createdAt}
//           commentCount={item?.repliesCount}
//           likes={item?.heartsCount}
//         />
//       ) : (
//         <PostItem
//           image={item?.mediaUrl}
//           text={item?.text}
//           likes={item?.heartsCount}
//           commentCount={item?.repliesCount}
//           time={item?.createdAt}
//         />
//       ),
//     [isModernOn],
//   );

//   if (loading) {
//     return (
//       <View style={[styles.loadingContainer, {backgroundColor}]}>
//         <ActivityIndicator size="large" color="#392EBD" />
//       </View>
//     );
//   }

//   if (!isOnline) {
//     return (
//       <View style={[styles.offlineContainer, {backgroundColor}]}>
//         <Text style={styles.offlineText}>
//           You are offline. Please check your internet connection.
//         </Text>
//         <Button title="Retry" onPress={() => fetchPosts(1, true)} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, {backgroundColor}]}>
//       <FlatList
//         data={posts}
//         numColumns={isModernOn ? 1 : 2}
//         renderItem={renderItem}
//         keyExtractor={item => item.id?.toString() || Math.random().toString()}
//         key={isModernOn ? 'singleColumn' : 'doubleColumn'}
//         contentContainerStyle={styles.list}
//         onEndReached={() => fetchPosts(page)}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={
//           isFetchingMore ? (
//             <ActivityIndicator size="small" color="#E63946" />
//           ) : null
//         }
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   list: {
//     paddingBottom: 80,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   offlineContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   offlineText: {
//     fontSize: 18,
//     color: 'red',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default HotTabScreen;

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import {TrendingPosts} from '../../services/api';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
import PostItem from '../PostItem';
import {useTheme} from '../../context/ThemeContext';
import {useModernMode} from '../../context/ModerModeContext';
import PostItemModernMode from '../PostItemModernMode';
import {useBottomTab} from '../../context/BottomTabContext';
import {useScrollDirection} from '../../context/scrollView';
import BannerAd from '../AppLovinMax';
import {useNavigation} from '@react-navigation/native';

const HotTabScreen = () => {
  const {hideTab, showTab} = useBottomTab();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {isDarkModeOn} = useTheme();
  const {isModernOn} = useModernMode();
  const isOnline = useNetworkStatus();
  const navigation = useNavigation();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const handleScroll = useScrollDirection(showTab, hideTab);

  const fetchPosts = useCallback(
    async (pageNumber, isInitial = false) => {
      if (!hasMore || isFetchingMore || !isOnline) return;
      if (!isInitial) setIsFetchingMore(true);

      try {
        const response = await TrendingPosts.getTrendingPosts({
          page: pageNumber,
          limit: 10,
        });

        if (Array.isArray(response) && response.length > 0) {
          setPosts(prev => (isInitial ? response : [...prev, ...response]));
          setPage(pageNumber + 1);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Fetch error:', err?.message || err);
      } finally {
        if (isInitial) setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [hasMore, isFetchingMore, isOnline],
  );

  useEffect(() => {
    if (isOnline) fetchPosts(1, true);
    else setLoading(false);
  }, [isOnline, fetchPosts]);

  const getModifiedData = () => {
    const modifiedData = [];
    posts.forEach((item, index) => {
      modifiedData.push({type: 'post', data: item, postIndex: index});
      if ((index + 1) % 5 === 0) {
        modifiedData.push({type: 'ad', id: `ad-${index}`});
      }
    });
    return modifiedData;
  };

  const renderItem = useCallback(
    ({item}) => {
      if (item.type === 'ad') {
        return <BannerAd />;
      }

      const postItem = item.data;

      // const onPress = () => {
      //   navigation.navigate('PostDetailScreen', {
      //     post: {
      //       ...postItem,
      //       title: postItem.text,

      //     },
      //     nsfw: postItem?.nsfw,
      //     posts: posts,
      //     currentIndex: item.postIndex,
      //   });
      // }; 

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

      const onPress = () => {
  navigation.navigate('PostDetailScreen', {
    post: {
      ...postItem,
      title: postItem.text,
      likes: postItem.heartsCount,    
      comments: postItem.repliesCount, 
      time: getRelativeTime(postItem.createdAt),       
    },
    nsfw: postItem?.nsfw,
    posts: posts,
    currentIndex: item.postIndex,
  });
};

      return isModernOn ? (
        <PostItemModernMode
          image={postItem?.mediaUrl}
          avatar={require('../../images/avatar.png')}
          postText={postItem?.text}
          time={postItem?.createdAt}
          commentCount={postItem?.repliesCount}
          likes={postItem?.heartsCount}
          onPress={onPress}
        />
      ) : (
        <PostItem
          image={postItem?.mediaUrl}
          text={postItem?.text}
          likes={postItem?.heartsCount}
          commentCount={postItem?.repliesCount}
          time={postItem?.createdAt}
          onPress={onPress}
        />
      );
    },
    [isModernOn, navigation, posts],
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor}]}>
        <ActivityIndicator size="large" color="#392EBD" />
      </View>
    );
  }

  if (!isOnline) {
    return (
      <View style={[styles.offlineContainer, {backgroundColor}]}>
        <Text style={styles.offlineText}>
          You are offline. Please check your internet connection.
        </Text>
        <Button title="Retry" onPress={() => fetchPosts(1, true)} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={getModifiedData()}
        numColumns={isModernOn ? 1 : 2}
        renderItem={renderItem}
        keyExtractor={item =>
          item.type === 'ad'
            ? item.id
            : item.data?.id?.toString() || `${item.postIndex}-${Date.now()}`
        }
        key={isModernOn ? 'singleColumn' : 'doubleColumn'}
        contentContainerStyle={styles.list}
        onEndReached={() => fetchPosts(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color="#E63946" />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  list: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  offlineText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HotTabScreen;
