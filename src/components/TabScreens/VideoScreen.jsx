import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {SvgXml} from 'react-native-svg';
import {avatar_svg, chat_icon, ChatIcon, comment_svg, heart_svg, heart_svg2} from '../../utils/constant/TabSVGimage';

const {width, height} = Dimensions.get('window');
const videoHeight = (width * 19) / 16;

const videoUrl = 'https://your-video-url.mp4'; // Replace with your actual video URL

const VideoScreen = () => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lastTap, setLastTap] = useState(null);

  // Handle single tap for play/pause and double tap for like
  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      setLiked(true);
      setTimeout(() => setLiked(false), 1000); // Remove heart effect after 1 sec
    } else {
      setPaused(!paused);
    }
    setLastTap(now);
  };

  return (
    <View style={styles.container}>
      {/* NSFW Tag */}
      <View style={styles.nsfwTag}>
        <Text style={styles.nsfwText}>NSFW</Text>
      </View>

      {/* Video Player */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={handleTap}>
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={styles.video}
          resizeMode="cover"
          paused={paused}
          repeat={true}
          muted={muted}
          onError={e => console.log('Video Error:', e)}
        />
        {/* {liked && (
          <SvgXml
            xml={heart_svg2}
            width={60}
            height={60}
            style={styles.heartEffect}
          />
        )} */}
      </TouchableOpacity>

      {/* Caption */}
      <Text style={styles.caption}>
        The music blasting in the background was totally vibing, creating an
        atmosphere that was just next level...
      </Text>

      <View style={styles.bottomContainer}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <SvgXml xml={avatar_svg} width={30} height={30} />
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.username}>User_1234</Text>
            <Text style={styles.timeAgo}>1h ago</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLiked(!liked)}>
            <SvgXml
              xml={liked ? heart_svg : heart_svg2}
              width={18}
              height={16}
            />
            <Text style={{color:'#fff',paddingLeft:3,fontSize:12,textAlign:'center'}}>45</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
           <SvgXml xml={comment_svg} width={18} height={16}  style={{color:'#fff'}}/>
            <Text style={{color:'#fff',paddingLeft:3,fontSize:12,textAlign:'center'}}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.chatButton}
            onPress={() => setMuted(!muted)}>
            <Text>{muted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: width * 0.03,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    height: height * 0.85,
  },
  nsfwTag: {
    backgroundColor: 'red',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  nsfwText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.03,
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    borderRadius: width * 0.03,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  caption: {
    fontSize: width * 0.04,
    color: '#fff',
    marginTop: height * 0.015,
    paddingHorizontal: width * 0.03,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.015,
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  timeAgo: {
    color: '#aaa',
    marginLeft: width * 0.02,
    fontSize: width * 0.03,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop:5
  },
  actionButton: {
    flexDirection: 'row',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.01,
  },
  chatButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#444',
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.01,
  },

  heartEffect: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{translateX: -30}, {translateY: -30}],
    opacity: 0.8,
  },
});

export default VideoScreen;

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Video from 'react-native-video';
// import React from 'react';
// import {SvgXml} from 'react-native-svg';
// import {
//   avatar_svg,
//   heart_svg,
//   heart_svg2,
// } from '../../utils/constant/TabSVGimage';

// const {width, height} = Dimensions.get('window');
// const videoHeight = (width * 19) / 16;

// const videoUrl =
//   'https://instagram.flko10-2.fna.fbcdn.net/v/t51.293…8F6uhIbHKWjzE9Iwsb2TtA&oe=67F55640&_nc_sid=d885a2'; // Replace with your video URL

// const VideoScreen = () => {
//   return (
//     <View style={styles.container}>
//       {/* NSFW Tag */}
//       <View style={styles.nsfwTag}>
//         <Text style={styles.nsfwText}>NSFW</Text>
//       </View>

//       {/* Video Player */}
//       <View style={styles.videoContainer}>
//         <Video
//           source={{uri: videoUrl}}
//           style={styles.video}
//           resizeMode="contain"
//           controls={true}
//           useNativeControls={false}
//           onError={e => console.log('Video Error:', e)}
//         />
//       </View>

//       {/* Caption */}
//       <Text style={styles.caption}>
//         The music blasting in the background was totally vibing, creating an
//         atmosphere that was just next level...
//       </Text>

//       <View style={styles.bottomContainer}>
//         <View style={styles.userInfo}>
//           <View style={styles.avatar}>
//             <SvgXml xml={avatar_svg} width={30} height={30} />
//           </View>

//           <View style={{flexDirection: 'column'}}>
//             <Text style={styles.username}>User_1234</Text>
//             <Text style={styles.timeAgo}>1h ago</Text>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actions}>
//           <TouchableOpacity style={styles.actionButton}>
//             <SvgXml xml={heart_svg2} width={20} height={20} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionButton}>
//             <Text>💬 10</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.chatButton}>
//             <Text>Chat</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000',
//     padding: width * 0.03,
//     borderTopLeftRadius: width * 0.04,
//     borderTopRightRadius: width * 0.04,
//     height: height * 0.85,
//   },
//   nsfwTag: {
//     backgroundColor: 'red',
//     paddingHorizontal: width * 0.02,
//     paddingVertical: height * 0.005,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   nsfwText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: width * 0.03,
//   },
//   videoContainer: {
//     width: '100%',
//     height: videoHeight,
//     borderRadius: width * 0.03,
//     overflow: 'hidden',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   caption: {
//     fontSize: width * 0.04,
//     color: '#fff',
//     marginTop: height * 0.015,
//     paddingHorizontal: width * 0.03,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: height * 0.015,
//   },
//   avatar: {
//     width: width * 0.1,
//     height: width * 0.1,
//     borderRadius: width * 0.05,
//     borderWidth: 1,
//     borderColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   username: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: width * 0.02,
//     fontSize: width * 0.04,
//   },
//   timeAgo: {
//     color: '#aaa',
//     marginLeft: width * 0.02,
//     fontSize: width * 0.03,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   actionButton: {
//     paddingVertical: height * 0.01,
//     paddingHorizontal: width * 0.04,
//     backgroundColor: '#222',
//     borderRadius: width * 0.02,
//     marginHorizontal: width * 0.01,
//   },
//   chatButton: {
//     paddingVertical: height * 0.01,
//     paddingHorizontal: width * 0.04,
//     backgroundColor: '#444',
//     borderRadius: width * 0.02,
//     marginHorizontal: width * 0.01,
//   },
// });

// export default VideoScreen;
