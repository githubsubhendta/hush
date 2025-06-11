// import React, { useMemo } from 'react';
// import { View, ImageBackground, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// import HotTabScreen from '../components/TabScreens/HotTabSceen';
// import GlobalTabScreen from '../components/TabScreens/GlobalTabSCreen';
// import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
// import { useTab } from '../context/TabContext';

// const HomeScreen = () => {
//   const { activeTab, setActiveTab } = useTab();

//   // Use useMemo to prevent unnecessary re-renders
//   const hotScreen = useMemo(() => <HotTabScreen />, []);
//   const globalScreen = useMemo(() => <GlobalTabScreen />, []);
//   const localScreen = useMemo(() => <LocalTabScreen />, []);

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={{ flex: 1 }}
//       resizeMode="cover"
//       imageStyle={{ opacity: 1 }}
//     >
//       <Header onTabPress={setActiveTab} />

//       <View style={styles.container}>
//         <View style={[styles.tabContent, activeTab !== 'Hot' && styles.hidden]}>{hotScreen}</View>
//         <View style={[styles.tabContent, activeTab !== 'Global' && styles.hidden]}>{globalScreen}</View>
//         <View style={[styles.tabContent, activeTab !== 'Local' && styles.hidden]}>{localScreen}</View>
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
//   tabContent: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   hidden: {
//     display: 'none',
//   },
// });

// export default HomeScreen;

// import React, {useMemo} from 'react';
// import {View, ImageBackground, StyleSheet, StatusBar} from 'react-native';
// import Header from '../components/Header';
// import HotTabScreen from '../components/TabScreens/HotTabSceen';
// import GlobalTabScreen from '../components/TabScreens/GlobalTabScreen';
// import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
// import {useTab} from '../context/TabContext';
// import {useTheme} from '../context/ThemeContext';

// const HomeScreen = () => {
//   const {activeTabs, setActiveTab} = useTab();
//   const activeTab = activeTabs['Home'] || 'Hot';

//   const {isDarkModeOn} = useTheme(); // Get the theme context
//   const backgroundColor = isDarkModeOn ? '#000' : '#fff'; 

//   // Use useMemo to prevent unnecessary re-renders
//   const hotScreen = useMemo(() => <HotTabScreen />, []);
//   const globalScreen = useMemo(() => <GlobalTabScreen />, []);
//   const localScreen = useMemo(() => <LocalTabScreen />, []);

//   return (
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={{flex: 1}}
//       resizeMode="cover"
//       >
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />
//       <Header onTabPress={tab => setActiveTab('Home', tab)} />

//       <View style={[styles.container, backgroundColor]}>
//         <View style={[styles.tabContent, activeTab !== 'Hot' && styles.hidden]}>
//           {hotScreen}
//         </View>
//         <View
//           style={[styles.tabContent, activeTab !== 'Global' && styles.hidden]}>
//           {globalScreen}
//         </View>
//         <View
//           style={[styles.tabContent, activeTab !== 'Local' && styles.hidden]}>
//           {localScreen}
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   tabContent: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   hidden: {
//     display: 'none',
//   },
// });

// export default HomeScreen;


import React, { useMemo } from 'react';
import { View, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { useBottomTab } from '../context/BottomTabContext';
import Header from '../components/Header';
import HotTabScreen from '../components/TabScreens/HotTabSceen';
import GlobalTabScreen from '../components/TabScreens/GlobalTabScreen';
import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
import { useTab } from '../context/TabContext';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = () => {
  const { activeTabs, setActiveTab } = useTab();
  const activeTab = activeTabs['Home'] || 'Hot';

  const { isDarkModeOn } = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';

  const hotScreen = useMemo(() => <HotTabScreen />, []);
  const globalScreen = useMemo(() => <GlobalTabScreen />, []);
  const localScreen = useMemo(() => <LocalTabScreen />, []);

  return (
    <ImageBackground
      source={require('../images/headerBg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Header onTabPress={(tab) => setActiveTab('Home', tab)} />

      <View style={[styles.container, { backgroundColor }]}>
        <View style={[styles.tabContent, activeTab !== 'Hot' && styles.hidden]}>
          {hotScreen}
        </View>
        <View style={[styles.tabContent, activeTab !== 'Global' && styles.hidden]}>
          {globalScreen}
        </View>
        <View style={[styles.tabContent, activeTab !== 'Local' && styles.hidden]}>
          {localScreen}
        </View>
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

export default HomeScreen;
