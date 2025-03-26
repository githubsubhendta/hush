import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {ImageBackground} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./src/images/headerBg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="cover">
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
};

export default App;
