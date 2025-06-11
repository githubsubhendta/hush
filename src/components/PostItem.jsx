import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  chat_icon_black,
  chat_icon_white,
  heart_svg_black,
  heart_svg_white,
} from '../utils/constant/TabSVGimage';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useTheme} from '../context/ThemeContext';

dayjs.extend(relativeTime);

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

export default function PostItems({image, text, likes, comment, time, tag,onPress}) {
  const [error, setError] = useState(false);

  const {isDarkModeOn} = useTheme();
  const textColor = isDarkModeOn ? '#fff' : '#000';
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          <Image
            source={
              error || !image ? require('../images/post1.png') : {uri: image}
            }
            style={styles.image}
            onError={() => setError(true)}
          />
          {/* <Image source={post1} style={styles.image} /> */}
          {tag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tag} Hello</Text>
            </View>
          )}
          <View style={styles.overlay} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
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
            {comment >= 1000
              ? (comment / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
              : comment || 0}
          </Text>
        </View>

        <Text style={styles.timeText}>{formatTime(time)}</Text>
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
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1,
    width: '80%',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
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
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    paddingRight: 10,
    paddingLeft: 3,
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
