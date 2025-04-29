// import React, {useState, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import SplashScreen from './src/screens/SplashScreen';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import {StatusBar, View, StyleSheet} from 'react-native';
// import HotTabScreen from './src/components/TabScreens/HotTabSceen';
// import GlobalTabScreen from './src/components/TabScreens/GlobalTabSCreen';
// import NotificationScreen from './src/screens/NotificationScreen';
// import {navigationRef} from './src/utils/NavigationUtil';
// import {TabProvider} from './src/context/TabContext';
// import SettingScreen from './src/screens/SettingScreen';
// import EditUserProfile from './src/components/Profile/EditUserProfile';
// import ProfileDetails from './src/components/Profile/ProfileDetails';
// import MyQuidsScreen from './src/screens/settingScreens/MyQuidsScreen';
// import CreateGroup from './src/screens/CreateGroup'
// import ErrorBoundary from './src/components/ErrorBoundary';
// import SelectLanguage from './src/screens/settingScreens/SelectLanguageScreen';
// import AppLovinMAX, { AdFormat, AdView } from 'react-native-applovin-max';


// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);



//   useEffect(() => {
//     AppLovinMAX.initialize('LWmzNhf2PwfOmHXglmhW2LQBHtKS63H1gSo7H2SevpuRdmfTTWX7DEl6w_UxTutNpMo2O5STsZGACXbuTiXdiX')
//       .then(() => {
//         console.log('AppLovin SDK initialized');
//       })
//       .catch(error => {
//         console.error('AppLovin SDK initialization failed:', error);
//       });
//   }, []);


//   if (isLoading) {
//     return (
//       <>
//         <StatusBar
//           translucent
//           backgroundColor="transparent"
//           barStyle="light-content"
//         />
//         <SplashScreen />
//       </>
//     );
//   }

//   return (
//     <ErrorBoundary>
//     <TabProvider>
//       <NavigationContainer ref={navigationRef}>
//         {/* Status Bar Background */}
//         {/* <View style={styles.statusBarBackground}>
//         <ImageBackground
//           source={require('./src/images/headerBg.png')}
//           style={styles.statusBarImage}
//           resizeMode="cover"
//         />

//         <StatusBar
//           translucent
//           backgroundColor="transparent"
//           barStyle="light-content"
//         />
//       </View> */}

//         {/* Main Content */}
//         <View style={styles.mainContainer}>
//           <Stack.Navigator
//             screenOptions={{
//               headerShown: false,
//               ...TransitionPresets.SlideFromRightIOS,
//               transitionSpec: {
//                 open: {animation: 'timing', config: {duration: 300}},
//                 close: {animation: 'timing', config: {duration: 300}},
//               },
//             }}>
//             <Stack.Screen
//               name="BottomTabNavigator"
//               component={BottomTabNavigator}
//             />
//             <Stack.Screen
//               name="NotificationScreen"
//               component={NotificationScreen}
//             />
//             <Stack.Screen name="SettingScreen" component={SettingScreen} />
//             <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
//             <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
//             <Stack.Screen name="MyQuidsScreen" component={MyQuidsScreen} />
//             <Stack.Screen name="CreateGroup" component={CreateGroup} />
//             <Stack.Screen name="SelectLanguage" component={SelectLanguage}/>

//           </Stack.Navigator>
//         </View>
//       </NavigationContainer>
//     </TabProvider>
//     </ErrorBoundary>
//   );
// };

// const styles = StyleSheet.create({
//   statusBarBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: StatusBar.currentHeight,
//     zIndex: 1,
//     overflow: 'hidden',
//   },
//   statusBarImage: {
//     flex: 1,
//     width: '100%',
//   },
//   mainContainer: {
//     flex: 1,
//   },
// });

// export default App;


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { StatusBar, View, StyleSheet } from 'react-native';
import NotificationScreen from './src/screens/NotificationScreen';
import { navigationRef } from './src/utils/NavigationUtil';
import { TabProvider } from './src/context/TabContext';
import SettingScreen from './src/screens/SettingScreen';
import EditUserProfile from './src/components/Profile/EditUserProfile';
import ProfileDetails from './src/components/Profile/ProfileDetails';
import MyQuidsScreen from './src/screens/settingScreens/MyQuidsScreen';
import CreateGroup from './src/screens/CreateGroup';
import ErrorBoundary from './src/components/ErrorBoundary';
import SelectLanguage from './src/screens/settingScreens/SelectLanguageScreen';
import AppLovinMAX, { AdFormat, AdView } from 'react-native-applovin-max';
import PostSCreen from './src/screens/PostScreen';
import CreatePoll from './src/screens/CreatePollScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSdkInitialized, setIsSdkInitialized] = useState(false);

  useEffect(() => {
    AppLovinMAX.setVerboseLogging(true); // Enable verbose logging
    AppLovinMAX.initialize('LWmzNhf2PwfOmHXglmhW2LQBHtKS63H1gSo7H2SevpuRdmfTTWX7DEl6w_UxTutNpMo2O5STsZGACXbuTiXdiX')
      .then(() => {
        console.log('AppLovin SDK initialized');
        setIsSdkInitialized(true);
      })
      .catch((error) => {
        console.error('AppLovin SDK initialization failed:', error);
        setIsSdkInitialized(true); 
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading || !isSdkInitialized) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <SplashScreen />
      </>
    );
  }

  return (
    <ErrorBoundary>
      <TabProvider>
        <NavigationContainer ref={navigationRef}>
          <View style={styles.mainContainer}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                transitionSpec: {
                  open: { animation: 'timing', config: { duration: 300 } },
                  close: { animation: 'timing', config: { duration: 300 } },
                },
              }}>
              <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
              />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
              <Stack.Screen name="SettingScreen" component={SettingScreen} />
              <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
              <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
              <Stack.Screen name="MyQuidsScreen" component={MyQuidsScreen} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
              <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
              <Stack.Screen name="PostScreen" component={PostSCreen} />
              <Stack.Screen name="CreatePoll" component={CreatePoll} />


            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </TabProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
