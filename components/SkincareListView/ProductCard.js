import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import ProductModal from "./ProductModal";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { setSavedProducts } from "../../state/userDataSlice/userDataSlice";

export default function ProductCard({ products, onProductPress }) {

  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)

  useEffect(() => {
    if (favorites.length == 0 ) {
      setFavorites(userData.savedProducts)
    }
  }, [])
  
const handleFavorite = (id) => {
  const updatedFavorites = favorites.includes(id)
    ? favorites.filter(item => item !== id)
    : [...favorites, id];

  setFavorites(updatedFavorites);              // update local state
  dispatch(setSavedProducts(updatedFavorites)); // dispatch correct data
};


  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    isModalVisible(true);
  };

  const colorPicker = (category) => {
    switch (category) {
      case "Sunscreen": 
        return {backgroundColor: "#FCF079"};
      case "Moisturizer":
        return {backgroundColor: "#CFF2FA"};
      case "Eye Cream":
        return {backgroundColor: "#D5CFFF"};
      case "Toner": 
        return {backgroundColor: "#CFFEAE"};
      case "Facial Cleanser":
        return {backgroundColor: "#FCD7F6"};
      case "Retinol":
        return {backgroundColor: "#FFC9BA"};
      case "Serum":
        return {backgroundColor: "#FC53C1"};
      default: 
        return { backgroundColor: "#fff" };
    }
  }

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView>
        {products.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No products found.</Text>
        ) : (
          products.map((item) => (
            <Pressable key={item.id} onPress={() => handleOpenModal(item)}>
              <View style={styles.card}>
                <TouchableOpacity 
                  style={styles.heartIcon} 
                  onPress={() => handleFavorite(item.id)}
                >
                  <AntDesign 
                    name={favorites.includes(item.id) ? "heart" : "hearto"} 
                    size={15} 
                    color={favorites.includes(item.id) ? "red" : "gray"} 
                  />
                </TouchableOpacity>
                <Image 
                  source={require('../../assets/skincare-aquaflask.png')} 
                  style={styles.image} 
                  resizeMode="cover" 
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.productName}</Text>
                  <Text style={styles.brand}>{item.brand}</Text>
                  <Text style={styles.size}>{item.size}</Text>
                  <Text style={styles.skinType}>{item.skinType}</Text>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>

      <ProductModal
        visible={modalVisible}
        onClose={() => isModalVisible(false)}
        product={selectedProduct}
        products={products}
        name={selectedProduct?.productName}
        category={selectedProduct?.category}
        color={colorPicker(selectedProduct?.category)}
        brand={selectedProduct?.brand}
        size={selectedProduct?.size}
        skinType={selectedProduct?.skinType}
        productImage={selectedProduct?.image}
        approve={selectedProduct?.approve}
        favorites={favorites}
        handleOpenModal={handleOpenModal}
        handleFavorite={handleFavorite}
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
  skinType: {
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
