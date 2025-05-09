// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
// import Slider from '@react-native-community/slider';
// import PostItem from '../PostItem';
// import BannerAd from '../AppLovinMax';
// import { useTheme } from '../../context/ThemeContext';
// import { useModernMode } from '../../context/ModerModeContext';
// import PostItemModernMode from '../PostItemModernMode';

// const { width } = Dimensions.get('window');

// const LocalTabScreen = () => {
//   const [value, setValue] = useState(1);
//   const [fetchedPosts, setFetchedPosts] = useState([]);
//   const { isDarkModeOn } = useTheme();
//   const { isModernOn } = useModernMode();

//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';
//   const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(
//           `https://hush-trending-service.onrender.com/api/local/posts?latitude=34.42985401&longitude=-118.5238887&range=${value}`,
//         );
//         const data = await response.json();
//         const formattedPosts = data.posts.map((item, index) => ({
//           type: 'post',
//           id: item.id,
//           image: item.mediaUrl,
//           text: item.text,
//           likes: item.heartsCount,
//           time: item.createdAt,
//         }));
//         setFetchedPosts(data.posts);
//       } catch (error) {
//         console.error('Failed to fetch posts:', error);
//       }
//     };

//     fetchPosts();
//   }, [value]);

//   const dataWithAds = useMemo(() => getPostsWithAds(fetchedPosts), [fetchedPosts]);

//   const renderItem = useCallback(
//     ({ item }) => {
//       if (item.type === 'ad') {
//         return (
//           <View style={styles.adWrapper}>
//             <BannerAd />
//           </View>
//         );
//       }

//       return isModernOn ? (
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
//       );
//     },
//     [isDarkModeOn],
//   );

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       <View
//         style={[
//           styles.sliderContainer,
//           { backgroundColor: sliderBackgroundColor },
//         ]}>
//         <Text style={styles.label}>CLOSER</Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={1}
//           step={0.1}
//           value={value}
//           onValueChange={val => setValue(val)}
//           minimumTrackTintColor="#392EBD"
//           maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
//         />
//         <Text style={styles.label}>FARTHER</Text>
//       </View>

//       <FlatList
//         data={dataWithAds}
//         numColumns={isModernOn ? 1 : 2}
//         key={isModernOn ? 'singleColumn' : 'multiColumn'} // Optimize re-renders
//         keyExtractor={item =>
//           item?.id != null ? item.id.toString() : `key-${Math.random()}`
//         }
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//         columnWrapperStyle={isModernOn ? null : styles.columnWrapper} // Fix applied here
//       />
//     </View>
//   );
// };

