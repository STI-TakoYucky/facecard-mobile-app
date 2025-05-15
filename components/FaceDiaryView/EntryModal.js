import React, { props } from "react";
import { Modal, View, Text, StyleSheet } from 'react-native';

export default function EntryModal(props) {
  return (
    <Modal
    visible={props.visible}
    animationType="slide"
    onRequestClose={props.onClose}
    >
      <View style={styles.container}>
        <Text onPress={props.onClose}>
          Hello
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});