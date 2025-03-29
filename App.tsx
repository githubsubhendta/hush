import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {ImageBackground, StatusBar, View, StyleSheet} from 'react-native';
import HotTabScreen from './src/components/TabScreens/HotTabSceen';
import GlobalTabScreen from './src/components/TabScreens/GlobalTabSCreen';

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
    <NavigationContainer>
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
            cardStyle: {backgroundColor: 'transparent'},
          }}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          
          <Stack.Screen
            name="HotTabScreen"
            component={HotTabScreen}
            options={{headerShown: false}}/>
            <Stack.Screen
            name="GlobalTabScreen"
            component={GlobalTabScreen}
            options={{headerShown: false}}/>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
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
    // backgroundColor: '#ffffff', 
    // paddingTop: StatusBar.currentHeight,
  },
});

export default App;
