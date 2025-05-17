import React from "react";
import { StyleSheet, View, Text } from 'react-native';

export default function EntryTracker() {
  return (
    <View style={styles.container}>
      <Text>Entries This Year </Text>
      <Text>Streak </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 7,
  }
});