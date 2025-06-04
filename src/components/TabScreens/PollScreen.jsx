

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_white,
  heart_svg2,
  menu_svg_white,
  share_svg,
  share_svg_dark,
  Flag_SVG,
  Poll_Count_Svg,
  vote_svg,
  vote_svg_dark,
} from '../../utils/constant/TabSVGimage';
import CustomActionModal from '../CustomActionModal';
import {navigate} from '../../utils/NavigationUtil';
import {PollGetApi} from '../../services/api';

import placeholderImage from '../../images/post1.png';

const isTablet = () => {
  const {width, height} = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio < 1.6;
};

const PollScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {isDarkModeOn} = useTheme();
  const {width, height} = useWindowDimensions();

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      const getRelativeTime = dateString => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const units = [
          {label: 'y', seconds: 31536000},
          {label: 'm', seconds: 2592000},
          {label: 'd', seconds: 86400},
          {label: 'h', seconds: 3600},
          {label: 'min', seconds: 60},
          {label: 'second', seconds: 1},
        ];

        for (const unit of units) {
          const interval = Math.floor(diffInSeconds / unit.seconds);
          if (interval >= 1) {
            return `${interval}${unit.label} ago`;
          }
        }
        return 'just now';
      };
      try {
        const response = await PollGetApi.getPolls();
        const pollsData = Array.isArray(response) ? response : response?.data;
        const formattedPolls = (pollsData || []).map(poll => ({
          id: poll.id,
          username: 'Anonymous',
          time: getRelativeTime(poll.createdAt),
          nsfw: poll.isNsfw || false,
          title: poll.text || '',
          image: poll.mediaUrl ? {uri: poll.mediaUrl} : placeholderImage,
          likes: poll.heartsCount || 0,
          comments: poll.repliesCount || 0,
          nsfw: poll.isNsfw || false,
        }));

        setPolls(formattedPolls);
        console.log('Fetched Polls:', formattedPolls);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  const colors = {
    background: isDarkModeOn ? '#121212' : '#FFFFFF',
    text: isDarkModeOn ? '#FFFFFF' : '#000000',
    modalBackground: isDarkModeOn ? '#1E1E1E' : '#FFFFFF',
    modalText: isDarkModeOn ? '#FFFFFF' : '#000000',
    // shadow: isDarkModeOn ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  };

  // Responsive sizing based on device type
  const cardWidth = isTablet() ? width * 0.9 : width * 0.94;
  const cardHeight = isTablet()
    ? Math.min(width * 0.7, height * 0.3)
    : Math.min(width * 1.1, height * 0.35);

  const renderPost = useCallback(
    ({item, index}) => (
      <View style={styles.postContainer}>
        <Pressable
          onPress={() => {
            navigate('PollResultScreen', {
              post: item,
              nsfw: item.nsfw,
              polls: polls,
              currentIndex: index,
            });
          }}
        >
          <ImageBackground
            source={item.image}
            style={[styles.imageCard, {width: cardWidth, height: cardHeight}]}
            imageStyle={styles.imageStyle}
            defaultSource={placeholderImage}>
            <View style={styles.topRow}>
              {item.nsfw && (
                <View style={styles.nsfwTag}>
                  <Text style={styles.nsfwText}>NSFW</Text>
                </View>
              )}
              <View style={styles.spacer} />
              <TouchableOpacity
                style={[styles.menuIcon, {paddingRight: width * 0.02}]}
                onPress={() => setIsModalVisible(true)}>
                <SvgXml
                  xml={menu_svg_white}
                  width={isTablet() ? 20 : 16}
                  height={isTablet() ? 6 : 4}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.centeredTitleContainer}>
              <Text
                style={[styles.title, isTablet() && styles.titleTablet]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.bottomShadow}
              // start={{x: 0.5, y: 0}}
              // end={{x: 0.5, y: 1}}
            >
              <View style={styles.overlay}>
                <View style={styles.reactions}>
                  <View style={styles.userRow}>
                    <View
                      style={[
                        styles.avatar,
                        isTablet() && styles.avatarTablet,
                      ]}>
                      <SvgXml
                        xml={avatar_svg}
                        width={isTablet() ? width * 0.06 : width * 0.08}
                        height={isTablet() ? height * 0.05 : height * 0.038}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.username,
                          isTablet() && styles.usernameTablet,
                        ]}>
                        {item.username}
                      </Text>
                      <Text
                        style={[styles.time, isTablet() && styles.timeTablet]}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.reactionIcons}>
                    <SvgXml
                      xml={heart_svg2}
                      width={isTablet() ? width * 0.05 : width * 0.04}
                      height={isTablet() ? height * 0.03 : height * 0.024}
                    />
                    <Text
                      style={[
                        styles.reactionText,
                        isTablet() && styles.reactionTextTablet,
                      ]}>
                      {item.likes}
                    </Text>
                    <SvgXml
                      xml={chat_icon_white}
                      width={isTablet() ? width * 0.05 : width * 0.04}
                      height={isTablet() ? height * 0.03 : height * 0.024}
                      style={styles.iconSpacing}
                    />
                    <Text
                      style={[
                        styles.reactionText,
                        isTablet() && styles.reactionTextTablet,
                      ]}>
                      {item.comments}
                    </Text>
                    <SvgXml
                      xml={Poll_Count_Svg}
                      width={isTablet() ? width * 0.05 : width * 0.04}
                      height={isTablet() ? height * 0.03 : height * 0.024}
                      style={styles.iconSpacing}
                    />
                    <Text
                      style={[
                        styles.reactionText,
                        isTablet() && styles.reactionTextTablet,
                      ]}>
                      {item.comments}
                    </Text>
                    <View
                      style={[
                        styles.voteButton,
                        isTablet() && styles.voteButtonTablet,
                      ]}>
                      <SvgXml
                        xml={vote_svg_dark}
                        width={isTablet() ? width * 0.05 : width * 0.03}
                        height={isTablet() ? height * 0.03 : height * 0.02}
                      />
                      <Text
                        style={[
                          styles.reactionTextVote,
                          isTablet() && styles.reactionTextVoteTablet,
                        ]}>
                        Vote
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      </View>
    ),
    [colors, cardWidth, cardHeight, navigation],
  );

  const renderFooter = () => {
  if (!isFetchingMore) return null;
  return (
    <View style={{ paddingVertical: 16 }}>
      <ActivityIndicator size="small" color={isDarkModeOn ? '#FFFFFF' : '#392EBD'} />
    </View>
  );
};

  if (loading) {
    return (
      <View
        style={[styles.loaderContainer, {backgroundColor: colors.background}]}>
        <ActivityIndicator
          size="large"
          color={isDarkModeOn ? '#FFFFFF' : '#392EBD'}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={polls}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={[
          styles.listContent,
          isTablet() && styles.listContentTablet,
        ]}
        
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        scrollEventThrottle={16}
        decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.98}
        bounces={true}
        overScrollMode="never"
      />

      <CustomActionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        ModalBackgroundColor={colors.modalBackground}
        ModalTextColor={colors.modalText}
        isDarkModeOn={isDarkModeOn}
        share_svg={share_svg}
        share_svg_dark={share_svg_dark}
        Flag_SVG={Flag_SVG}
        block_user_svg={block_user_svg}
        styles={styles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: '4%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: '3%',
  },
  listContentTablet: {
    paddingBottom: 32,
    paddingHorizontal: '5%',
  },
  postContainer: {
    marginBottom: Platform.OS === 'android' ? 16 : 24,
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
  },
  imageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  topRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    paddingRight: 10,
  },
  nsfwTag: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  nsfwText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
  menuIcon: {
    paddingTop: 16,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%', 
    paddingBottom: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  overlay: {
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  centeredTitleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    lineHeight: 24,
  },
  titleTablet: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTablet: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  username: {
    fontWeight: '700',
    fontSize: 12,
    color: '#FFFFFF',
  },
  usernameTablet: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    opacity: 0.7,
    color: '#FFFFFF',
  },
  timeTablet: {
    fontSize: 13,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reactionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 12,
  },
  reactionText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '500',
  },
  reactionTextTablet: {
    fontSize: 12,
  },
  reactionTextVote: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  reactionTextVoteTablet: {
    fontSize: 14,
  },
  voteButton: {
    backgroundColor: '#392EBD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 11,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  voteButtonTablet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 16,
    gap: 6,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalOverlay: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  modalOptionDanger: {
    fontSize: 16,
    color: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  dragHandleDark: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: 2.5,
    marginBottom: 16,
    backgroundColor: '#666666',
  },
});

export default PollScreen;
