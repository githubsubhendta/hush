// import React, {useCallback} from 'react';
// import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
// import {posts} from '../utils/PostData';
// import PostItem from '../components/PostItem';

// const HomeScreen = () => {
//   const renderItem = useCallback(({item}) => <PostItem item={item} />, []);

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
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

// export default HomeScreen;



// import React, { useState } from 'react';
// import { View, ImageBackground, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// import HotTabScreen from '../components/TabScreens/HotTabSceen';
// import GlobalTabScreen from '../components/TabScreens/GlobalTabSCreen';
// import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
// import { useTab } from '../context/TabContext';


// const HomeScreen = () => {
//   const {activeTab,setActiveTab} = useTab()

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={{ flex: 1 }}
//       resizeMode="cover"
//       imageStyle={{ opacity: 1 }}
//     >
//       <Header onTabPress={setActiveTab} />

//       <View style={styles.container}>
//         {activeTab === 'Hot' && <HotTabScreen />}
//         {activeTab === 'Global' && <GlobalTabScreen/>}
//         {activeTab === 'Local' && <LocalTabScreen/>}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     backgroundColor: 'white',
//   },
// });

// export default HomeScreen;


import React, { useMemo } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Header from '../components/Header';
import HotTabScreen from '../components/TabScreens/HotTabSceen';
import GlobalTabScreen from '../components/TabScreens/GlobalTabSCreen';
import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
import { useTab } from '../context/TabContext';

const HomeScreen = () => {
  const { activeTab, setActiveTab } = useTab();

  // Use useMemo to prevent unnecessary re-renders
  const hotScreen = useMemo(() => <HotTabScreen />, []);
  const globalScreen = useMemo(() => <GlobalTabScreen />, []);
  const localScreen = useMemo(() => <LocalTabScreen />, []);

  return (
    <ImageBackground
      source={require('../images/headerBg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <Header onTabPress={setActiveTab} />

      <View style={styles.container}>
        <View style={[styles.tabContent, activeTab !== 'Hot' && styles.hidden]}>{hotScreen}</View>
        <View style={[styles.tabContent, activeTab !== 'Global' && styles.hidden]}>{globalScreen}</View>
        <View style={[styles.tabContent, activeTab !== 'Local' && styles.hidden]}>{localScreen}</View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
  },
  tabContent: {
    ...StyleSheet.absoluteFillObject, 
  },
  hidden: {
    display: 'none',
  },
});

export default HomeScreen;
