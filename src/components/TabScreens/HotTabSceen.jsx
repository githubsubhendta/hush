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

import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import PostItem from '../PostItem';

const API_URL = 'https://hush-trending-service.onrender.com/api/trending/posts';

const HotTabScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Initially true to avoid showing loader
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Separate loader for pagination

  const fetchPosts = async (pageNumber, isInitial = false) => {
    if (!hasMore || isFetchingMore) return;

    if (!isInitial) setIsFetchingMore(true); // Show loader only for pagination

    try {
      const response = await axios.get(API_URL, {
        params: {page: pageNumber, limit: 10},
      });

      const data = response.data;

      if (data.length > 0) {
        setPosts(prevPosts => (isInitial ? data : [...prevPosts, ...data]));
        setPage(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      if (isInitial) setLoading(false); // Hide initial loader after first fetch
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true); // Fetch data once when the component mounts
  }, []);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      // Uncomment below if you want a refresh on focus
      // fetchPosts(1, true);
    });

    return () => unsubscribe && unsubscribe();
  }, [navigation]);

  const renderItem = useCallback(
    ({item}) => (
      <PostItem
        image={item?.mediaUrl}
        text={item.text}
        likes={item.heartsCount}
        comment={item.repliesCount}
        time={item.createdAt}
        tag={item.tag}
      />
    ),
    [],
  );

  if (loading) return null; // Prevents showing ActivityIndicator on initial load

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
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={() => fetchPosts(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="small" color="#E63946" />
            ) : null
          }
          // windowSize={10}
          // initialNumToRender={50}
          // maxToRenderPerBatch={50}
          // updateCellsBatchingPeriod={100}
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
});

export default HotTabScreen;
