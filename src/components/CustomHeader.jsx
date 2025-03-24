import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, View, Text, TouchableOpacity } from "react-native";
import HeaderBg from "../images/headerBg.png";

const CustomHeader = ({ title }) => (
  <View style={styles.headerContainer}>
    <ImageBackground source={HeaderBg} style={styles.headerBackground} resizeMode="cover">
      <SafeAreaView style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
      </SafeAreaView>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 100,
  },
  headerBackground: {
    width: "100%",
    height: "100%",
  },
  headerContent: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0, 
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tabButton: {
    marginHorizontal: 10,
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomHeader;