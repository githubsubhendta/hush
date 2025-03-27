import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { posts } from '../utils/PostData';
import PostItem from '../components/PostItem';

const HomeScreen = () => {
  const renderItem = useCallback(({ item }) => <PostItem item={item} />, []);

  return (
    <ImageBackground
          source={require('../images/headerBg.png')}
          style={{flex: 1}}
          resizeMode="cover"
          imageStyle={{opacity: 1}}>
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 350, 
          offset: 350 * index,
          index,
        })}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  listContent: {
    // padding: 15,
    // paddingTop: 10, // Space for the header
    paddingBottom: 30, // Space for the bottom tab bar
  },
});

export default HomeScreen;