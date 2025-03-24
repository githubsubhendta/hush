// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { SvgXml } from "react-native-svg";
// import { ChatIcon, GroupIcon, HomeIcon, WatchIcon } from "../utils/constant/TabSVGimage.js";
// import HomeScreen from "../screens/HomeScreen.jsx";

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => {
//             let iconName = "";
//             if (route.name === "Home") {
//               iconName = HomeIcon;
//             } else if (route.name === "Watch") {
//               iconName = WatchIcon;
//             } else if (route.name === "Groups") {
//               iconName = GroupIcon;
//             } else if (route.name === "Chat") {
//               iconName = ChatIcon;
//             }
//             return <SvgXml xml={iconName} width="100%" height="100%" color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: "🏠 My Home" }}  />
//         <Tab.Screen name="Watch" component={HomeScreen} />
//         <Tab.Screen name="Groups" component={HomeScreen} />
//         <Tab.Screen name="Chat" component={HomeScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };



// import React, { useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   View,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { SvgXml } from 'react-native-svg';
// import {
//   ChatIcon,
//   GroupIcon,
//   HomeIcon,
//   WatchIcon,
//   PlusIcon,
// } from '../utils/constant/TabSVGimage.js';
// import HomeScreen from '../screens/HomeScreen.jsx';
// import PlusScreen from '../screens/PlusScreen.jsx';
// import CustomHeader from '../components/CustomHeader.jsx';
// import ChatScreen from '../screens/ChatScreen.jsx';
// import GroupScreen from '../screens/GroupScreen.jsx';
// import WatchScreen from '../screens/WatchScreen.jsx';

// // Initialize Bottom Tabs
// const Tab = createBottomTabNavigator();
// const { width } = Dimensions.get('window');
// const iconSize = width * 0.08;
// const plusIconSize = width * 0.12;

// // Custom Plus Button Component
// const CustomPlusButton = ({ onPress }) => (
//   <TouchableOpacity style={styles.plusButton} onPress={onPress}>
//     <SvgXml xml={PlusIcon} width={plusIconSize} height={plusIconSize} />
//   </TouchableOpacity>
// );

// // Main BottomTabNavigator Component
// const BottomTabNavigator = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => {
//             let iconName = '';
//             if (route.name === 'Home') iconName = HomeIcon;
//             else if (route.name === 'Watch') iconName = WatchIcon;
//             else if (route.name === 'Groups') iconName = GroupIcon;
//             else if (route.name === 'Chat') iconName = ChatIcon;
//             return <SvgXml xml={iconName} width={iconSize} height={iconSize} color={color} />;
//           },
//           header: ({ options }) => <CustomHeader title={options.headerTitle} />,
//           tabBarStyle: {
//             height: 75,
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingTop: 15,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//           },
//           tabBarPressOpacity: 1,
//           tabBarPressColor: 'transparent',
//           tabBarButton: props => <TouchableOpacity {...props} activeOpacity={1} />,
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: '🏠 My Home' }} />
//         <Tab.Screen name="Watch" component={WatchScreen} options={{ headerTitle: '📺 Watch Videos' }} />
//         <Tab.Screen
//           name="Plus"
//           component={() => <View />} // ✅ Fix: Prevent navigation issue
//           options={{
//             tabBarButton: () => <CustomPlusButton onPress={() => setModalVisible(true)} />,
//           }}
//         />
//         <Tab.Screen name="Groups" component={GroupScreen} options={{ headerTitle: '👥 My Groups' }} />
//         <Tab.Screen name="Chat" component={ChatScreen} options={{ headerTitle: '💬 Messages' }} />
//       </Tab.Navigator>
//       {/* Render PlusScreen Modal */}
//       {modalVisible && <PlusScreen visible={modalVisible} onClose={() => setModalVisible(false)} />}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   plusButton: {
//     width: 50,
//     height: 50,
//     alignItems: 'center',
//     bottom: -5,
//     alignSelf: 'center',
//   },
// });

// export default BottomTabNavigator;


import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import {
  ChatIcon,
  GroupIcon,
  HomeIcon,
  WatchIcon,
  PlusIcon,
} from '../utils/constant/TabSVGimage.js';
import HomeScreen from '../screens/HomeScreen.jsx';
import PlusScreen from '../screens/PlusScreen.jsx';
import CustomHeader from '../components/CustomHeader.jsx';
import ChatScreen from '../screens/ChatScreen.jsx';
import GroupScreen from '../screens/GroupScreen.jsx';
import WatchScreen from '../screens/WatchScreen.jsx';
import Loader from '../components/Loader.jsx'; 

// Initialize Bottom Tabs
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const iconSize = width * 0.08;
const plusIconSize = width * 0.12;

// Custom Plus Button Component
const CustomPlusButton = ({ onPress }) => (
  <TouchableOpacity style={styles.plusButton} onPress={onPress}>
    <SvgXml xml={PlusIcon} width={plusIconSize} height={plusIconSize} />
  </TouchableOpacity>
);

// Main BottomTabNavigator Component
const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* ✅ Global Loader */}
      <Loader visible={loading} />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = '';
            if (route.name === 'Home') iconName = HomeIcon;
            else if (route.name === 'Watch') iconName = WatchIcon;
            else if (route.name === 'Groups') iconName = GroupIcon;
            else if (route.name === 'Chat') iconName = ChatIcon;
            return <SvgXml xml={iconName} width={iconSize} height={iconSize} color={color} />;
          },
          header: ({ options }) => <CustomHeader title={options.headerTitle} />,
          tabBarStyle: {
            height: 75,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 15,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarPressOpacity: 1,
          tabBarPressColor: 'transparent',
          tabBarButton: props => <TouchableOpacity {...props} activeOpacity={1} />,
        })}
        screenListeners={{
          state: e => {
            setLoading(true); 
            setTimeout(() => setLoading(false), 500); // Hide after animation
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: '🏠 My Home' }} />
        <Tab.Screen name="Watch" component={WatchScreen} options={{ headerTitle: '📺 Watch Videos' }} />
        <Tab.Screen
          name="Plus"
          component={() => <View />} // ✅ Fix: Prevent navigation issue
          options={{
            tabBarButton: () => <CustomPlusButton onPress={() => setModalVisible(true)} />,
          }}
        />
        <Tab.Screen name="Groups" component={GroupScreen} options={{ headerTitle: '👥 My Groups' }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerTitle: '💬 Messages' }} />
      </Tab.Navigator>

      {/* Render PlusScreen Modal */}
      {modalVisible && <PlusScreen visible={modalVisible} onClose={() => setModalVisible(false)} />}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    bottom: -5,
    alignSelf: 'center',
  },
});

export default BottomTabNavigator;
