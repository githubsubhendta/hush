

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import PostItem from '../PostItem';
import BannerAd from '../AppLovinMax';
import {useTheme} from '../../context/ThemeContext';
import {useModernMode} from '../../context/ModerModeContext';
import PostItemModernMode from '../PostItemModernMode';
import Geolocation from '@react-native-community/geolocation';
import {LocalPosts} from '../../services/api';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
import {useScrollDirection} from '../../context/scrollView';
import {useBottomTab} from '../../context/BottomTabContext';
import {useNavigation} from '@react-navigation/native';

const LOCATION_KEY = 'USER_SELECTED_LOCATION';
const {width} = Dimensions.get('window');

const requestLocationPermission = async () => {
  const result = await request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  if (result === RESULTS.GRANTED) {
    console.log('Location permission granted');
    return true;
  } else {
    console.warn('Location permission not granted');
    return false;
  }
};

const LocalTabScreen = () => {
  const {hideTab, showTab} = useBottomTab();
  const handleScroll = useScrollDirection(showTab, hideTab);
  const isOnline = useNetworkStatus();
  const [value, setValue] = useState(10);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const {isDarkModeOn} = useTheme();
  const navigation = useNavigation();
  const {isModernOn} = useModernMode();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: 34.42985401,
    longitude: -118.5238887,
  });
  const [sliderLocation, setSliderLocation] = useState(location);
  const [locationManuallySelected, setLocationManuallySelected] =
    useState(false);

  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';

  const dataWithAds = useMemo(
    () => getPostsWithAds(fetchedPosts),
    [fetchedPosts],
  );

  const selectLocation = (latitude, longitude) => {
    const selected = {latitude, longitude};
    setLocation(selected);
    setSliderLocation(selected);
    setLocationManuallySelected(true);
    AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(selected));
  };

  useEffect(() => {
    async function requestPermissionAndFetchLocation() {
      const hasPermission = await requestLocationPermission();

      const loadStoredLocation = async () => {
        try {
          const stored = await AsyncStorage.getItem(LOCATION_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            setLocation(parsed);
            setSliderLocation(parsed);
            setLocationManuallySelected(true);
            return true;
          }
          return false;
        } catch (e) {
          console.error('Error loading stored location:', e);
          return false;
        }
      };

      const fetchDeviceLocation = () => {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const newLoc = {latitude, longitude};
            setLocation(newLoc);
            setSliderLocation(newLoc);
            await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(newLoc));
          },
          error => {
            console.warn('Geolocation error:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      };

      const storedLocationLoaded = await loadStoredLocation();
      if (!storedLocationLoaded && hasPermission) {
        fetchDeviceLocation();
      }
    }

    requestPermissionAndFetchLocation();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await LocalPosts.getLocalPosts({
          page: 1,
          limit: 20,
          latitude: sliderLocation.latitude,
          longitude: sliderLocation.longitude,
          range: value,
        });

        if (!res?.posts || !Array.isArray(res.posts)) {
          console.error('Invalid posts response:', res);
          setFetchedPosts([]);
        } else {
          setFetchedPosts(res.posts);
        }
      } catch (error) {
        console.error('Error fetching local posts:', error);
        setFetchedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOnline) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [value, sliderLocation]);

  const handleSliderValueChange = newValue => {
    setValue(newValue);
  };

  const handleSliderComplete = () => {
    // Update the sliderLocation with current location when slider is released
    setSliderLocation(location);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      if (item.type === 'ad') {
        return (
          <View style={styles.adWrapper}>
            <BannerAd />
          </View>
        );
      }

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

      const distanceText = item.distance
        ? `${item.distance} miles away`
        : 'Nearby';

      // const handlePress = () => {
      //   navigation.navigate('PostDetailScreen', {
      //     post: {
      //       ...item,
      //       title: item.text,
      //       likes: item.heartsCount,
      //       comments: item.repliesCount,
      //       time: getRelativeTime(item.createdAt),
      //     },
      //     nsfw: item.nsfw,
      //     posts: fetchedPosts,
      //     currentIndex: index,
      //   });
      // };

      const handlePress = () => {
        setLoading(true);
        setTimeout(() => {
          navigation.navigate('PostDetailScreen', {
            post: {
              ...item,
              title: item.text,
              likes: item.heartsCount,
              comments: item.repliesCount,
              time: getRelativeTime(item.createdAt),
            },
            nsfw: item.nsfw,
            posts: fetchedPosts,
            currentIndex: index,
          });
          setLoading(false);
        }, 300);
      };

      return isModernOn ? (
        <PostItemModernMode
          image={item?.mediaUrl}
          avatar={require('../../images/avatar.png')}
          postText={item?.text}
          time={item?.createdAt}
          commentCount={item?.repliesCount}
          likes={item?.heartsCount}
          distance={distanceText}
          onPress={handlePress}
        />
      ) : (
        <PostItem
          image={item?.mediaUrl}
          text={item?.text}
          likes={item?.heartsCount}
          commentCount={item?.repliesCount}
          time={item?.createdAt}
          distance={distanceText}
          onPress={handlePress}
        />
      );
    },
    [isModernOn, fetchedPosts],
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View
        style={[
          styles.sliderContainer,
          {backgroundColor: sliderBackgroundColor},
        ]}>
        <Text style={styles.label}>CLOSER</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={200}
          step={1}
          value={value}
          onValueChange={handleSliderValueChange}
          onSlidingComplete={handleSliderComplete}
          minimumTrackTintColor="#392EBD"
          maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
        />

        <Text style={styles.label}>FARTHER</Text>
      </View>

      {loading ? (
        <View style={[styles.loadingContainer, {backgroundColor}]}>
          <ActivityIndicator size="large" color="#392EBD" />
        </View>
      ) : (
        <FlatList
          data={dataWithAds}
          numColumns={isModernOn ? 1 : 2}
          key={isModernOn ? 'singleColumn' : 'multiColumn'}
          keyExtractor={(item, index) => {
            if (item.id) return item.id.toString();
            if (item.type === 'ad') return `ad-${index}`;
            return `item-${index}`;
          }}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          columnWrapperStyle={isModernOn ? null : styles.columnWrapper}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

const getPostsWithAds = posts => {
  const result = [];
  posts.forEach((post, index) => {
    result.push(post);
    if ((index + 1) % 5 === 0) {
      result.push({type: 'ad', id: `ad-${index}`});
    }
  });
  return result;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  slider: {
    width: '70%',
    height: 40,
  },
  label: {
    color: '#2F0E40',
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  adWrapper: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default LocalTabScreen;
