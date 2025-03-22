import React from "react";
import { View, Text, Image,StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { styles } from "../styles/styles";
import post1 from "../images/post1.png";
import avatar from "../images/avatar.png"


const PostItem = ({ item }) => {
  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        {/* <Image source={{ uri: "https://source.unsplash.com/50x50" }} style={styles.avatar} /> */}
        <Image source={avatar} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Image source={post1 } style={styles.postImage} />
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.actions}>
        <Ionicons name="heart" size={20} color="red" />
        <Text style={styles.likes}>{item.likes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    postCard: { backgroundColor: "#fff", padding: 10, margin: 10, borderRadius: 10 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    username: { fontWeight: "bold" },
    time: { color: "gray", fontSize: 12 },
    postImage: { width: "100%", height: 200, borderRadius: 10, marginTop: 5 },
    postText: { marginTop: 10, fontSize: 14, fontWeight: "bold" },
    actions: { flexDirection: "row", alignItems: "center", marginTop: 5 },
    likes: { marginLeft: 5 },
})
export default PostItem;
