import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { ChatIcon, GroupIcon, HomeIcon, WatchIcon } from "../utils/constant/TabSVGimage.js";
import FeedScreen from "../screens/FeedScreen.jsx";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = "";
            if (route.name === "Home") {
              iconName = HomeIcon;
            } else if (route.name === "Watch") {
              iconName = WatchIcon;
            } else if (route.name === "Groups") {
              iconName = GroupIcon;
            } else if (route.name === "Chat") {
              iconName = ChatIcon;
            }
            return <SvgXml xml={iconName} width="100%" height="100%" color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={FeedScreen} />
        <Tab.Screen name="Watch" component={FeedScreen} />
        <Tab.Screen name="Groups" component={FeedScreen} />
        <Tab.Screen name="Chat" component={FeedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
