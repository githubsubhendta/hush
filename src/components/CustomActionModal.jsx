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



export default CustomActionModal;
