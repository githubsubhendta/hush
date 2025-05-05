import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';

import PostItem from '../PostItem';
import {GlobalPosts} from '../../services/api';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
import {useTheme} from '../../context/ThemeContext';
import {useModernMode} from '../../context/ModerModeContext';
import PostItemModernMode from '../PostItemModernMode';

const GlobalTabScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const isOnline = useNetworkStatus();

  const {isModernOn} = useModernMode();
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';

  const fetchPosts = useCallback(
    async (pageNumber, isInitial = false) => {
      if (!hasMore || isFetchingMore || !isOnline) return;

      if (!isInitial) setIsFetchingMore(true);

      try {
        const response = await GlobalPosts.getGlobalPosts({
          page: pageNumber,
          limit: 10,
        });

        console.log('Fetched posts:', response);

        if (Array.isArray(response) && response.length > 0) {
          setPosts(prev => (isInitial ? response : [...prev, ...response]));
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
      style={{flex: 1}}
      resizeMode="cover"
      imageStyle={{opacity: 1}}>
      <View style={[styles.container, {backgroundColor}]}>
        <FlatList
          data={posts}
          numColumns={isModernOn ? 1 : 2}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
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

export default GlobalTabScreen;
