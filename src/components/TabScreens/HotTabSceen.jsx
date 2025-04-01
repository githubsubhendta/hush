// import React, {useCallback} from 'react';
// import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
// import { posts } from '../../utils/PostData';
// import PostItem from '../PostItem';

// const HotTabScreen = () => {
//   const renderItem = useCallback(({item}) => <PostItem item={item} />, []);

//   return (
//     <ImageBackground
//       source={require('../../images/headerBg.png')}
//       style={{flex: 1}}
//       resizeMode="cover"
//       imageStyle={{opacity: 1}}>
//       <View style={styles.container}>
//         {/* <FlatList
//         data={posts}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         removeClippedSubviews={false}
//         showsVerticalScrollIndicator={false}
//         getItemLayout={(data, index) => ({
//           length: 350,
//           offset: 350 * index,
//           index,
//         })}
//       /> */}

//         <FlatList
//           data={posts}
//           numColumns={2}
//           renderItem={({item}) => (
//             <PostItem
//               image={item.image}
//               text={item.text}
//               likes={item.likes}
//               time={item.time}
//             />
//           )}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.list}
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
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
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ImageBackground,
//   ActivityIndicator,
// } from 'react-native';
// import PostItem from '../PostItem';

// const API_URL = 'https://hush-trending-service.onrender.com/api/trending/posts';

// const HotTabScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const renderItem = useCallback(
//     ({item}) => (
//       <PostItem
//         image={ item?.mediaUrl}
//         text={item.text}
//         likes={item.heartsCount}
//         comment={item.repliesCount}
//         time={item.createdAt}
//         tag={item.tag}
//       />
//     ),
//     [],
//   );

//   return (
//     <ImageBackground
//       source={require('../../images/headerBg.png')}
//       style={styles.background}
//       resizeMode="cover">
//       <View style={styles.container}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#E63946" />
//         ) : (
//           <FlatList
//             data={posts}
//             numColumns={2}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//             contentContainerStyle={styles.list}
//           />
//         )}
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

// const HotTabScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchPosts = async (pageNumber) => {
//     if (!hasMore || loading) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}?page=${pageNumber}&limit=10`); // Adjust limit per API support
//       const data = await response.json();

//       if (data.length > 0) {
//         setPosts((prevPosts) => [...prevPosts, ...data]);
//         setPage(pageNumber + 1);
//       } else {
//         setHasMore(false); // Stop further fetching if no more data
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(1); // Initial data load
//   }, []);

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


import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import PostItem from '../PostItem';

const API_URL = 'https://hush-trending-service.onrender.com/api/trending/posts';

const HotTabScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNumber, isInitial = false) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${pageNumber}&limit=10`);
      const data = await response.json();

      if (data.length > 0) {
        setPosts((prevPosts) => 
          isInitial ? data : [...prevPosts, ...data] // Reset on initial load, append otherwise
        );
        setPage(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if posts are empty (initial load)
    if (posts.length === 0) {
      fetchPosts(1, true);
    }

    // Optional: Use navigation focus event for refreshing
    const unsubscribe = navigation?.addListener('focus', () => {
      // Uncomment the line below if you want a manual refresh on focus
      // fetchPosts(1, true);
    });

    return () => unsubscribe && unsubscribe(); // Cleanup listener
  }, [navigation, posts.length]);

  const renderItem = useCallback(
    ({ item }) => (
      <PostItem
        image={item?.mediaUrl}
        text={item.text}
        likes={item.heartsCount}
        comment={item.repliesCount}
        time={item.createdAt}
        tag={item.tag}
      />
    ),
    []
  );

  return (
    <ImageBackground
      source={require('../../images/headerBg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <FlatList
          data={posts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={() => fetchPosts(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#E63946" /> : null}
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

