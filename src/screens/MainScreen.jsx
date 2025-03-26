// MainScreen.js
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

// Background image (replace with your own asset)
const backgroundImage = require('../images/headerBg.png');

const Stack = createStackNavigator();

const MainScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          )}
        </Stack.Navigator>
     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default MainScreen;