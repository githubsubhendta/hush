import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

const CustomHeader = ({ title }) => (
  <View style={styles.headerContainer}>
    <SafeAreaView style={styles.headerContent}>
      <Text style={styles.headerTitle}>{title}</Text>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: 'transparent', // Transparent background
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomHeader;