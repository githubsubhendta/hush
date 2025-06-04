// navigation/WatchStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WatchScreen from '../screens/WatchScreen';
import StoryPostDetailsScreen from '../screens/storyScreens/StoryPostDetailsScreen';
import PollResultsScreen from '../screens/storyScreens/pollScreens/PollResultsScreen';

const WatchStack = createStackNavigator();

const WatchStackNavigator = () => (
  <WatchStack.Navigator screenOptions={{ headerShown: false }}>
    <WatchStack.Screen name="WatchMain" component={WatchScreen} />
    <WatchStack.Screen name="StoryPostDetail" component={StoryPostDetailsScreen} />
    <WatchStack.Screen name="PollResultScreen" component={PollResultsScreen} />
  </WatchStack.Navigator>
);

export default WatchStackNavigator;
