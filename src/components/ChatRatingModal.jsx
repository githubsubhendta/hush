import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ChatRatingModal = ({ visible, onClose, upVotes, downVotes, totalChats }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Chat Rating</Text>
          <Text style={styles.message}>
            You have {upVotes} up votes and {downVotes} down votes out of {totalChats} total chats
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
  },
  modalContainer: {
    width: width * 0.85, 
    maxWidth: 400, 
    backgroundColor: '#F8F3EB',
    borderRadius: 12,
    paddingVertical: height * 0.03, 
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    padding:20
  },
  title: {
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#000',
  },
  message: {
    fontSize: width * 0.04,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  button: {
    backgroundColor: '#4B30C3',
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.2, 
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});

export default ChatRatingModal;
