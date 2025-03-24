// import React from "react";
// import { View, Text, Image, FlatList, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// // import { tapHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler";
// import {SvgXml} from "react-native-svg"

// import { ChatIcon, GroupIcon, HomeIcon, WatchIcon } from "./src/utils/constant/TabSVGimage.js";
// const posts = [
//   {
//     id: "1",
//     user: "user_1234",
//     time: "1h ago",
//     image: "https://source.unsplash.com/random/300x200",
//     text: "anyone want to rate me or not can you tell me??",
//     likes: 70,
//     comments: "OMG, this place is literally the bomb! 🎉 Can't even handle how epic...",
//   },
//   {
//     id: "2",
//     user: "user_1234",
//     time: "1h ago",
//     image: "https://source.unsplash.com/random/301x201",
//     text: "this is you love, anyone online here to chat",
//     likes: 50,
//     comments: "",
//   },
//   {
//     id: "3",
//     user: "user_1234",
//     time: "1h ago",
//     image: "https://source.unsplash.com/random/301x201",
//     text: "this is you love, anyone online here to chat",
//     likes: 50,
//     comments: "",
//   },
//   {
//     id: "4",
//     user: "user_1234",
//     time: "1h ago",
//     image: "https://source.unsplash.com/random/301x201",
//     text: "this is you love, anyone online here to chat",
//     likes: 50,
//     comments: "",
//   },
// ];

// const FeedScreen = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.postCard}>
//             <View style={styles.header}>
//               <Image source={{ uri: "https://source.unsplash.com/50x50" }} style={styles.avatar} />
//               <View>
//                 <Text style={styles.username}>{item.user}</Text>
//                 <Text style={styles.time}>{item.time}</Text>
//               </View>
//             </View>
//             <Image source={{ uri: item.image }} style={styles.postImage} />
//             <Text style={styles.postText}>{item.text}</Text>
//             <View style={styles.actions}>
//               <Ionicons name="heart" size={20} color="red" />
//               <Text style={styles.likes}>{item.likes}</Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName="";
//           if (route.name === "Home") {
//             iconName = HomeIcon;
//           } else if (route.name === "Watch") {
//             iconName = WatchIcon;
//           } else if (route.name === "Groups") {
//             iconName = GroupIcon;
//           } else if (route.name === "Chat") {
//             iconName = ChatIcon;
//           }
//           return <SvgXml  xml={iconName} width="100%" height="100%" color={color} />;
//         },
//       })}>
//         <Tab.Screen name="Home" component={FeedScreen} />
//         <Tab.Screen name="Watch" component={FeedScreen} />
//         <Tab.Screen name="Groups" component={FeedScreen} />
//         <Tab.Screen name="Chat" component={FeedScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   postCard: { backgroundColor: "#fff", padding: 10, margin: 10, borderRadius: 10 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   username: { fontWeight: "bold" },
//   time: { color: "gray", fontSize: 12 },
//   postImage: { width: "100%", height: 200, borderRadius: 10, marginTop: 5 },
//   postText: { marginTop: 10, fontSize: 14, fontWeight: "bold" },
//   actions: { flexDirection: "row", alignItems: "center", marginTop: 5 },
//   likes: { marginLeft: 5 },
// });

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const App = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);

export default App;




