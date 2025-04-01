// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {useNavigation} from '@react-navigation/native';
// import {back_arrow_svg} from '../utils/constant/TabSVGimage';

// const NotificationsScreen = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('Likes');

//   const notifications = [
//     {
//       id: '1',
//       user: 'los_Nagel',
//       action: 'replied to your post',
//       time: '3m ago',
//     },
//     {
//       id: '2',
//       user: 'swan_bird',
//       action: 'replied to your story',
//       time: '5m ago',
//     },
//     {id: '3', user: 'user_1234', action: 'liked your video', time: '7h ago'},
//     {
//       id: '4',
//       user: 'cyan_blackbird',
//       action: 'voted on your poll',
//       time: '5d ago',
//     },
//     {id: '5', user: 'breen_mint', action: 'liked your post', time: '7d ago'},
//     {
//       id: '6',
//       user: 'to_sSomeone',
//       action: 'voted on your poll',
//       time: '9d ago',
//     },
//     {
//       id: '7',
//       user: 'green_poster',
//       action: `posted to "Me in pic"`,
//       time: '10d ago',
//     },
//     {
//       id: '8',
//       user: 'official_black',
//       action: 'liked your poll',
//       time: '1mo ago',
//     },
//     {
//       id: '9',
//       user: 'break_dance',
//       action: 'replied to your poll',
//       time: '8d ago',
//     },
//   ];

//   const renderItem = ({item}) => (
//     <View style={styles.notificationItem}>
//       <View style={styles.notificationText}>
//         <Text style={styles.userName}>{item.user} </Text>
//         <Text style={styles.actionText}>{item.action}</Text>
//         <Text style={styles.timeText}>{item.time}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <ImageBackground
//         source={require('../images/headerBg.png')}
//         resizeMode="cover"
//         imageStyle={{opacity: 1}}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <SvgXml xml={back_arrow_svg} width={25} height={25} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Notifications</Text>
//         </View>
//       </ImageBackground>

//       {/* FlatList with Scrollable Tabs */}
//       <View style={styles.itemsContainer}>
//         <FlatList
//           data={notifications}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//           ListHeaderComponent={
//             <View style={styles.tabsContainer}>
//               {['Posts', 'Likes', 'Replies'].map(tab => (
//                 <TouchableOpacity
//                   key={tab}
//                   style={[
//                     styles.tab,
//                     activeTab === tab ? styles.activeTab : null,
//                   ]}
//                   onPress={() => setActiveTab(tab)}>
//                   <Text
//                     style={[
//                       styles.tabText,
//                       activeTab === tab ? styles.activeTabText : null,
//                     ]}>
//                     {tab}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           }
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     height: 110,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   tabsContainer: {
//      width:"100%",
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     backgroundColor: '#EEE8D5',
//     justifyContent: 'space-around',
//   },
//   itemsContainer: {
//     flex: 1,

//   },
//   tab: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 15,

//   },
//   activeTab: {
//     backgroundColor: '#5C3D8E',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#5C3D8E',
//   },
//   activeTabText: {
//     color: 'white',
//   },
//   list: {
//     paddingHorizontal: 15,
//   },
//   notificationItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // padding: 12,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   notificationText: {
//     flex: 1,
//   },
//   userName: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   actionText: {
//     color: '#555',
//     fontSize: 14,
//   },
//   timeText: {
//     fontSize: 12,
//     color: '#777',
//     marginTop: 3,
//   },
// });

// export default NotificationsScreen;

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {back_arrow_svg} from '../utils/constant/TabSVGimage';
import {useNavigation} from '@react-navigation/native';




const notifications = [
  {
    id: '1',
    icon: 'chatbubble-outline',
    user: 'los_Nagel',
    action: 'replied to your post',
    time: '3m ago',
  },
  {
    id: '2',
    icon: 'chatbubble-outline',
    user: 'swan_bird',
    action: 'replied to your story',
    time: '5m ago',
  },
  {
    id: '3',
    icon: 'heart-outline',
    user: 'user_1234',
    action: 'liked your video',
    time: '7h ago',
  },
  {
    id: '4',
    icon: 'hand-right-outline',
    user: 'cyan_blackbird',
    action: 'voted on your poll',
    time: '5d ago',
  },
  {
    id: '5',
    icon: 'heart-outline',
    user: 'breen_mint',
    action: 'liked your post',
    time: '7d ago',
  },
  {
    id: '6',
    icon: 'chatbubble-outline',
    user: 'swan_bird',
    action: 'replied to your poll',
    time: '8d ago',
  },
  {
    id: '7',
    icon: 'heart-outline',
    user: 'brin_mintin',
    action: 'liked your video',
    time: '7h ago',
  },
  {
    id: '8',
    icon: 'hand-right-outline',
    user: 'to_Someone',
    action: 'voted on your poll',
    time: '9d ago',
  },
  {
    id: '9',
    icon: 'people-outline',
    user: 'green_poster',
    action: 'posted to "Me in pic"',
    time: '10d ago',
  },
  {
    id: '10',
    icon: 'heart-outline',
    user: 'official_black',
    action: 'liked your poll',
    time: '11d ago',
  },
  {
    id: '11',
    icon: 'chatbubble-outline',
    user: 'break_dance',
    action: 'replied to your poll',
    time: '8d ago',
  },
];

// Notification Item Component
const NotificationItem = ({item}) => (

  <View style={styles.notificationItem}>
    {/* <Ionicons name={item.icon} size={24} color={item.icon === 'heart-outline' ? '#FF3B30' : '#1DA1F2'} /> */}
    <View style={styles.notificationTextContainer}>
      <Text style={styles.notificationText}>
        <Text style={styles.username}>{item.user}</Text> {item.action}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
    <TouchableOpacity>
      {/* <Ionicons name="ellipsis-horizontal" size={20} color="#888" /> */}
    </TouchableOpacity>
  </View>
);

// Main Notifications Screen Component
const NotificationsScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        imageStyle={{opacity: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </ImageBackground>

      {/* Stats Section */}

      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        imageStyle={{opacity: 2}}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2721</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Replies</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Activity Section */}
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>ACTIVITY</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop:20
    // paddingVertical: 50,

  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EEE8D5',
    paddingVertical: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // marginHorizontal: 10,
    // borderRadius: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activityTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  markAllRead: {
    color: '#1DA1F2',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  notificationText: {
    color: '#FFF',
    fontSize: 14,
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
});

export default NotificationsScreen;