// const getPostsWithAds = posts => {
//   const result = [];
//   posts.forEach((post, index) => {
//     result.push(post);
//     if ((index + 1) % 5 === 0) {
//       result.push({ type: 'ad', id: `ad-${index}` });
//     }
//   });
//   return result;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sliderContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   slider: {
//     width: '70%',
//     height: 40,
//   },
//   label: {
//     color: '#2F0E40',
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   columnWrapper: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   adWrapper: {
//     width: '100%',
//     flex: 1,
//     marginHorizontal: 0,
//   },
// });

// export default LocalTabScreen;

// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   Button,
//   ImageBackground,
// } from 'react-native';
// import {LocalPosts, TrendingPosts} from '../../services/api';
// import {useNetworkStatus} from '../../hooks/useNetworkStatus';
// import PostItem from '../PostItem';
// import {useTheme} from '../../context/ThemeContext';
// import {useModernMode} from '../../context/ModerModeContext';
// import PostItemModernMode from '../PostItemModernMode';
// import Slider from '@react-native-community/slider';

// const LocalTabScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [value, setValue] = useState(0);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const {isDarkModeOn} = useTheme();
//   const {isModernOn} = useModernMode();
//   const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';
//   const isOnline = useNetworkStatus();

//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';

//   // Fetch posts with API integration
//   const fetchPosts = useCallback(
//     async (pageNumber, isInitial = false) => {
//       if (!hasMore || isFetchingMore || !isOnline) return;

//       if (!isInitial) setIsFetchingMore(true);

//       try {
//         const response = await LocalPosts.getLocalPosts({
//           page: pageNumber,
//           limit: 10,
//         });
//         console.log('Fetched postsLocals:', response);
//         const fetchedPosts = response.posts || []; // Extract posts array from response
//         if (Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
//           setPosts(prevPosts =>
//             isInitial ? fetchedPosts : [...prevPosts, ...fetchedPosts],
//           );
//           setPage(pageNumber + 1);
//         } else {
//           setHasMore(false);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error.message || error);
//       } finally {
//         if (isInitial) setLoading(false);
//         setIsFetchingMore(false);
//       }
//     },
//     [hasMore, isFetchingMore, isOnline],
//   );

//   useEffect(() => {
//     if (isOnline) {
//       fetchPosts(1, true);
//     } else {
//       setLoading(false);
//     }
//   }, [isOnline, fetchPosts]);

//   const renderItem = useCallback(
//     ({item}) => {
//       return isModernOn ? (
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
//       );
//     },
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
//       <View
//         style={[
//           styles.sliderContainer,
//           {backgroundColor: sliderBackgroundColor},
//         ]}>
//         <Text style={styles.label}>CLOSER</Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={1}
//           step={0.1}
//           value={value}
//           onValueChange={val => setValue(val)}
//           minimumTrackTintColor="#392EBD"
//           maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
//         />
//         <Text style={styles.label}>FARTHER</Text>
//       </View>
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
//       />
//     </View>
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
//   },
//   sliderContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   slider: {
//     width: '70%',
//     height: 40,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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

// export default LocalTabScreen;

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Modal,
  Pressable,
  useColorScheme,
  Linking,
} from 'react-native';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalPosts} from '../../services/api';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
import PostItem from '../PostItem';
import {useTheme} from '../../context/ThemeContext';
import {useModernMode} from '../../context/ModerModeContext';
import PostItemModernMode from '../PostItemModernMode';

