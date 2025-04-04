import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {StatusBar, View, StyleSheet} from 'react-native';
import HotTabScreen from './src/components/TabScreens/HotTabSceen';
import GlobalTabScreen from './src/components/TabScreens/GlobalTabSCreen';
import NotificationScreen from './src/screens/NotificationScreen';
import {navigationRef} from './src/utils/NavigationUtil';
import {TabProvider} from './src/context/TabContext';
import SettingScreen from './src/screens/SettingScreen';
import EditUserProfile from './src/components/Profile/EditUserProfile';
import ProfileDetails from './src/components/Profile/ProfileDetails';
import MyQuidsScreen from './src/screens/settingScreens/MyQuidsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
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
    <TabProvider>
      <NavigationContainer ref={navigationRef}>
        {/* Status Bar Background */}
        {/* <View style={styles.statusBarBackground}>
        <ImageBackground
          source={require('./src/images/headerBg.png')}
          style={styles.statusBarImage}
          resizeMode="cover"
        />

        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      </View> */}

        {/* Main Content */}
        <View style={styles.mainContainer}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
              transitionSpec: {
                open: {animation: 'timing', config: {duration: 300}},
                close: {animation: 'timing', config: {duration: 300}},
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

          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </TabProvider>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight,
    zIndex: 1,
    overflow: 'hidden',
  },
  statusBarImage: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
  },
});

export default App;
