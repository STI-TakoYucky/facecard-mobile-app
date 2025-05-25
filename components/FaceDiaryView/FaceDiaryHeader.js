import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function FaceDiaryHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FaceDiary</Text>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 30,
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    color: '#162041'
  }
});