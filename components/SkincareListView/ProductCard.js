import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

import ProductModal from "./ProductModal";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProductCard(props) {
  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});
  
  const handleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


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
    <View style={{ marginTop: 10 }}>
      <ScrollView>
        {product.map((item) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity 
              style={styles.heartIcon} 
              onPress={() => handleFavorite(item.id)}
            >
              <AntDesign 
                name={favorites[item.id] ? "heart" : "hearto"} 
                size={15} 
                color={favorites[item.id] ? "red" : "gray"} 
              />
            </TouchableOpacity>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.size}>{item.size}</Text>
              <TouchableOpacity onPress={() => handleOpenModal(item)}>
                <Text style={styles.link}>More Details</Text>
              </TouchableOpacity>
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
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    alignItems: 'center',

    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  size: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  link: {
    color: '#007AFF',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  heartIcon: {
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 1,
  },

});
