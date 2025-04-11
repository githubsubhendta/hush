// import React, { useCallback, useMemo, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { posts } from '../../utils/PostData';
// import PostItems from '../PostItem';
// import BannerAd from  '../AppLovinMax'

// const { width, height } = Dimensions.get('window');

// const LocalTabScreen = () => {
//   const [value, setValue] = useState(0);

//   const dataWithAds = useMemo(() => getPostsWithAds(posts), [posts]);

//   const renderItem = useCallback(({ item }) => {
//     if (item.type === 'ad') {
//       return <BannerAd />;
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
//     <View style={styles.container}>
//       <View style={styles.sliderContainer}>
//         <Text style={styles.label}>CLOSER</Text>

//         <Slider
//           style={styles.slider}
//           maximumValue={0.0000001}
//           step={0.00000001}
//           value={value}
//           onValueChange={val => setValue(val)}
//           minimumTrackTintColor="#392EBD"
//           maximumTrackTintColor="#66645E"
//           thumbTintColor="#fff"
//         />

//         <Text style={styles.label}>FARTHER</Text>
//       </View>

//       <FlatList
//         data={dataWithAds}
//         numColumns={2}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const getPostsWithAds = (posts) => {
//   const result = [];

//   posts.forEach((post, index) => {
//     result.push({ type: 'post', ...post });

//     if ((index + 1) % 5 === 0) {
//       result.push({ type: 'ad', id: `ad-${index}` });
//     }
//   });

//   return result;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   sliderContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#EEE8D5',
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
// });

// export default LocalTabScreen;

import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { posts } from '../../utils/PostData';
import PostItems from '../PostItem';
import BannerAd from '../AppLovinMax';

const { width } = Dimensions.get('window');

const LocalTabScreen = () => {
  const [value, setValue] = useState(0);

  const dataWithAds = useMemo(() => getPostsWithAds(posts), [posts]);

  const renderItem = useCallback(({ item }) => {
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
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>CLOSER</Text>
        <Slider
          style={styles.slider}
          maximumValue={0.0000001}
          step={0.00000001}
          value={value}
          onValueChange={(val) => setValue(val)}
          minimumTrackTintColor="#392EBD"
          maximumTrackTintColor="#66645E"
          thumbTintColor="#fff"
        />
        <Text style={styles.label}>FARTHER</Text>
      </View>
      <FlatList
        data={dataWithAds}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const getPostsWithAds = (posts) => {
  const result = [];
  posts.forEach((post, index) => {
    result.push({ type: 'post', ...post });
    if ((index + 1) % 5 === 0) {
      result.push({ type: 'ad', id: `ad-${index}` });
    }
  });
  return result;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEE8D5',
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
