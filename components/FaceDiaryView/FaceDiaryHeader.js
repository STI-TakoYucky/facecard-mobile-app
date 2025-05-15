import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import SearchBar from '../SkincareListView/SearchBar';

export default function FaceDiaryHeader() {
  return (
    <SearchBar></SearchBar>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#eee'
  }
});