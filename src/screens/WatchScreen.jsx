


import React, { useMemo } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import WatchHeader from '../components/WatchHeader';
import { useTab } from '../context/TabContext';
import VideoScreen from '../components/TabScreens/VideoScreen';
import StoryScreen from '../components/TabScreens/StoryScreen';
import PollScreen from '../components/TabScreens/PollScreen';
import { useTheme } from '../context/ThemeContext';

const WatchScreen = () => {
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#fff'; 
  const { activeTabs, setActiveTab } = useTab();
  const activeTab = activeTabs['Watch'] || 'Video'; 

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

      <View style={[styles.container, { backgroundColor }]}>
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
    
  },
  tabContent: {
    ...StyleSheet.absoluteFillObject, 
  },
  hidden: {
    display: 'none',
  },
});

export default WatchScreen;

// import React, { Suspense, lazy } from 'react';
// import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
// import WatchHeader from '../components/WatchHeader';
// import { useTab } from '../context/TabContext';
// import { useTheme } from '../context/ThemeContext';

// // Lazy load tab screens
// const VideoScreen = lazy(() => import('../components/TabScreens/VideoScreen'));
// const StoryScreen = lazy(() => import('../components/TabScreens/StoryScreen'));
// const PollScreen = lazy(() => import('../components/TabScreens/PollScreen'));

// const WatchScreen = () => {
//   const { isDarkModeOn } = useTheme();
//   const backgroundColor = isDarkModeOn ? '#030303' : '#fff'; 
//   const { activeTabs, setActiveTab } = useTab();
//   const activeTab = activeTabs['Watch'] || 'Video'; 

//   const renderActiveScreen = () => {
//     switch (activeTab) {
//       case 'Video':
//         return <VideoScreen />;
//       case 'Story':
//         return <StoryScreen />;
//       case 'Poll':
//         return <PollScreen />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={{ flex: 1 }}
//       resizeMode="cover"
//       imageStyle={{ opacity: 1 }}
//     >
//       <WatchHeader onTabPress={(tab) => setActiveTab('Watch', tab)} />

//       <View style={[styles.container, { backgroundColor }]}>
//         <Suspense fallback={<ActivityIndicator size="large" color="#999" style={styles.loader} />}>
//           {renderActiveScreen()}
//         </Suspense>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     overflow: 'hidden',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default WatchScreen;

