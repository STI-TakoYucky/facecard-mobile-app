import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import EntryModal from "./EntryModal";

export default function CreateEntry({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Feather 
        name="plus" 
        size={25} 
        color="#162041" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 10,
  },
});