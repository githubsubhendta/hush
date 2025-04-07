// import React, { useState } from 'react';
// import { View, ImageBackground, StyleSheet } from 'react-native';
// import WatchHeader from '../components/WatchHeader';
// import VideoScreen from '../components/TabScreens/VideoScreen';
// import StoryScreen from '../components/TabScreens/StoryScreen';
// import PollScreen from '../components/TabScreens/PollScreen';
// import { useTab } from '../context/TabContext';


// const WatchScreen = () => {
//     const { activeTab, setActiveTab } = useTab();
//   // Default is 'Hot'

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={{ flex: 1 }}
//       resizeMode="cover"
//       imageStyle={{ opacity: 1 }}
//     >
//       <WatchHeader onTabPress={setActiveTab}/>           
//       {/* < onTabPress={setActiveTab} /> */}


//       <View style={styles.container}>
//               <View style={[styles.tabContent, activeTab !== 'Video' && styles.hidden]}>{VideoScreen}</View>
//               <View style={[styles.tabContent, activeTab !== 'Story' && styles.hidden]}>{StoryScreen}</View>
//               <View style={[styles.tabContent, activeTab !== 'Poll' && styles.hidden]}>{PollScreen}</View>
//             </View>
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
//   tabContent: {
//     ...StyleSheet.absoluteFillObject, 
//   },
//   hidden: {
//     display: 'none',
//   },
// });

// export default WatchScreen;


import React, { useMemo } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import WatchHeader from '../components/WatchHeader';
import { useTab } from '../context/TabContext';
import VideoScreen from '../components/TabScreens/VideoScreen';
import StoryScreen from '../components/TabScreens/StoryScreen';
import PollScreen from '../components/TabScreens/PollScreen';

const WatchScreen = () => {
  const { activeTabs, setActiveTab } = useTab();
  const activeTab = activeTabs['Watch'] || 'Video'; // Default to 'Video'

  const videoScreen = useMemo(() => <VideoScreen />, []);
  const storyScreen = useMemo(() => <StoryScreen />, []);
  const pollScreen = useMemo(() => <PollScreen />, []);

  return (
    <ImageBackground
      source={require('../images/headerBg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <WatchHeader onTabPress={(tab) => setActiveTab('Watch', tab)} /> 

      <View style={styles.container}>
        <View style={[styles.tabContent, activeTab !== 'Video' && styles.hidden]}>{videoScreen}</View>
        <View style={[styles.tabContent, activeTab !== 'Story' && styles.hidden]}>{storyScreen}</View>
        <View style={[styles.tabContent, activeTab !== 'Poll' && styles.hidden]}>{pollScreen}</View>
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

export default WatchScreen;
