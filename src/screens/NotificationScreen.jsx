import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  heart_svg,
  play_svg,
  pollIcon_svg,
  post_sign_svg,
  postIcon_svg,
  reply_svg,
  storyIcon_svg,
  vote_svg,
} from '../utils/constant/TabSVGimage';
import {useNavigation} from '@react-navigation/native';

const notifications = [
  {id: '1', user: 'los_Nagel', action: 'replied to your post', time: '3m ago'},
  {id: '2', user: 'swan_bird', action: 'replied to your story', time: '5m ago'},
  {id: '3', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {id: '4', user: 'user_1234', action: 'liked your story', time: '7h ago'},
  {id: '5', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {id: '6', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {id: '7', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {id: '8', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {id: '9', user: 'user_1234', action: 'liked your video', time: '7h ago'},
  {
    id: '10',
    user: 'cyan_blackbird',
    action: 'voted on your poll',
    time: '5d ago',
  },
];

const getIcon = action => {
  if (!action || typeof action !== 'string') return null;

  if (action.includes('replied')) {
    return <SvgXml xml={reply_svg} width={20} height={20} />;
  } else if (action.includes('liked')) {
    return <SvgXml xml={heart_svg} width={20} height={20} />;
  } else if (action.includes('voted')) {
    return <SvgXml xml={vote_svg} width={20} height={20} />;
  }
  return null;
};

const getRightIcon = action => {
  if (!action || typeof action !== 'string') return null;

  if (action.includes('post')) {
    return <SvgXml xml={postIcon_svg} width={12} height={12} />;
  } else if (action.includes('video')) {
    return <SvgXml xml={play_svg} width={12} height={12} />;
  } else if (action.includes('story')) {
    return <SvgXml xml={storyIcon_svg} width={12} height={12} />;
  } else if (action.includes('poll')) {
    return <SvgXml xml={pollIcon_svg} width={12} height={12} />;
  }

  return null;
};

const NotificationItem = ({user = '', action = '', time = ''}) => (
  <View style={styles.notificationItem}>
    <View style={styles.iconContainer}>{getIcon(action)}</View>
    <View style={styles.notificationTextContainer}>
      <View style={styles.notificationText}>
        <Text style={styles.username}>{user}</Text>
        <Text> {action}</Text>
      </View>

      <Text style={styles.time}>{time}</Text>
    </View>
    <View style={styles.iconContainer2}>
      <View style={styles.imageContainer}>
        <Image source={require('../images/post1.png')} style={styles.image} />
      </View>
      <View style={styles.iconWrapper}>{getRightIcon(action)}</View>
    </View>
  </View>
);

const NotificationsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <View style={styles.mainContainer}>
          <FlatList
            data={notifications}
            renderItem={({item}) => (
              <NotificationItem
                user={item.user}
                action={item.action}
                time={item.time}
              />
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View>
                <View style={styles.statsContainer}>
                  <View style={styles.statBox}>
                    <SvgXml xml={post_sign_svg} width={12} height={12} />
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statNumber}>24</Text>
                      <Text style={styles.statLabel}>Posts</Text>
                    </View>
                  </View>
                  <View style={styles.statBox}>
                    <SvgXml xml={heart_svg} width={12} height={12} />
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statNumber}>2721</Text>
                      <Text style={styles.statLabel}>Likes</Text>
                    </View>
                  </View>
                  <View style={styles.statBox}>
                    <SvgXml xml={reply_svg} width={12} height={12} />
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statNumber}>89</Text>
                      <Text style={styles.statLabel}>Replies</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    padding: 18,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 700}}>Activity</Text>
                  <Text
                    style={{fontSize: 14, fontWeight: 700, color: '#FC4D2F'}}>
                    ✔✔ Mark all Read
                  </Text>
                </View>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#EDEAE3',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  background: {
    flex: 1,
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statBox: {
    alignItems: 'center',
    borderRightColor: '#FFFEF4',
    borderRightWidth: 1,
    paddingHorizontal: 30,
  },

  statTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  statNumber: {
    color: 'blue',
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  statLabel: {
    color: '#000',
    fontSize: 12,
    fontWeight: 700,
  },
  notificationItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFEF4',
    paddingHorizontal: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },
  notificationText: {
    color: '#000',
    fontSize: 14,
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    color: '#888',
    fontSize: 8,
    marginTop: 2,
  },

  iconContainer2: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 30,
    height: 30,
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  iconWrapper: {
    position: 'absolute',
    top: '60%',
    left: '70%',
    transform: [{translateX: -12}, {translateY: -12}],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationsScreen;