const MAX_DISTANCE_KM = 200;
const SLIDER_STORAGE_KEY = 'sliderValue';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = val => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const LocalTabScreen = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = useState(0.5);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [sliderValue, setSliderValue] = useState(0.5);
  const filterTimeoutRef = useRef(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const colorScheme = useColorScheme();

  const {isDarkModeOn} = useTheme();
  const {isModernOn} = useModernMode();
  const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';
  const isOnline = useNetworkStatus();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show nearby posts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          setShowPermissionModal(true);
          return false;
        }
      } catch (err) {
        console.warn(err);
        setShowPermissionModal(true);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const init = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        await getLocation();
      }
      await loadSliderValue();
    };

    init();
  }, []);

  const getLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLocationError('Location permission denied');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation({latitude, longitude});
          setLocationError(null);
        },
        error => {
          console.error('Location error:', error);
          setLocationError(error.message || 'Failed to get location');
          setUserLocation({latitude: 34.42985401, longitude: -118.5238887});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error('Location error:', error);
      setLocationError(error.message || 'Location error');
      setUserLocation({latitude: 34.42985401, longitude: -118.5238887});
    }
  };

  const filterPostsByDistance = useCallback(
    (allPosts, sliderVal) => {
      if (!userLocation) return allPosts;

      const maxDistance = MAX_DISTANCE_KM * sliderVal;
      return allPosts.filter(post => {
        try {
          const lat = post.latitude || post.new_latitude || post.new1_latitude;
          const lon =
            post.longitude || post.new_longitude || post.new1_longitude;
          if (lat && lon) {
            const dist = haversineDistance(
              userLocation.latitude,
              userLocation.longitude,
              lat,
              lon,
            );
            return dist <= maxDistance;
          }
          return false;
        } catch (error) {
          console.error('Error filtering post:', error);
          return false;
        }
      });
    },
    [userLocation],
  );

  const updateFilteredPosts = useCallback(
    newValue => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }

      filterTimeoutRef.current = setTimeout(() => {
        const filtered = filterPostsByDistance(posts, newValue);
        setFilteredPosts(filtered);
        setValue(newValue);
      }, 200);
    },
    [filterPostsByDistance, posts],
  );

  const handleSliderChange = async newValue => {
    setSliderValue(newValue);
    updateFilteredPosts(newValue);

    try {
      await AsyncStorage.setItem(SLIDER_STORAGE_KEY, String(newValue));
    } catch (e) {
      console.error('Failed to save slider value:', e);
    }
  };

  const loadSliderValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(SLIDER_STORAGE_KEY);
      if (storedValue !== null) {
        const parsedValue = parseFloat(storedValue);
        setSliderValue(parsedValue);
        updateFilteredPosts(parsedValue);
      }
    } catch (e) {
      console.error('Failed to load slider value:', e);
    }
  };

  const fetchPosts = useCallback(
    async (pageNumber, isInitial = false) => {
      if (!hasMore || isFetchingMore || !isOnline) return;
      if (!isInitial) setIsFetchingMore(true);

      try {
        const response = await LocalPosts.getLocalPosts({
          page: pageNumber,
          limit: 10,
        });

        const fetchedPosts = response.posts || [];
        if (Array.isArray(fetchedPosts)) {
          const updatedPosts = isInitial
            ? fetchedPosts
            : [...posts, ...fetchedPosts];
          setPosts(updatedPosts);

          const filtered = filterPostsByDistance(updatedPosts, sliderValue);
          setFilteredPosts(filtered);

          setPage(pageNumber + 1);
          setHasMore(fetchedPosts.length > 0);
        }
      } catch (error) {
        // console.error('Error fetching posts:', error.message || error);
      } finally {
        if (isInitial) setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [
      hasMore,
      isFetchingMore,
      isOnline,
      posts,
      filterPostsByDistance,
      sliderValue,
    ],
  );

  useEffect(() => {
    getLocation();
    loadSliderValue();
  }, []);

  useEffect(() => {
    if (isOnline) {
      fetchPosts(1, true);
    } else {
      setLoading(false);
    }
  }, [isOnline, fetchPosts]);

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return isModernOn ? (
        <PostItemModernMode
          image={item?.mediaUrl}
          avatar={require('../../images/avatar.png')}
          postText={item?.text}
          time={item?.createdAt}
          commentCount={item?.repliesCount}
          likes={item?.heartsCount}
        />
      ) : (
        <PostItem
          image={item?.mediaUrl}
          text={item?.text}
          likes={item?.heartsCount}
          commentCount={item?.repliesCount}
          time={item?.createdAt}
        />
      );
    },
    [isModernOn],
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
    <>
      <View style={[styles.container, {backgroundColor}]}>
        <View
          style={[
            styles.sliderContainer,
            {backgroundColor: sliderBackgroundColor},
          ]}>
          <Text style={styles.label}>CLOSER</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={1}
            step={0.01}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#392EBD"
            maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
          />
          <Text style={styles.label}>FARTHER</Text>
        </View>

        {/* {locationError && <Text style={styles.errorText}>{locationError}</Text>} */}

        {/* <Text
          style={[
            styles.distanceText,
            {color: isDarkModeOn ? '#fff' : '#000'},
          ]}>
          Showing posts within {Math.round(MAX_DISTANCE_KM * sliderValue)} km
        </Text> */}

        {filteredPosts.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                {color: isDarkModeOn ? '#fff' : '#000'},
              ]}>
              No posts found in this area
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredPosts}
            numColumns={isModernOn ? 1 : 2}
            renderItem={renderItem}
            keyExtractor={item =>
              item.id?.toString() || Math.random().toString()
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
            showsHorizontalScrollIndicator={false}
            windowSize={5}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  offlineContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  offlineText: {marginBottom: 10, fontSize: 16},
  sliderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    // paddingVertical: 10,
    alignItems: 'center',
  },
  slider: {width: '60%', height: 40},
  label: {fontSize: 14, fontWeight: 'bold'},
  distanceText: {textAlign: 'center', marginVertical: 8},
  errorText: {color: 'red', textAlign: 'center'},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: {fontSize: 16},
  list: {paddingBottom: 20},
});

export default LocalTabScreen;



// import React, {useState, useEffect, useCallback, useRef} from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   Modal,
//   Pressable,
//   useColorScheme,
//   Linking,
// } from 'react-native';
// import {Alert} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import Slider from '@react-native-community/slider';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {LocalPosts} from '../../services/api';
// import {useNetworkStatus} from '../../hooks/useNetworkStatus';
// import PostItem from '../PostItem';
// import {useTheme} from '../../context/ThemeContext';
// import {useModernMode} from '../../context/ModerModeContext';
// import PostItemModernMode from '../PostItemModernMode';
// import BannerAd from '../AppLovinMax';

