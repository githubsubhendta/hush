import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Header from '../components/Header';
import HotTabScreen from '../components/TabScreens/HotTabSceen';
import GlobalTabScreen from '../components/TabScreens/GlobalTabSCreen';
import LocalTabScreen from '../components/TabScreens/LocalTabScreen';
import WatchHeader from '../components/WatchHeader';
// import GlobalTabScreen from '../components/TabScreens/GlobalTabScreen';
// import LocalTabScreen from '../components/TabScreens/LocalTabScreen';

const WatchScreen = () => {
  const [activeTab, setActiveTab] = useState('Hot'); // Default is 'Hot'

  return (
    <ImageBackground
      source={require('../images/headerBg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <WatchHeader onTabPress={setActiveTab}/>           
      {/* < onTabPress={setActiveTab} /> */}


      <View style={styles.container}>
        {activeTab === 'Hot' && <HotTabScreen />}
        {activeTab === 'Global' && <GlobalTabScreen/>}
        {activeTab === 'Local' && <LocalTabScreen/>}
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
});

export default WatchScreen;