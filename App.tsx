import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {ImageBackground, SafeAreaView, StatusBar, View} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./src/images/headerBg.png')}
     
        resizeMode="cover"
        >
       
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          </ImageBackground>
    
       
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
            }}>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          </Stack.Navigator>
        </View>
      
    </NavigationContainer>
  );
};

export default App;
