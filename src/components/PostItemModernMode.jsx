import React, {memo, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SvgXml} from 'react-native-svg';
import PropTypes from 'prop-types';
import {useTheme} from '../context/ThemeContext';
import {
  avatar_svg,
  chat_icon_black,
  chat_icon_white,
  heart_svg_black,
  heart_svg_white,
  menu_svg_dark,
  share_svg,
  share_svg_dark,
} from '../utils/constant/TabSVGimage';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const {width: screenWidth} = Dimensions.get('window');

const formatTime = time => {
  const now = dayjs();
  const past = dayjs(time);

  const diffSeconds = now.diff(past, 'second');
  const diffMinutes = now.diff(past, 'minute');
  const diffHours = now.diff(past, 'hour');
  const diffDays = now.diff(past, 'day');
  const diffMonths = now.diff(past, 'month');
  const diffYears = now.diff(past, 'year');

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffMonths < 12) return `${diffMonths}m ago`;
  return `${diffYears}yr ago`;
};

const formatLikes = count => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
};

const PostItemModern = ({
  avatar,
  image,
  commentAvatar,
  postText,
  time,
  comment,
  likes,
  username,
  commentCount,
}) => {
  const {isDarkModeOn} = useTheme();
  const [error, setError] = useState(false);
  const textColor = isDarkModeOn ? '#fff' : '#000';

  const renderSvg = (xml, width, height) => {
    try {
      return xml && typeof xml === 'string' ? (
        <SvgXml xml={xml} width={width} height={height} />
      ) : null;
    } catch (err) {
      console.error('SVG error:', err);
      return null;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.postCard}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={avatar} style={{width: '100%', height: '100%'}} />
          ) : (
            renderSvg(avatar_svg, '100%', '100%')
          )}
        </View>

        <Text style={[styles.time, {color: textColor}]}>
          {formatTime(time) || 'Just Now'}
        </Text>

        <TouchableOpacity style={styles.menuButton}>
          <SvgXml xml={menu_svg_dark} width={15} height={10} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            error || !image ? require('../images/post1.png') : {uri: image}
          }
          style={styles.postImage}
          onError={() => setError(true)}
        />
        {postText ? <Text style={styles.postText}>{postText}</Text> : null}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.comment}>
          <SvgXml
            xml={isDarkModeOn ? heart_svg_white : heart_svg_black}
            width={15.4}
            height={14}
          />
          <Text style={[styles.commentText, {color: textColor}]}>
            {formatLikes(likes)}
          </Text>

          <SvgXml
            xml={isDarkModeOn ? chat_icon_white : chat_icon_black}
            width={14.84}
            height={14}
          />
          <Text style={[styles.commentText, {color: textColor}]}>
            {formatLikes(commentCount)}
          </Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <SvgXml
            xml={isDarkModeOn ? share_svg_dark : share_svg}
            width={18}
            height={16}
          />
        </TouchableOpacity>
      </View>

      {/* Comments */}
      <View style={styles.captionContainer}>
        <Image
          source={commentAvatar || require('../images/avatar.png')}
          style={styles.commentAvatar}
        />
        <Text style={styles.captionText}>
          OMG, this place is literally the bomb! Can’t even handle how epic...
        </Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.viewAllComments}>View all comments</Text>
      </View>
    </ScrollView>
  );
};

PostItemModern.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.shape({uri: PropTypes.string}),
    PropTypes.number,
  ]),
  commentAvatar: PropTypes.oneOfType([
    PropTypes.shape({uri: PropTypes.string}),
    PropTypes.number,
  ]),
  postText: PropTypes.string,
  time: PropTypes.string,
  comment: PropTypes.string,
  likes: PropTypes.number,
  commentCount: PropTypes.number,
  username: PropTypes.string,
};

export default memo(PostItemModern);

const styles = StyleSheet.create({
  postCard: {
    // width: '100%',
    marginBottom: 15,
    paddingTop: 15,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    borderRadius: (screenWidth * 0.1) / 2,
    marginRight: 8,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: screenWidth * 0.59,
    resizeMode: 'cover',
  },
  postText: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{translateY: -20}],
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentText: {
    paddingRight: 10,
    paddingLeft: 3,
    fontSize: 12,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  shareButton: {
    marginLeft: 'auto',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionText: {
    paddingLeft: 8,
    fontSize: 10,
    fontWeight: '400',
    color: '#9E9E9E',
  },
  commentsSection: {
    marginTop: 10,
  },
  viewAllComments: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
});
