import React from "react";
import { View, FlatList ,StyleSheet} from "react-native";
import { posts } from "../utils/PostData";
// import { styles } from "../styles/styles";
import PostItem from "../components/PostItem";

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" }
})

export default FeedScreen;
