import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserProductsCard from './UserProductsCard'

export default function UserProductContainer() {
  return (
    <View className="mt-16 mb-14">
        <Text className="text-dark-900 font-bold text-3xl pb-3">Your Skincare Products</Text>
        <ScrollView horizontal={true} className="py-5" showsHorizontalScrollIndicator={false}>  
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        <UserProductsCard></UserProductsCard>
        </ScrollView>
    </View>
  )
}