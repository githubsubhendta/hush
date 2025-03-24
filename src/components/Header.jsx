import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Fire icon
import Feather from "react-native-vector-icons/Feather"; // Bell & User icons

const Header = ({ onTabPress }) => {
  return (
    <View style={styles.container}>
      {/* Left Section - Hot Button */}
      <TouchableOpacity style={styles.hotButton} onPress={() => onTabPress("Hot")}>
        <Icon name="fire" size={18} color="#FF6200" />
        <Text style={styles.hotText}>Hot</Text>
      </TouchableOpacity>

      {/* Center Section - Global & Local */}
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={() => onTabPress("Global")}>
          <Text style={styles.menuText}>Global</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress("Local")}>
          <Text style={[styles.menuText, styles.localText]}>Local</Text>
        </TouchableOpacity>
      </View>

      {/* Right Section - Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => onTabPress("Notifications")}>
          <Feather name="bell" size={22} color="white" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress("Profile")}>
          <Feather name="user" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#1a0b1d",
  },
  hotButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d1b42",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  hotText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  centerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "white",
    marginHorizontal: 10,
  },
  localText: {
    opacity: 0.5,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    position: "relative",
    marginRight: 16,
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
});

export default Header;
