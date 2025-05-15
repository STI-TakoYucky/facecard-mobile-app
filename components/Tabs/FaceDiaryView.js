import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react';
import FaceDiaryHeader from '../FaceDiaryView/FaceDiaryHeader';
import EntryContainer from '../FaceDiaryView/EntryContainer';

export default function FaceDiaryView() {
  return (
    <ScrollView className="p-5">
      <FaceDiaryHeader></FaceDiaryHeader>
      <EntryContainer></EntryContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#eee'
  }
});