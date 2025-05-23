import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator  } from 'react-native';

import ProductModal from "./ProductModal";
import AntDesign from '@expo/vector-icons/AntDesign';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebase';

export default function ProductCard(props) {
  const [products, setProducts] = useState([]);
  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  
  const handleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = [];

      querySnapshot.forEach((doc) => {
        fetchedProducts.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    isModalVisible(true);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView>
        {products.map((item) => (
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
              <Text style={styles.name}>{item.productName}</Text>
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
        name={selectedProduct?.productName}
        category={selectedProduct?.category}
        color={props.color}
        brand={selectedProduct?.brand}
        size={selectedProduct?.size}
        skinType={selectedProduct?.skinType}
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
