import React from "react";
import { StyleSheet, View, Text } from 'react-native';

export default function FaceDiaryHeader() {
  return (
    <View style={styles.header}>
      <Text>Face Journal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#eee'
  }
});