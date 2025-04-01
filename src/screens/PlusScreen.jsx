// import React, {useEffect, useRef} from 'react';
// import {
//   Modal,
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Animated,
//   StatusBar,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {video_tab_svg} from '../utils/constant/TabSVGimage';

// const options = [
//   {label: 'Video', onPress: () => alert('Video Clicked')},
//   {label: 'Story', onPress: () => alert('Story Clicked')},
//   {label: 'Post', onPress: () => alert('Post Clicked')},
//   {label: 'Poll', onPress: () => alert('Poll Clicked')},
// ];

// const PlusScreen = ({visible, onClose}) => {
//   // Create an array of Animated.Value for each option
//   const animations = useRef(options.map(() => new Animated.Value(0))).current;

//   useEffect(() => {
//     if (visible) {
//       // Animate options one by one with a stagger effect
//       Animated.stagger(
//         200,
//         animations.map(anim =>
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//         ),
//       ).start();
//     } else {
//       // Reset animations when the modal is closed
//       animations.forEach(anim => anim.setValue(0));
//     }
//   }, [visible, animations]);

//   return (
//     <Modal transparent visible={visible} animationType="fade">
//       <StatusBar
//         translucent
//         backgroundColor="rgba(0,0,0,0.6)"
//         barStyle="light-content"
//       />
//       <View style={styles.overlay}>
//         <TouchableOpacity style={styles.background} onPress={onClose} />

//         <View style={styles.popupContainer}>
//           {options.map((option, index) => (
//             <Animated.View key={index} style={{opacity: animations[index]}}>
//               <TouchableOpacity style={styles.option} onPress={option.onPress}>
//                 <SvgXml xml={video_tab_svg} width={24} height={24} />
//                 <Text style={styles.optionText}>{option.label}</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   background: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   popupContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 90,
//     backgroundColor: 'transparent',
//   },
//   option: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 50,
//     marginHorizontal: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   optionText: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default PlusScreen;

import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  poll_svg,
  post_svg,
  story_svg,
  video_svg_tab,
} from '../utils/constant/TabSVGimage';

const options = [
  {label: 'Post', onPress: () => alert('Post Clicked')},
  {label: 'Video', onPress: () => alert('Video Clicked')},
  {label: 'Story', onPress: () => alert('Story Clicked')},
  {label: 'Poll', onPress: () => alert('Poll Clicked')},
];

const PlusScreen = ({visible, onClose}) => {
  const animations = useRef(options.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      Animated.stagger(
        100,
        animations.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else {
      animations.forEach(anim => anim.setValue(0));
    }
  }, [visible, animations]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.6)"
        barStyle="light-content"
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />

        <View style={styles.popupContainer}>
          <View style={styles.row1}>
            <Animated.View style={{opacity: animations[1]}}>
              <TouchableOpacity
                style={styles.option}
                onPress={options[1].onPress}>
                <Text style={styles.optionText}>{options[1].label}</Text>
                <SvgXml xml={video_svg_tab} width={27.3} height={30} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: animations[2]}}>
              <TouchableOpacity
                style={styles.option}
                onPress={options[2].onPress}>
                <SvgXml xml={story_svg} width={27.3} height={30} />
                <Text style={styles.optionText}>{options[2].label}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Bottom Row: Post, Poll */}
          <View style={styles.row}>
            <Animated.View style={{opacity: animations[0]}}>
              <TouchableOpacity
                style={styles.option}
                onPress={options[0].onPress}>
                <Text style={styles.optionText}>{options[0].label}</Text>
                <SvgXml xml={post_svg} width={27.3} height={30} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: animations[3]}}>
              <TouchableOpacity
                style={styles.option}
                onPress={options[3].onPress}>
                <SvgXml xml={poll_svg} width={27.3} height={30} />
                <Text style={styles.optionText}>{options[3].label}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 90,
    width: '80%',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    width: '100%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 120,
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    gap: 10.5,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  optionText: {
    fontSize: 14,
    fontWeight: 700,
  },
});

export default PlusScreen;
