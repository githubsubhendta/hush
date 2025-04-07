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
// import ChatScreen from '../screens/ChatScreen.jsx';
// import GroupScreen from '../screens/GroupScreen.jsx';
// import WatchScreen from '../screens/WatchScreen.jsx';
// import Loader from '../components/Loader.jsx';
// import Header from '../components/Header.jsx';

// const Tab = createBottomTabNavigator();
// const { width } = Dimensions.get('window');
// const iconSize = width * 0.06;
// const plusIconSize = width * 0.1;

// const CustomPlusButton = ({ onPress }) => (
//   <TouchableOpacity style={styles.plusButton} onPress={onPress}>
//     <SvgXml xml={PlusIcon} width={plusIconSize} height={plusIconSize} />
//   </TouchableOpacity>
// );

// const BottomTabNavigator = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Loader visible={loading} />

//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => {
//             let iconName = '';
//             if (route.name === 'Home') iconName = HomeIcon;
//             else if (route.name === 'Watch') iconName = WatchIcon;
//             else if (route.name === 'Plus') return null;
//             else if (route.name === 'Groups') iconName = GroupIcon;
//             else if (route.name === 'Chat') iconName = ChatIcon;
//             return (
//               <SvgXml
//                 xml={iconName}
//                 width={iconSize}
//                 height={iconSize}
//                 fill={color}
//               />
//             );
//           },
//           header: () => (
//             <View style={{ backgroundColor: 'transparent' }}>
//               <Header onTabPress={tab => console.log('Selected:', tab)} />
//             </View>
//           ),
//           tabBarStyle: {
//             height: 60,
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingBottom: 5,
//             backgroundColor: '#fff',
//             borderTopWidth: 0,
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 5,
//           },
//           tabBarLabel: () => null,
//           tabBarActiveTintColor: '#000',
//           tabBarInactiveTintColor: '#666',
//         })}
//         screenListeners={{
//           state: () => {
//             setLoading(true);
//             setTimeout(() => setLoading(false), 500);
//           },
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Watch" component={WatchScreen} />
//         <Tab.Screen
//           name="Plus"
//           component={View}
//           options={{
//             tabBarButton: () => (
//               <CustomPlusButton onPress={() => setModalVisible(true)} />
//             ),
//           }}
//         />
//         <Tab.Screen name="Groups" component={GroupScreen} />
//         <Tab.Screen name="Chat" component={ChatScreen} />
//       </Tab.Navigator>

//       {modalVisible && (
//         <PlusScreen
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent', // Ensure the container is transparent
//   },
//   plusButton: {
//     width: 50,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     bottom: 10,
//     backgroundColor: '#392EBD',
//     borderRadius: 25,
//   },
// });

// export default BottomTabNavigator;

import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {
  ChatIcon,
  GroupIcon,
  HomeIcon,
  WatchIcon,
  PlusIcon,
} from '../utils/constant/TabSVGimage.js';
import HomeScreen from '../screens/HomeScreen.jsx';
import PlusScreen from '../screens/PlusScreen.jsx';
import ChatScreen from '../screens/ChatScreen.jsx';
import GroupScreen from '../screens/GroupScreen.jsx';
import WatchScreen from '../screens/WatchScreen.jsx';
import Loader from '../components/Loader.jsx';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const iconSize = width * 0.08;
const plusIconSize = width * 0.1;

const CustomPlusButton = ({onPress}) => (
  <TouchableOpacity style={styles.plusButton} onPress={onPress}>
    <SvgXml xml={PlusIcon} width={42} height={42} />
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Loader visible={loading} /> */}

      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color}) => {
            let iconName = '';
            if (route.name === 'Home') iconName = HomeIcon;
            else if (route.name === 'Watch') iconName = WatchIcon;
            else if (route.name === 'Plus') return null;
            else if (route.name === 'Groups') iconName = GroupIcon;
            else if (route.name === 'Chat') iconName = ChatIcon;
            return (
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={iconName}
                  width={iconSize}
                  height={iconSize}
                  fill={color}
                />
              </View>
            );
          },
          tabBarStyle: {
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 12,
            backgroundColor: '#fff',
            borderTopWidth: 0,
            borderColor: 'transparent',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarLabel: route.name,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
        })}
        screenListeners={{
          state: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 300);
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />
        <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />
        <Tab.Screen
          name="Plus"
          component={View}
          options={{
            tabBarButton: () => (
              <CustomPlusButton onPress={() => setModalVisible(true)} />
            ),
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />
      </Tab.Navigator>

      {modalVisible && (
        <PlusScreen
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  plusButton: {
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BottomTabNavigator;
