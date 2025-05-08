

// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import SplashScreen from './src/screens/SplashScreen';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import { StatusBar, View, StyleSheet } from 'react-native';
// import NotificationScreen from './src/screens/NotificationScreen';
// import { navigationRef } from './src/utils/NavigationUtil';
// import { TabProvider } from './src/context/TabContext';
// import SettingScreen from './src/screens/SettingScreen';
// import EditUserProfile from './src/components/Profile/EditUserProfile';
// import ProfileDetails from './src/components/Profile/ProfileDetails';
// import MyQuidsScreen from './src/screens/settingScreens/MyQuidsScreen';
// import CreateGroup from './src/screens/CreateGroup';
// import ErrorBoundary from './src/components/ErrorBoundary';
// import SelectLanguage from './src/screens/settingScreens/SelectLanguageScreen';
// import AppLovinMAX, { AdFormat, AdView } from 'react-native-applovin-max';
// import PostSCreen from './src/screens/PostScreen';
// import CreatePoll from './src/screens/CreatePollScreen';
// import WritePost from './src/screens/WritePostScreen';
// import { ThemeProvider } from './src/context/ThemeContext';
// import { ModernModeProvider } from './src/context/ModerModeContext';
// import StoryPostDetailScreen from './src/screens/storyScreens/StoryPostDetailsScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSdkInitialized, setIsSdkInitialized] = useState(false);

//   useEffect(() => {
//     AppLovinMAX.setVerboseLogging(true); 
//     AppLovinMAX.initialize('LWmzNhf2PwfOmHXglmhW2LQBHtKS63H1gSo7H2SevpuRdmfTTWX7DEl6w_UxTutNpMo2O5STsZGACXbuTiXdiX')
//       .then(() => {
//         console.log('AppLovin SDK initialized');
//         setIsSdkInitialized(true);
//       })
//       .catch((error) => {
//         console.error('AppLovin SDK initialization failed:', error);
//         setIsSdkInitialized(true); 
//       });

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   if (isLoading || !isSdkInitialized) {
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
//       <ThemeProvider>
//         <ModernModeProvider>
//       <TabProvider>
//         <NavigationContainer ref={navigationRef}>
//           <View style={styles.mainContainer}>
//             <Stack.Navigator
//               screenOptions={{
//                 headerShown: false,
//                 ...TransitionPresets.SlideFromRightIOS,
//                 transitionSpec: {
//                   open: { animation: 'timing', config: { duration: 300 } },
//                   close: { animation: 'timing', config: { duration: 300 } },
//                 },
//               }}>
//               <Stack.Screen
//                 name="BottomTabNavigator"
//                 component={BottomTabNavigator}
//               />
//               <Stack.Screen
//                 name="NotificationScreen"
//                 component={NotificationScreen}
//               />
//               <Stack.Screen name="SettingScreen" component={SettingScreen} />
//               <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
//               <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
//               <Stack.Screen name="MyQuidsScreen" component={MyQuidsScreen} />
//               <Stack.Screen name="CreateGroup" component={CreateGroup} />
//               <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
//               <Stack.Screen name="PostScreen" component={PostSCreen} />
//               <Stack.Screen name="WritePost" component={WritePost} />
//               <Stack.Screen name="CreatePoll" component={CreatePoll} />
//               <Stack.Screen name="StoryPostDetail" component={StoryPostDetailScreen} />
//             </Stack.Navigator>
//           </View>
//         </NavigationContainer>
//       </TabProvider>
//       </ModernModeProvider>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
// });

// export default App;

import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StatusBar, View, StyleSheet } from 'react-native';
import { navigationRef } from './src/utils/NavigationUtil';
import { TabProvider } from './src/context/TabContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/context/ThemeContext';
import { ModernModeProvider } from './src/context/ModerModeContext';
import AppLovinMAX from 'react-native-applovin-max';

// Lazy-loaded screens
const SplashScreen = lazy(() => import('./src/screens/SplashScreen'));
const BottomTabNavigator = lazy(() => import('./src/navigation/BottomTabNavigator'));
const NotificationScreen = lazy(() => import('./src/screens/NotificationScreen'));
const SettingScreen = lazy(() => import('./src/screens/SettingScreen'));
const EditUserProfile = lazy(() => import('./src/components/Profile/EditUserProfile'));
const ProfileDetails = lazy(() => import('./src/components/Profile/ProfileDetails'));
const MyQuidsScreen = lazy(() => import('./src/screens/settingScreens/MyQuidsScreen'));
const CreateGroup = lazy(() => import('./src/screens/CreateGroup'));
const SelectLanguage = lazy(() => import('./src/screens/settingScreens/SelectLanguageScreen'));
const PostScreen = lazy(() => import('./src/screens/PostScreen'));
const CreatePoll = lazy(() => import('./src/screens/CreatePollScreen'));
const WritePost = lazy(() => import('./src/screens/WritePostScreen'));
const StoryPostDetailScreen = lazy(() => import('./src/screens/storyScreens/StoryPostDetailsScreen'));

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSdkInitialized, setIsSdkInitialized] = useState(false);

  const initializeAppLovin = useCallback(async () => {
    try {
      AppLovinMAX.setVerboseLogging(true);
      await AppLovinMAX.initialize('LWmzNhf2PwfOmHXglmhW2LQBHtKS63H1gSo7H2SevpuRdmfTTWX7DEl6w_UxTutNpMo2O5STsZGACXbuTiXdiX');
      console.log('AppLovin SDK initialized');
    } catch (error) {
      console.error('AppLovin SDK initialization failed:', error);
    } finally {
      setIsSdkInitialized(true);
    }
  }, []);

  useEffect(() => {
    const initApp = async () => {
      await initializeAppLovin();
      // Simulate loading other resources
      setTimeout(() => setIsLoading(false), 500);
    };

    initApp();
  }, [initializeAppLovin]);

  const renderScreens = useCallback(() => (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
    >
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="MyQuidsScreen" component={MyQuidsScreen} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="WritePost" component={WritePost} />
      <Stack.Screen name="CreatePoll" component={CreatePoll} />
      <Stack.Screen name="StoryPostDetail" component={StoryPostDetailScreen} />
    </Stack.Navigator>
  ), []);

  if (isLoading || !isSdkInitialized) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Suspense fallback={<View style={styles.splashFallback} />}>
          <SplashScreen />
        </Suspense>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ModernModeProvider>
          <TabProvider>
            <NavigationContainer ref={navigationRef}>
              <View style={styles.mainContainer}>
                <Suspense fallback={<View style={styles.splashFallback} />}>
                  {renderScreens()}
                </Suspense>
              </View>
            </NavigationContainer>
          </TabProvider>
        </ModernModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  splashFallback: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
});

export default React.memo(App);
