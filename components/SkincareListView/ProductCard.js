import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';

import ProductModal from "./ProductModal";

export default function ProductCard(props) {

  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let product = [];
  for (let i = 0; i < 10; i++) {
    product.push({
        id: i,
        name: props.name,
        size: props.size,
        brand: props.brand,
        image: require('../../assets/celeteque_sunscreen.png') 
      }); 
  }

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    isModalVisible(true);
  };

  return (
    <View>
    <ScrollView>
      {product.map((item) => (

        <View key={item.id} style={styles.productCard} >
          <Image 
            style={styles.image} 
            source={item.image}/>
          <View contentContainerStyle={styles.contentContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.brand}</Text>
            <Text style={styles.productSize}>{item.size}</Text>
            <Text style={styles.link} onPress={() => handleOpenModal(item)}>More Details</Text>
          </View>
        </View>
      ))} 
    </ScrollView>

      <ProductModal
        visible={modalVisible}
        onClose={() => isModalVisible(false)}
        product={selectedProduct}
        name={props.name}
        category={props.category}
        color={props.color}
        brand={props.brand}
        size={props.size}
        skinType={props.skinType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productCard:{
    backgroundColor: '#eee',
    flexDirection:'row',
    marginVertical: 11,
    alignItems: 'center',
    borderRadius: 10,

    // for IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // for Android
    elevation: 5,
  },
  image:{
    flex: 0.4,
    width: 100,
    height: 100,
  },
  contentContainer:{
    paddingHorizontal: 4,
    fontSize: 13
  },
  productName:{
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  link:{
    color: 'gre',
    textDecorationLine: 'underline',
  }
});