import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function FaceDiaryView() {
  return (
    <ScrollView className="p-5">
        <View style={styles.header}>
          <Text>Face Journal</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#eee'
  }
});