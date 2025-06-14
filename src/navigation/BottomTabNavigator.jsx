// import React, {useState} from 'react';
// import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {SvgXml} from 'react-native-svg';
// import {
//   ChatIcon,
//   GroupIcon,
//   HomeIcon,
//   HomeIconWhite,
//   GroupIconWhite,
//   ChatIconWhite,
//   WatchIconWhite,
//   WatchIcon,
//   PlusIcon,
//   PlusIconWhite,
//   cross_svg,
// } from '../utils/constant/TabSVGimage.js';
// import HomeScreen from '../screens/HomeScreen.jsx';
// import PlusScreen from '../screens/PlusScreen.jsx';
// import ContactScreen from '../screens/ContactScreen.jsx';
// import GroupScreen from '../screens/GroupScreen.jsx';
// import WatchScreen from '../screens/WatchScreen.jsx';
// import {useTheme} from '../context/ThemeContext.js';
// import WatchStackNavigator from './WatchStackNavigator.jsx';
// import {useBottomTab} from '../context/BottomTabContext.js';

// const Tab = createBottomTabNavigator();
// const {width} = Dimensions.get('window');
// const iconSize = width * 0.08;

// export const CustomPlusButton = ({onPress, isActive}) => {
//   const {isDarkModeOn} = useTheme();

//   const iconXml = isActive
//     ? cross_svg
//     : isDarkModeOn
//     ? PlusIconWhite
//     : PlusIcon;

//   return (
//     <TouchableOpacity style={styles.plusButton} onPress={onPress}>
//       <SvgXml xml={iconXml} width={42} height={42} />
//     </TouchableOpacity>
//   );
// };

// const BottomTabNavigator = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const {isTabVisible} = useBottomTab();
//   const toggleModal = () => {
//     console.log('Toggling modal');
//     setModalVisible(prev => !prev);
//   };

//   const {isDarkModeOn} = useTheme();
//   const backgroundColor = isDarkModeOn ? '#141414' : '#fff';
//   const TextColorStyle = isDarkModeOn ? '#fff' : '#000';

//   return (
//     <View style={styles.container}>
//       {/* <Loader visible={loading} /> */}

//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           headerShown: false,
//           tabBarIcon: ({color}) => {
//             let iconName = '';
//             if (route.name === 'Home')
//               iconName = isDarkModeOn ? HomeIconWhite : HomeIcon;
//             else if (route.name === 'Watch')
//               iconName = isDarkModeOn ? WatchIconWhite : WatchIcon;
//             else if (route.name === 'Plus') return null;
//             else if (route.name === 'Groups')
//               iconName = isDarkModeOn ? GroupIconWhite : GroupIcon;
//             else if (route.name === 'Chat')
//               iconName = isDarkModeOn ? ChatIconWhite : ChatIcon;
//             return (
//               <View style={styles.iconContainer}>
//                 <SvgXml
//                   xml={iconName}
//                   width={iconSize}
//                   height={iconSize}
//                   fill={color}
//                 />
//               </View>
//             );
//           },
//           tabBarStyle: {
//             display: isTabVisible ? 'flex' : 'none',
//             height: 70,
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingTop: 12,
//             backgroundColor: backgroundColor,
//             borderTopWidth: 0,
//             borderColor: 'transparent',
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: -2},
//             shadowOpacity: 0.1,
//             shadowRadius: 5,
//           },
//           tabBarLabel: route.name,
//           tabBarLabelStyle: {
//             fontSize: 12,
//             color: TextColorStyle,
//           },
//           tabBarActiveTintColor: '#000',
//           tabBarInactiveTintColor: 'gray',
//           tabBarPressColor: 'transparent',
//           tabBarPressOpacity: 1,
//         })}
//         screenListeners={{
//           state: () => {
//             setLoading(true);
//             setTimeout(() => setLoading(false), 300);
//           },
//         }}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarButton: props => (
//               <TouchableOpacity {...props} activeOpacity={1} />
//             ),
//           }}
//         />
//         {/* <Tab.Screen
//           name="Watch"
//           component={WatchScreen}
//           options={{
//             tabBarButton: props => (
//               <TouchableOpacity {...props} activeOpacity={1} />
//             ),
//           }}
//         /> */}

//         <Tab.Screen
//           name="Watch"
//           component={WatchStackNavigator}
//           options={{
//             tabBarButton: props => (
//               <TouchableOpacity {...props} activeOpacity={1} />
//             ),
//           }}
//         />

//         {/* <Tab.Screen
//           name="Plus"
//           component={() => null}
//           options={{
//             tabBarButton: () => (
//               <CustomPlusButton
//                 isActive={modalVisible}
//                 onPress={toggleModal}
//               />
//             ),
//           }}
//         /> */}

