// import React, { memo } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { SvgXml } from 'react-native-svg';
// import { avatar_svg, chat_icon, share_svg } from '../utils/constant/TabSVGimage';
// import avatar from '../images/avatar.png';
// import post1 from '../images/post1.png';

// const PostItem = ({ item }) => {
//   const commentCount = item.comments.length;
//   const latestComment = commentCount > 0 ? item.comments[0] : null;

//   return (
//     <View style={styles.postCard}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.avatarContainer}>
//           <SvgXml xml={avatar_svg} width={30} height={30} />
//         </View>
//         <View>
//           <Text style={styles.username}>{item.user}</Text>
//           <Text style={styles.time}>{item.time}</Text>
//         </View>
//         <TouchableOpacity style={styles.menuButton}>
//           <Ionicons name="ellipsis-horizontal" size={20} color="#66645E" />
//         </TouchableOpacity>
//       </View>

//       {/* Post Image */}
//       <View style={styles.imageContainer}>
//         <Image source={post1} style={styles.postImage} />
//         <Text style={styles.postText}>{item.text}</Text>
//       </View>

//       {/* Actions */}
//       <View style={styles.actions}>
//         <View style={styles.actionGroup}>
//           <Ionicons name="heart" size={24} color="red" />
//           <Text style={styles.actionText}>{item.likes}</Text>
//         </View>
//         <View style={styles.actionGroup}>
//           <SvgXml xml={chat_icon} width={17} height={16} />
//           <Text style={styles.actionText}>{commentCount}</Text>
//         </View>
//         <TouchableOpacity style={styles.shareButton}>
//           <SvgXml xml={share_svg} width={18} height={15.7} />
//         </TouchableOpacity>
//       </View>

//       {/* Comments */}
//       {commentCount > 0 ? (
//         <View style={styles.commentsSection}>
//           <View style={styles.comment}>
//             <Image source={avatar} style={styles.commentAvatar} />
//             <Text
//               style={styles.commentText}
//               numberOfLines={1}
//               ellipsizeMode="tail"
//             >
//               <Text style={styles.commentUser}>{latestComment.user}:</Text>{' '}
//               {latestComment.text}
//             </Text>
//           </View>
//           <Text style={styles.viewAllComments}>
//             View all {commentCount} comments
//           </Text>
//         </View>
//       ) : (
//         <Text style={styles.noCommentsText}>No comments yet</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   postCard: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: 'transparent',

//     // borderRadius: 20,
//     // shadowColor: '#000',
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.1,
//     // shadowRadius: 5,
//     // elevation: 3,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'transparent',
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#D3D3D3',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   username: {
//     fontWeight: '700',
//     fontSize: 14,
//     color: '#000',
//   },
//   time: {
//     fontWeight: '500',
//     color: '#66645E',
//     fontSize: 10,
//     lineHeight: 14,
//   },
//   menuButton: {
//     marginLeft: 'auto',
//   },
//   imageContainer: {
//     position: 'relative',
//     borderRadius: 16,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 16,
//   },
//   postText: {
//     position: 'absolute',
//     top: '50%',
//     left: 0,
//     right: 0,
//     transform: [{ translateY: -20 }],
//     fontSize: 24,
//     fontWeight: '700',
//     color: 'white',
//     textAlign: 'center',
//     paddingHorizontal: 20,
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 8,
//   },
//   actionGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   actionText: {
//     marginLeft: 5,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#66645E',
//   },
//   shareButton: {
//     marginLeft: 'auto',
//   },
//   commentsSection: {
//     marginTop: 5,
//     paddingLeft: 8,
//   },
//   comment: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   commentAvatar: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   commentText: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#66645E',
//     flex: 1,
//   },
//   commentUser: {
//     fontWeight: '700',
//     color: '#000',
//   },
//   viewAllComments: {
//     color: '#66645E',
//     fontWeight: '500',
//     fontSize: 10,
//     marginLeft: 2,
//   },
//   noCommentsText: {
//     color: '#66645E',
//     fontWeight: '500',
//     fontSize: 10,
//     marginLeft: 2,
//   },
// });

// export default memo(PostItem);

// components/PostCard.js
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import post1 from '../images/post1.png';
import {SvgXml} from 'react-native-svg';
import {chat_icon} from '../utils/constant/TabSVGimage';

export default function PostItems({image, text, likes, time, tag}) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={post1} style={styles.image} />
        {tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag} Hello</Text>
          </View>
        )}
        <View style={styles.overlay} />
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.iconText, styles.heart]}>❤️ {likes}</Text>
        <View style={styles.comment}>
          <SvgXml xml={chat_icon} width={14.84} height={14} />
          <Text style={styles.commentText}>70</Text>
        </View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginVertical: 10,
    marginHorizontal: 10,
    
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(81, 56, 56, 0.3)',
    borderRadius: 12,
    textAlign: 'center',
  },
  text: {
    position: 'absolute', 
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    zIndex: 1,
    width: '80%', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 8,
  },
  iconText: {
    fontSize: 12,
    color: '#666',
  },
  comment:{
   justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    paddingRight: 10,
    fontSize: 12,
  },
  heart: {
    fontSize: 15.4,
    color: '#E63946',
  },
  timeText: {
    fontSize: 12,
    color: '#777',
  },
  tag: {
    position: 'absolute',
    top: 0,
    left: 3,
    backgroundColor: '#E63946',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
