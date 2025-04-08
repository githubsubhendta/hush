// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ImageBackground,
//   ActivityIndicator,
// } from 'react-native';
// import PostItem from '../PostItem';

// const API_URL = 'https://hush-trending-service.onrender.com/api/trending/posts';

// const HotTabScreen = ({ navigation }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchPosts = async (pageNumber, isInitial = false) => {
//     if (!hasMore || loading) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}?page=${pageNumber}&limit=10`);
//       const data = await response.json();

//       if (data.length > 0) {
//         setPosts((prevPosts) =>
//           isInitial ? data : [...prevPosts, ...data] // Reset on initial load, append otherwise
//         );
//         setPage(pageNumber + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Only fetch if posts are empty (initial load)
//     if (posts.length === 0) {
//       fetchPosts(1, true);
//     }

//     // Optional: Use navigation focus event for refreshing
//     const unsubscribe = navigation?.addListener('focus', () => {
//       // Uncomment the line below if you want a manual refresh on focus
//       // fetchPosts(1, true);
//     });

//     return () => unsubscribe && unsubscribe(); // Cleanup listener
//   }, [navigation, posts.length]);

//   const renderItem = useCallback(
//     ({ item }) => (
//       <PostItem
//         image={item?.mediaUrl}
//         text={item.text}
//         likes={item.heartsCount}
//         comment={item.repliesCount}
//         time={item.createdAt}
//         tag={item.tag}
//       />
//     ),
//     []
//   );

//   return (
//     <ImageBackground
//       source={require('../../images/headerBg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>
//         <FlatList
//           data={posts}
//           numColumns={2}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.list}
//           onEndReached={() => fetchPosts(page)}
//           onEndReachedThreshold={0.5}
//           ListFooterComponent={loading ? <ActivityIndicator size="large" color="#E63946" /> : null}
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     backgroundColor: '#fff',
//   },
//   list: {
//     paddingBottom: 20,
//   },
// });

// export default HotTabScreen;

// import React, {useState, useEffect, useCallback} from 'react';
// import axios from 'axios';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ImageBackground,
//   ActivityIndicator,
// } from 'react-native';
// import PostItem from '../PostItem';

// const API_URL = 'https://hush-trending-service.onrender.com/api/trending/posts';

// const HotTabScreen = ({navigation}) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);

//   const fetchPosts = async (pageNumber, isInitial = false) => {
//     if (!hasMore || isFetchingMore) return;

//     if (!isInitial) setIsFetchingMore(true);

//     try {
//       const response = await axios.get(API_URL, {
//         params: {page: pageNumber, limit: 10},
//       });

//       const data = response.data;

//       if (data.length > 0) {
//         setPosts(prevPosts => (isInitial ? data : [...prevPosts, ...data]));
//         setPage(pageNumber + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error.message);
//     } finally {
//       if (isInitial) setLoading(false);
//       setIsFetchingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(1, true);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation?.addListener('focus', () => {
//       // Refresh logic on screen focus (if needed)
//     });

//     return () => unsubscribe && unsubscribe();
//   }, [navigation]);

//   const renderItem = useCallback(
//     ({item}) => (
//       <PostItem
//         image={item?.mediaUrl}
//         text={item.text}
//         likes={item.heartsCount}
//         comment={item.repliesCount}
//         time={item.createdAt}
//         tag={item.tag}
//       />
//     ),
//     [],
//   );

//   // Show full-screen activity indicator while loading
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#392EBD" />
//       </View>
//     );
//   }

//   return (
//     <ImageBackground
//       source={require('../../images/headerBg.png')}
//       style={styles.background}
//       resizeMode="cover">
//       <View style={styles.container}>
//         <FlatList
//           data={posts}
//           numColumns={2}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={styles.list}
//           onEndReached={() => fetchPosts(page)}
//           onEndReachedThreshold={0.5}
//           ListFooterComponent={
//             isFetchingMore ? (
//               <ActivityIndicator size="small" color="#E63946" />
//             ) : null
//           }
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     backgroundColor: '#fff',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default HotTabScreen;

// src/screens/HotTabScreen.js

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
  ImageBackground,
} from 'react-native';
import {TrendingPosts} from '../../services/api';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
// import ErrorBoundary from '../../components/ErrorBoundary';
import PostItem from '../PostItem';

const HotTabScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const isOnline = useNetworkStatus();

  // Fetch posts with API integration
  const fetchPosts = useCallback(
    async (pageNumber, isInitial = false) => {
      if (!hasMore || isFetchingMore || !isOnline) return;

      if (!isInitial) setIsFetchingMore(true);

      try {
        const response = await TrendingPosts.getTrendingPosts({
          page: pageNumber,
          limit: 10,
        });
        console.log('Fetched posts:', response);
        if (Array.isArray(response) && response.length > 0) {
          setPosts(prevPosts =>
            isInitial ? response : [...prevPosts, ...response],
          );
          setPage(pageNumber + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.message || error);
      } finally {
        if (isInitial) setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [hasMore, isFetchingMore, isOnline],
  );

  useEffect(() => {
    if (isOnline) {
      fetchPosts(1, true);
    } else {
      setLoading(false); 
    }
  }, [isOnline, fetchPosts]);

  const renderItem = useCallback(
    ({item}) => (
      <PostItem
        image={item?.mediaUrl}
        text={item?.text}
        likes={item?.heartsCount}
        comment={item?.repliesCount}
        time={item?.createdAt}
      />
    ),
    [],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#392EBD" />
      </View>
    );
  }

  if (!isOnline) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>
          You are offline. Please check your internet connection.
        </Text>
        <Button title="Retry" onPress={() => fetchPosts(1, true)} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../images/headerBg.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <FlatList
          data={posts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={styles.list}
          onEndReached={() => fetchPosts(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="small" color="#E63946" />
            ) : null
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  offlineText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HotTabScreen;
