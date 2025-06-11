// import React from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {send_svg} from '../utils/constant/TabSVGimage';
// import { useTheme } from '../context/ThemeContext';

// const {width, height} = Dimensions.get('window');
// const scale = size => (width / 375) * size;
// const scaleHeight = size => (height / 667) * size;

// const CommentInput = ({comment, onChangeComment, onSend}) => {
// const {isDarkModeOn} = useTheme();
//   const inputStyle = {
//     backgroundColor: isDarkModeOn ? '#191919' : '#fff',
//     color: isDarkModeOn ? '#fff' : '#000',
//   };

//   return (
//     <View style={[styles.inputcontainer,{backgroundColor:inputStyle.backgroundColor}]}>
//       <TextInput
//         value={comment}
//         onChangeText={onChangeComment}
//         placeholder="Add your comment"
//         placeholderTextColor="#444"
//         style={[styles.input,{backgroundColor:inputStyle.backgroundColor}, {color: inputStyle.color}]}
//         multiline
//       />
//       <TouchableOpacity style={styles.sendButton} onPress={onSend}>
//         <SvgXml xml={send_svg} width={scale(40)} height={scale(40)} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputcontainer: {
//     position: 'absolute',
//     bottom: scaleHeight(61.5),
//     width: '100%',
//     maxWidth: '100%',
//     borderRadius: 16,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     zIndex: 999,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 2,
//     justifyContent: 'center',
//     shadowColor: 'rgba(0,0,0,0.08)',
//     shadowOffset: {width: 0, height: 0},
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 14,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingRight: 10,
//   },
//   sendButton: {
//     // borderRadius: 20,
//     // width: 36,
//     // height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CommentInput;


import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {send_svg, send_svg_dark} from '../utils/constant/TabSVGimage';
import {useTheme} from '../context/ThemeContext';

const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;
const scaleHeight = size => (height / 667) * size;

const CommentInput = ({comment, onChangeComment, onSend}) => {
  const {isDarkModeOn} = useTheme();

  const inputStyle = {
    backgroundColor: isDarkModeOn ? '#191919' : '#fff',
    color: isDarkModeOn ? '#fff' : '#000',
    placeholderTextColor: isDarkModeOn ? '#fff' : '#000',
  };

  return (
    <View style={[styles.inputcontainer, {backgroundColor: inputStyle.backgroundColor}]}>
      <TextInput
        value={comment}
        onChangeText={onChangeComment}
        placeholder="Add your comment"
        placeholderTextColor={inputStyle.placeholderTextColor}
        style={[
          styles.input,
            { color: inputStyle.color},
        ]}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <SvgXml xml={isDarkModeOn ? send_svg_dark : send_svg} width={scale(40)} height={scale(40)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputcontainer: {
    position: 'absolute',
    bottom: scaleHeight(61.5),
    width: '100%',
    maxWidth: '100%',
    borderRadius: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 14,
    // backgroundColor: '#f5f5f5', // Optional: container bg (neutral)
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12, 
    
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default CommentInput;
