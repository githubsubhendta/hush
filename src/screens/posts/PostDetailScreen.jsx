import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import StoryHeader from '../../components/StoryHeader';
import Svg, {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  block_user_svg,
  chat_icon_black,
  chat_icon_white,
  Flag_SVG,
  heart_svg_black,
  heart_svg_white,
  Left_Arrow_SVG,
  menu_svg_dark,
  Right_Arrow_SVG,
  share_svg,
  share_svg_dark,
  Star_svg,
} from '../../utils/constant/TabSVGimage';
import CustomActionModal from '../../components/CustomActionModal';
import CommentInput from '../../components/CommentInpuBox';

const {width, height} = Dimensions.get('window');

const scale = size => (width / 375) * size;
const scaleHeight = size => (height / 667) * size;

const PostDetailScreen = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comment, setComment] = React.useState('');

  const handleSend = () => {
    if (comment.trim()) {
      console.log('Sending:', comment);
      setComment('');
    }
  };

  const {
    post: initialPost,
    nsfw: initialNsfw,
    posts = [],
    currentIndex = 0,
  } = route.params;

  const [currentPost, setCurrentPost] = useState(initialPost || {});
  const [currentNsfw, setCurrentNsfw] = useState(initialNsfw || false);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex);

  const {isDarkModeOn} = useTheme();

  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';
  const borderColor = isDarkModeOn ? '#212121' : '#EEE8D5';
  const buttonBackgroundColor = isDarkModeOn ? '#FFFFFF' : '#EEE8D5E5';
  const shareBGColor = isDarkModeOn ? '#FFFFFF' : '#392EBD';
  const ModalBackgroundColor = isDarkModeOn ? '#191919' : '#fff';
  const ModalTextColor = isDarkModeOn ? '#fff' : '#000';

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
  const handleNextPost = () => {
    if (posts.length === 0) return;
    const nextIndex = (currentIndexState + 1) % posts.length;
    const nextPost = posts[nextIndex];

    setCurrentIndexState(nextIndex);
    setCurrentPost({
      ...nextPost,
      title: nextPost.text,
      likes: nextPost.heartsCount,
      comments: nextPost.repliesCount,
      time: getRelativeTime(nextPost.createdAt),
    });
    setCurrentNsfw(nextPost.nsfw);
  };

  const handlePreviousPost = () => {
    if (posts.length === 0) return;
    const prevIndex = (currentIndexState - 1 + posts.length) % posts.length;
    const prevPost = posts[prevIndex];

    setCurrentIndexState(prevIndex);
    setCurrentPost({
      ...prevPost,
      title: prevPost.text,
      likes: prevPost.heartsCount,
      comments: prevPost.repliesCount,
      time: getRelativeTime(prevPost.createdAt),
    });
    setCurrentNsfw(prevPost.nsfw);
  };

  console.log('Current Post:', currentPost);
  console.log('Current Title:', currentPost?.comments);

  if (!currentPost) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: textColor, textAlign: 'center', marginTop: 40}}>
          Post not available
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={scale(60)}>
          <View style={styles.header}>
            <StoryHeader />
          </View>
          <ScrollView
            style={[styles.mainContainer, {backgroundColor}]}
            contentContainerStyle={{paddingBottom: scale(100)}}
            showsVerticalScrollIndicator={false}>
            {/* <View style={[styles.mainContainer, {backgroundColor}]}> */}
            {/* USER ROW */}
            <View style={styles.userRow}>
              <View style={styles.leftSide}>
                <View style={styles.avatar}>
                  <SvgXml
                    xml={avatar_svg}
                    width={scale(32)}
                    height={scale(32)}
                  />
                </View>
                <Text style={[styles.username, {color: textColor}]}>
                  {currentPost?.username || 'User'}
                </Text>
                <Text style={{color: textColor, marginLeft: scale(6)}}>
                  ⭐ 60
                </Text>
              </View>
              <View style={styles.rightSide}>
                <Text style={[styles.time, {color: textColor}]}>
                  {currentPost.time}
                </Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                  <SvgXml
                    xml={menu_svg_dark}
                    width={scale(18)}
                    height={scale(10)}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* CARD */}
            <View style={[styles.card, {backgroundColor, borderColor}]}>
              <ImageBackground
                source={
                  currentPost.mediaUrl
                    ? {uri: currentPost.mediaUrl}
                    : require('../../images/post1.png')
                }
                style={styles.headerImage}
                resizeMode="cover"
                imageStyle={{borderRadius: scale(16)}}>
                <View style={styles.headerOverlay}>
                  {currentNsfw && (
                    <View style={styles.nsfwBadge}>
                      <Text style={styles.nsfwText}>NSFW</Text>
                    </View>
                  )}
                  <Text style={styles.title}>{currentPost.title}</Text>
                </View>
              </ImageBackground>

              {/* Arrow Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={currentIndexState === 0}
                  style={[
                    styles.arrowButton,
                    styles.leftButton,
                    {
                      backgroundColor:
                        currentIndexState === 0
                          ? '#ccc'
                          : buttonBackgroundColor,
                    },
                  ]}
                  onPress={handlePreviousPost}>
                  <SvgXml
                    xml={Left_Arrow_SVG}
                    width={scale(9)}
                    height={scale(16)}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={currentIndexState === posts.length - 1}
                  style={[
                    styles.arrowButton,
                    styles.rightButton,
                    {
                      backgroundColor:
                        currentIndexState === posts.length - 1
                          ? '#ccc'
                          : buttonBackgroundColor,
                    },
                  ]}
                  onPress={handleNextPost}>
                  <SvgXml
                    xml={Right_Arrow_SVG}
                    width={scale(9)}
                    height={scale(16)}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <View style={styles.leftSide}>
                <SvgXml
                  xml={isDarkModeOn ? heart_svg_white : heart_svg_black}
                />
                <Text
                  style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                  {currentPost.likes}
                </Text>
                <SvgXml
                  xml={isDarkModeOn ? chat_icon_white : chat_icon_black}
                />
                <Text
                  style={{color: textColor, paddingRight: 8, paddingLeft: 3}}>
                  {currentPost?.comments}
                </Text>
              </View>
              <View style={styles.rightSide}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: shareBGColor,
                    borderRadius: 12,
                  }}>
                  <SvgXml
                    xml={isDarkModeOn ? share_svg : share_svg_dark}
                    width={16}
                    height={14}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: shareBGColor,
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SvgXml
                    xml={isDarkModeOn ? chat_icon_black : chat_icon_white}
                    width={14}
                    height={14}
                  />
                  <Text
                    style={{
                      paddingLeft: 5,
                      fontSize: 14,
                      textAlign: 'center',
                      color: isDarkModeOn ? '#000' : '#fff',
                    }}>
                    Chat
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.scrollArea}>
              <Text style={{fontSize: scale(14), fontWeight: '700'}}>
                REPLIES
              </Text>
              <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Text style={[styles.content, {color: textColor}]}>
                  {currentPost.description
                    ? currentPost.replies
                    : 'No Replies yet!'}
                </Text>
              </ScrollView>
            </View>
            {/* </View> */}
            
          </ScrollView>
          <View style={styles.commentInputWrapper}>
              <CommentInput
                comment={comment}
                onChangeComment={setComment}
                onSend={handleSend}
              />
            </View>
        </KeyboardAvoidingView>

        {/* Modal */}
        <CustomActionModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          ModalBackgroundColor={ModalBackgroundColor}
          ModalTextColor={ModalTextColor}
          isDarkModeOn={isDarkModeOn}
          share_svg={share_svg}
          share_svg_dark={share_svg_dark}
          Flag_SVG={Flag_SVG}
          block_user_svg={block_user_svg}
          styles={styles}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    height: scaleHeight(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleHeight(20),
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: scale(20),
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: scaleHeight(10),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingRight: scale(8),
  },
  scrollArea: {
    maxHeight: scaleHeight(300),
  },
  contentContainer: {
    padding: scale(16),
  },
  content: {
    textAlign: 'center',
    fontSize: scale(14),
    marginBottom: scale(10),
    lineHeight: scale(24),
  },
  avatar: {
    marginRight: scale(8),
  },
  username: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  time: {
    fontSize: scale(12),
    fontWeight: '400',
  },
  
  card: {
    borderRadius: scale(16),
    marginVertical: width * 0.04,
    position: 'relative',

  },
  headerImage: {
    height: height * 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: scale(16),
    width: '100%',
  },
  title: {
    fontSize: scale(20),
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    padding: scale(8),
  },
  nsfwBadge: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    backgroundColor: '#FF4C4C',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(6),
    zIndex: 1,
  },
  nsfwText: {
    color: '#fff',
    fontSize: scale(10),
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(-20),
  },
  arrowButton: {
    width: scale(25),
    height: scaleHeight(45),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: scale(2)},
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: scale(4),
  },
  leftButton: {
    marginLeft: scale(-12),
  },
  rightButton: {
    marginRight: scale(-12),
  },
  commentInputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    // paddingHorizontal: scale(12),
    // paddingBottom: scale(10),
    paddingTop: scale(6),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalOverlay: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 5,
  },
  modalOptionDanger: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 12,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 8,
  },
  dragHandleDark: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: -10,
    marginBottom: 16,
  },
});

export default PostDetailScreen;
