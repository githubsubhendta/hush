import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, StatusBar } from 'react-native';

const Loader = ({ visible }) => {
  return (
    <Modal transparent animationType="fade" visible={visible} statusBarTranslucent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
});

export default Loader;
