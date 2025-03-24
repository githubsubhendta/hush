import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";

const PlusScreen = ({ visible, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={() => alert("Option 1 Clicked")}>
            <Text style={styles.modalText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => alert("Option 2 Clicked")}>
            <Text style={styles.modalText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => alert("Option 3 Clicked")}>
            <Text style={styles.modalText}>Option 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => alert("Option 4 Clicked")}>
            <Text style={styles.modalText}>Option 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalButton: {
    padding: 10,
    width: "100%",
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 5,
  },
  modalText: { fontSize: 16, textAlign: "center" },
  closeButton: { marginTop: 10, padding: 10 },
  closeText: { color: "red", fontSize: 16 },
});

export default PlusScreen;