//         <Tab.Screen
//           name="Plus"
//           options={{
//             tabBarButton: () => (
//               <CustomPlusButton isActive={modalVisible} onPress={toggleModal} />
//             ),
//           }}>
//           {() => null}
//         </Tab.Screen>

//         <Tab.Screen
//           name="Groups"
//           component={GroupScreen}
//           options={{
//             tabBarButton: props => (
//               <TouchableOpacity {...props} activeOpacity={1} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Chat"
//           component={ChatScreen}
//           options={{
//             tabBarButton: props => (
//               <TouchableOpacity {...props} activeOpacity={1} />
//             ),
//           }}
//         />
//       </Tab.Navigator>

//       {modalVisible && (
//         <PlusScreen visible={modalVisible} onClose={toggleModal} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   plusButton: {
//     paddingTop: 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//   },
//   iconContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

// export default BottomTabNavigator;


import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {
  ChatIcon,
  GroupIcon,
  HomeIcon,
  HomeIconWhite,
  GroupIconWhite,
  ChatIconWhite,
  WatchIconWhite,
  WatchIcon,
  PlusIcon,
  PlusIconWhite,
  cross_svg,
} from '../utils/constant/TabSVGimage.js';
import HomeScreen from '../screens/HomeScreen.jsx';
import PlusScreen from '../screens/PlusScreen.jsx';
import ContactScreen from '../screens/ContactScreen.jsx';
import GroupScreen from '../screens/GroupScreen.jsx';
import WatchScreen from '../screens/WatchScreen.jsx';
import {useTheme} from '../context/ThemeContext.js';
import WatchStackNavigator from './WatchStackNavigator.jsx';
import {useBottomTab} from '../context/BottomTabContext.js';
import HomeStackNavigator from './HomeStackNavigator.jsx';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const iconSize = width * 0.08;

export const CustomPlusButton = ({onPress, isActive}) => {
  const {isDarkModeOn} = useTheme();

  const iconXml = isActive
    ? cross_svg
    : isDarkModeOn
    ? PlusIconWhite
    : PlusIcon;

  return (
    <TouchableOpacity style={styles.plusButton} onPress={onPress}>
      <SvgXml xml={iconXml} width={42} height={42} />
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {tabBarTranslateY} = useBottomTab();
  const [loading, setLoading] = useState(false);
  const {isTabVisible} = useBottomTab();
  const toggleModal = () => {
    console.log('Toggling modal');
    setModalVisible(prev => !prev);
  };

  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#141414' : '#fff';
  const TextColorStyle = isDarkModeOn ? '#fff' : '#000';

  return (
    <View style={styles.container}>
      {/* <Loader visible={loading} /> */}

      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color}) => {
            let iconName = '';
            if (route.name === 'Home')
              iconName = isDarkModeOn ? HomeIconWhite : HomeIcon;
            else if (route.name === 'Watch')
              iconName = isDarkModeOn ? WatchIconWhite : WatchIcon;
            else if (route.name === 'Plus') return null;
            else if (route.name === 'Groups')
              iconName = isDarkModeOn ? GroupIconWhite : GroupIcon;
            else if (route.name === 'Chat')
              iconName = isDarkModeOn ? ChatIconWhite : ChatIcon;
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
            // transform: [{translateY: tabBarTranslateY}],
            // height: 70,
            // alignItems: 'center',
            // justifyContent: 'center',
            // paddingTop: 12,
            // backgroundColor: backgroundColor,
            // borderTopWidth: 0,
            // borderColor: 'transparent',
            // elevation: 5,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: -2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,

            height: 70,
            transform: [{translateY: tabBarTranslateY}], 
            position: 'absolute',
            paddingTop: 12,
            backgroundColor: backgroundColor,
            borderTopWidth: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarLabel: route.name,
          tabBarLabelStyle: {
            fontSize: 12,
            color: TextColorStyle,
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
        {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        /> */}

<Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />

        {/* <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        /> */}

        <Tab.Screen
          name="Watch"
          component={WatchStackNavigator}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />

        {/* <Tab.Screen
          name="Plus"
          component={() => null} 
          options={{
            tabBarButton: () => (
              <CustomPlusButton
                isActive={modalVisible}
                onPress={toggleModal}
              />
            ),
          }}
        /> */}

        <Tab.Screen
          name="Plus"
          options={{
            tabBarButton: () => (
              <CustomPlusButton isActive={modalVisible} onPress={toggleModal} />
            ),
          }}>
          {() => null}
        </Tab.Screen>

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
          component={ContactScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        />
      </Tab.Navigator>

      {modalVisible && (
        <PlusScreen visible={modalVisible} onClose={toggleModal} />
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
    zIndex: 1000,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BottomTabNavigator;