// const MAX_DISTANCE_KM = 200;
// const SLIDER_STORAGE_KEY = 'sliderValue';

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = val => (val * Math.PI) / 180;
//   const R = 6371;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const LocalTabScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [value, setValue] = useState(0.5);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [sliderValue, setSliderValue] = useState(0.5);
//   const filterTimeoutRef = useRef(null);
//   const [showPermissionModal, setShowPermissionModal] = useState(false);
//   const colorScheme = useColorScheme();

//   const {isDarkModeOn} = useTheme();
//   const {isModernOn} = useModernMode();
//   const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';
//   const isOnline = useNetworkStatus();
//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message:
//               'This app needs access to your location to show nearby posts',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           return true;
//         } else {
//           setShowPermissionModal(true);
//           return false;
//         }
//       } catch (err) {
//         console.warn(err);
//         setShowPermissionModal(true);
//         return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const init = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (hasPermission) {
//         await getLocation();
//       }
//       await loadSliderValue();
//     };

//     init();
//   }, []);

//   const getLocation = async () => {
//     try {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         setLocationError('Location permission denied');
//         return;
//       }

//       Geolocation.getCurrentPosition(
//         position => {
//           const {latitude, longitude} = position.coords;
//           setUserLocation({latitude, longitude});
//           setLocationError(null);
//         },
//         error => {
//           console.error('Location error:', error);
//           setLocationError(error.message || 'Failed to get location');
//           setUserLocation({latitude: 34.42985401, longitude: -118.5238887});
//         },
//         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//       );
//     } catch (error) {
//       console.error('Location error:', error);
//       setLocationError(error.message || 'Location error');
//       setUserLocation({latitude: 34.42985401, longitude: -118.5238887});
//     }
//   };

//   const filterPostsByDistance = useCallback(
//     (allPosts, sliderVal) => {
//       if (!userLocation) return allPosts;

//       const maxDistance = MAX_DISTANCE_KM * sliderVal;
//       return allPosts.filter(post => {
//         try {
//           const lat = post.latitude || post.new_latitude || post.new1_latitude;
//           const lon =
//             post.longitude || post.new_longitude || post.new1_longitude;
//           if (lat && lon) {
//             const dist = haversineDistance(
//               userLocation.latitude,
//               userLocation.longitude,
//               lat,
//               lon,
//             );
//             return dist <= maxDistance;
//           }
//           return false;
//         } catch (error) {
//           console.error('Error filtering post:', error);
//           return false;
//         }
//       });
//     },
//     [userLocation],
//   );

//   const updateFilteredPosts = useCallback(
//     newValue => {
//       if (filterTimeoutRef.current) {
//         clearTimeout(filterTimeoutRef.current);
//       }

//       filterTimeoutRef.current = setTimeout(() => {
//         const filtered = filterPostsByDistance(posts, newValue);
//         setFilteredPosts(filtered);
//         setValue(newValue);
//       }, 200);
//     },
//     [filterPostsByDistance, posts],
//   );

//   const handleSliderChange = async newValue => {
//     setSliderValue(newValue);
//     updateFilteredPosts(newValue);

//     try {
//       await AsyncStorage.setItem(SLIDER_STORAGE_KEY, String(newValue));
//     } catch (e) {
//       console.error('Failed to save slider value:', e);
//     }
//   };

//   const loadSliderValue = async () => {
//     try {
//       const storedValue = await AsyncStorage.getItem(SLIDER_STORAGE_KEY);
//       if (storedValue !== null) {
//         const parsedValue = parseFloat(storedValue);
//         setSliderValue(parsedValue);
//         updateFilteredPosts(parsedValue);
//       }
//     } catch (e) {
//       console.error('Failed to load slider value:', e);
//     }
//   };

//   const fetchPosts = useCallback(
//     async (pageNumber, isInitial = false) => {
//       if (!hasMore || isFetchingMore || !isOnline) return;
//       if (!isInitial) setIsFetchingMore(true);

