// CustomActionModal.js
import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width} = Dimensions.get('window');

const CustomActionModal = ({
  visible,
  onClose,
  ModalBackgroundColor,
  ModalTextColor,
  isDarkModeOn,
  share_svg,
  share_svg_dark,
  Flag_SVG,
  block_user_svg,
  styles,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackdrop}
        onPressOut={onClose}>
        <View
          style={[
            styles.modalOverlay,
            {backgroundColor: ModalBackgroundColor},
          ]}>
          <View
            style={[styles.dragHandleDark, {backgroundColor: ModalTextColor}]}
          />
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.buttons} onPress={onClose}>
              <SvgXml
                xml={isDarkModeOn ? share_svg_dark : share_svg}
                width={width * 0.05}
                height={width * 0.05}
              />
              <Text style={[styles.modalOption, {color: ModalTextColor}]}>
                Share Post
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={onClose}>
              <SvgXml
                xml={Flag_SVG}
                width={width * 0.05}
                height={width * 0.05}
              />
              <Text style={styles.modalOptionDanger}>Flag Post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={onClose}>
              <SvgXml
                xml={block_user_svg}
                width={width * 0.05}
                height={width * 0.05}
              />
              <Text style={styles.modalOptionDanger}>Block User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalOverlay: {
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingVertical: 30,
//     paddingHorizontal: 15,
//   },
//   modalContent: {
//     paddingVertical: 10,
//   },
//   modalOption: {
//     fontSize: 16,
//     paddingVertical: 5,
//   },
//   modalOptionDanger: {
//     fontSize: 16,
//     color: 'red',
//     paddingVertical: 12,
//   },
//   buttons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     gap: 8,
//   },
// });

export default CustomActionModal;
