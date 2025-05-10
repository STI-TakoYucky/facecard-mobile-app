import { View, Text, ScrollView } from 'react-native'
import React, { props } from 'react'

import SearchBar from '../SkincareListView/SearchBar';
import ProductCard from '../SkincareListView/ProductCard';

export default function SkincareListView() {
  return (
    <ScrollView className="p-5">
        <SearchBar></SearchBar>
        <ProductCard
          name="Face and Body Daily Protection Cream"
          size="100ml"
          brand="Celeteque Dermoscience"
          category="Sunscreen"
          color="#FDD835"
          skinType="All skin type"
        ></ProductCard>
    </ScrollView>
  )
}