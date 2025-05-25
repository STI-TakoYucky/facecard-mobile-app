import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { fonts } from "../../utils/fonts";

export default function FaceDiaryHeader() {
  return (
    <View style={styles.container}>
      <Text className="text-dark-800" style={[styles.title, fonts.HeaderFont]}>FaceDiary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
  },
});
