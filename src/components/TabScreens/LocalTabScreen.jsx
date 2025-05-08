// // import React, { useCallback, useMemo, useState } from 'react';
// // import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
// // import Slider from '@react-native-community/slider';
// // import { posts } from '../../utils/PostData';
// // import PostItems from '../PostItem';
// // import BannerAd from  '../AppLovinMax'

// // const { width, height } = Dimensions.get('window');

// // const LocalTabScreen = () => {
// //   const [value, setValue] = useState(0);

// //   const dataWithAds = useMemo(() => getPostsWithAds(posts), [posts]);

// //   const renderItem = useCallback(({ item }) => {
// //     if (item.type === 'ad') {
// //       return <BannerAd />;
// //     }

// //     return (
// //       <PostItems
// //         image={item.image}
// //         text={item.text}
// //         likes={item.likes}
// //         time={item.time}
// //       />
// //     );
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.sliderContainer}>
// //         <Text style={styles.label}>CLOSER</Text>

// //         <Slider
// //           style={styles.slider}
// //           maximumValue={0.0000001}
// //           step={0.00000001}
// //           value={value}
// //           onValueChange={val => setValue(val)}
// //           minimumTrackTintColor="#392EBD"
// //           maximumTrackTintColor="#66645E"
// //           thumbTintColor="#fff"
// //         />

// //         <Text style={styles.label}>FARTHER</Text>
// //       </View>

// //       <FlatList
// //         data={dataWithAds}
// //         numColumns={2}
// //         keyExtractor={(item) => item.id.toString()}
// //         renderItem={renderItem}
// //         contentContainerStyle={styles.list}
// //       />
// //     </View>
// //   );
// // };

// // const getPostsWithAds = (posts) => {
// //   const result = [];

// //   posts.forEach((post, index) => {
// //     result.push({ type: 'post', ...post });

// //     if ((index + 1) % 5 === 0) {
// //       result.push({ type: 'ad', id: `ad-${index}` });
// //     }
// //   });

// //   return result;
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   sliderContainer: {
// //     width: '100%',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: '#EEE8D5',
// //     paddingHorizontal: 15,
// //   },
// //   slider: {
// //     width: '70%',
// //     height: 40,
// //   },
// //   label: {
// //     color: '#2F0E40',
// //     fontSize: 12,
// //     fontWeight: '700',
// //   },
// //   list: {
// //     paddingBottom: 20,
// //   },
// // });

// // export default LocalTabScreen;

// import React, {useCallback, useMemo, useState} from 'react';
// import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
// import Slider from '@react-native-community/slider';
// import {posts} from '../../utils/PostData';
// import PostItems from '../PostItem';
// import BannerAd from '../AppLovinMax';
// import {useTheme} from '../../context/ThemeContext';

// const {width} = Dimensions.get('window');

// const LocalTabScreen = () => {
//   const [value, setValue] = useState(0);

//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#000' : '#fff';
//   const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';
//   const dataWithAds = useMemo(() => getPostsWithAds(posts), [posts]);

//   const renderItem = useCallback(({item}) => {
//     if (item.type === 'ad') {
//       return (
//         <View style={styles.adWrapper}>
//           <BannerAd />
//         </View>
//       );
//     }

//     return (
//       <PostItems
//         image={item.image}
//         text={item.text}
//         likes={item.likes}
//         time={item.time}
//       />
//     );
//   }, []);

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
//           maximumValue={1}
//           minimumValue={0}
//           step={0.1}
//           value={value}
//           onValueChange={val => setValue(val)}
//           minimumTrackTintColor="#392EBD"
//           maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
//           thumbImage={'<SvgXml xml={Thumb_Tint_Image} width={60} height={60} />'}
//           // thumbTintColor="transparent"
//           // thumbStyle={{width: 50, height: 50}}
//         />

//         <Text style={styles.label}>FARTHER</Text>
//       </View>
//       <FlatList
//         data={dataWithAds}
//         numColumns={2}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//         columnWrapperStyle={styles.columnWrapper}
//       />
//     </View>
//   );
// };

// const getPostsWithAds = posts => {
//   const result = [];
//   posts.forEach((post, index) => {
//     result.push({type: 'post', ...post});
//     if ((index + 1) % 5 === 0) {
//       result.push({type: 'ad', id: `ad-${index}`});
//     }
//   });
//   return result;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//   },
//   sliderContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // backgroundColor: '#EEE8D5',
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import PostItems from '../PostItem';
import BannerAd from '../AppLovinMax';
import {useTheme} from '../../context/ThemeContext';
import { useModernMode } from '../../context/ModerModeContext';

const {width} = Dimensions.get('window');

const LocalTabScreen = () => {
  const [value, setValue] = useState(1);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const {isDarkModeOn} = useTheme();
  

  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const sliderBackgroundColor = isDarkModeOn ? '#fff' : '#EEE8D5';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://hush-trending-service.onrender.com/api/local/posts?latitude=34.42985401&longitude=-118.5238887&range=${value}`,
        );
        const data = await response.json();
        const formattedPosts = data.posts.map((item, index) => ({
          type: 'post',
          id: item.id,
          image: item.mediaUrl,
          text: item.text,
          likes: item.heartsCount,
          time: item.createdAt,
        }));
        setFetchedPosts(formattedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [value]);

  const dataWithAds = useMemo(
    () => getPostsWithAds(fetchedPosts),
    [fetchedPosts],
  );

  const renderItem = useCallback(({item}) => {
    if (item.type === 'ad') {
      return (
        <View style={styles.adWrapper}>
          <BannerAd />
        </View>
      );
    }

    return (
      <PostItems
        image={item.image}
        text={item.text}
        likes={item.likes}
        time={item.time}
      />
    );
  }, []);

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
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={value}
          onValueChange={val => setValue(val)}
          minimumTrackTintColor="#392EBD"
          maximumTrackTintColor={isDarkModeOn ? '#000000' : '#66645E'}
        />
        <Text style={styles.label}>FARTHER</Text>
      </View>

      <FlatList
        data={dataWithAds}
        numColumns={2}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
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
});

export default LocalTabScreen;
