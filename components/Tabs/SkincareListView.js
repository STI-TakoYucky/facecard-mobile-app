import { View, Text, ScrollView } from 'react-native'
import React, { props } from 'react'

import SearchBar from '../SkincareListView/SearchBar';
import ProductCard from '../SkincareListView/ProductCard';

export default function SkincareListView() {
  return (
    <ScrollView className="p-5">
        <SearchBar></SearchBar>
        <ProductCard></ProductCard>
    </ScrollView>
  )
}