//       try {
//         const response = await LocalPosts.getLocalPosts({
//           page: pageNumber,
//           limit: 10,
//         });

//         const fetchedPosts = response.posts || [];
//         if (Array.isArray(fetchedPosts)) {
//           const updatedPosts = isInitial
//             ? fetchedPosts
//             : [...posts, ...fetchedPosts];
//           setPosts(updatedPosts);

//           const filtered = filterPostsByDistance(updatedPosts, sliderValue);
//           setFilteredPosts(filtered);

//           setPage(pageNumber + 1);
//           setHasMore(fetchedPosts.length > 0);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error.message || error);
//       } finally {
//         if (isInitial) setLoading(false);
//         setIsFetchingMore(false);
//       }
//     },
//     [
//       hasMore,
//       isFetchingMore,
//       isOnline,
//       posts,
//       filterPostsByDistance,
//       sliderValue,
//     ],
//   );

//   useEffect(() => {
//     getLocation();
//     loadSliderValue();
//   }, []);

//   useEffect(() => {
//     if (isOnline) {
//       fetchPosts(1, true);
//     } else {
//       setLoading(false);
//     }
//   }, [isOnline, fetchPosts]);

//   useEffect(() => {
//     return () => {
//       if (filterTimeoutRef.current) {
//         clearTimeout(filterTimeoutRef.current);
//       }
//     };
//   }, []);

//   const insertAds = (data, interval) => {
//     if (!data || data.length === 0) return data;
    
//     const result = [];
//     for (let i = 0; i < data.length; i++) {
//       result.push(data[i]);
//       if ((i + 1) % interval === 0) {
//         result.push({ type: 'ad', id: `ad-${i}` });
//       }
//     }
//     return result;
//   };

//   const renderItem = useCallback(
//     ({item}) => {
//       if (item.type === 'ad') {
//         return (
//           <View style={{width: '100%', paddingVertical: 10}}>
//             <BannerAd />
//           </View>
//         );
//       }

//       return isModernOn ? (
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
//       );
//     },
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
//     <>
//       <View style={[styles.container, {backgroundColor}]}>
//         <View
//           style={[
//             styles.sliderContainer,
//             {backgroundColor: sliderBackgroundColor},
//           ]}>
//           <Text style={styles.label}>CLOSER</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.1}
//             maximumValue={1}
//             step={0.01}
//             value={sliderValue}
//             onValueChange={handleSliderChange}
//             minimumTrackTintColor="#392EBD"
//             maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
//           />
//           <Text style={styles.label}>FARTHER</Text>
//         </View>

//         {filteredPosts.length === 0 && !loading ? (
//           <View style={styles.emptyContainer}>
//             <Text
//               style={[
//                 styles.emptyText,
//                 {color: isDarkModeOn ? '#fff' : '#000'},
//               ]}>
//               No posts found in this area
//             </Text>
//           </View>
//         ) : (
//           <FlatList
//             data={insertAds(filteredPosts, 4)}
//             numColumns={isModernOn ? 1 : 2}
//             renderItem={renderItem}
//             keyExtractor={item =>
//               item.id?.toString() || Math.random().toString()
//             }
//             key={isModernOn ? 'singleColumn' : 'doubleColumn'}
//             contentContainerStyle={styles.list}
//             onEndReached={() => fetchPosts(page)}
//             onEndReachedThreshold={0.5}
//             ListFooterComponent={
//               isFetchingMore ? (
//                 <ActivityIndicator size="small" color="#E63946" />
//               ) : null
//             }
//             showsVerticalScrollIndicator={false}
//             showsHorizontalScrollIndicator={false}
//             windowSize={5}
//             initialNumToRender={5}
//             maxToRenderPerBatch={5}
//             updateCellsBatchingPeriod={50}
//           />
//         )}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   offlineContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   offlineText: {marginBottom: 10, fontSize: 16},
//   sliderContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   slider: {width: '60%', height: 40},
//   label: {fontSize: 14, fontWeight: 'bold'},
//   distanceText: {textAlign: 'center', marginVertical: 8},
//   errorText: {color: 'red', textAlign: 'center'},
//   emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   emptyText: {fontSize: 16},
//   list: {paddingBottom: 20},
// });

// export default LocalTabScreen;