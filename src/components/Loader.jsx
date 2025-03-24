import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dim background while loading
  },
});

export default Loader;
