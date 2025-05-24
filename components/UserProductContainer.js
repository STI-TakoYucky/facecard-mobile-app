import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserProductsCard from './UserProductsCard'
import { fonts } from '../utils/fonts'

export default function UserProductContainer() {
  return (
    <View className="mt-16 mb-14">
        <Text className="text-dark-800 text-3xl pb-3" style={[fonts.HeaderFont]}>Your Skincare Products</Text>
        <ScrollView horizontal={true} className="py-5" showsHorizontalScrollIndicator={false}>  
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        </ScrollView>
    </View>
  )
}