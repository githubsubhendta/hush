// import React from "react";
// import { View, FlatList, StyleSheet } from "react-native";
// import { posts } from "../utils/PostData";
// import PostItem from "../components/PostItem";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <PostItem item={item} />}
//         contentContainerStyle={styles.listContent}
//         initialNumToRender={10} // Render only 10 items initially
//         maxToRenderPerBatch={10} // Render 10 items per batch
//         windowSize={21} // Default value, renders items within 21 viewports
//         removeClippedSubviews={true} // Unmount components that are off-screen
//         showsVerticalScrollIndicator={false} // Hide scrollbar for better UX
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0", // Match the background color from your app
//   },
//   listContent: {
//     padding: 3,
//     paddingBottom: 10, // Add padding to account for the tab bar height (75 + padding)
//   },
// });

// export default HomeScreen;

import React, { useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { posts } from "../utils/PostData";
import PostItem from "../components/PostItem";

const HomeScreen = () => {
  const renderItem = useCallback(({ item }) => <PostItem item={item} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10} 
        maxToRenderPerBatch={10}
        windowSize={5} 
        removeClippedSubviews={false} 
        showsVerticalScrollIndicator={false} 
        getItemLayout={(data, index) => ({
          length: 250, 
          offset: 250 * index,
          index,
        })} 
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  listContent: { padding: 3, paddingBottom: 10 },
});
