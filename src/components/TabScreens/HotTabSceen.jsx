

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
import {useTheme} from '../../context/ThemeContext';

const HotTabScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {isDarkModeOn} = useTheme(); 

  const isOnline = useNetworkStatus();

  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';

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
    <ImageBackground
      source={require('../../images/headerBg.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={[styles.container, {backgroundColor}]}>
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
    // backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#fff',
  },
  offlineText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HotTabScreen;
