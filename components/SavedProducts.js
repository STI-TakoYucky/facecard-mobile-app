import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import ProductModal from "./SkincareListView/ProductModal";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { setSavedProducts } from "../state/userDataSlice/userDataSlice";
import { db } from '../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import { fonts } from "../utils/fonts";
import AllSavedProductsList from "./Screens/AllSavedProductsList";

export default function SavedProducts() {
  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const [allProducts, setAllProducts] = useState([]);
  const [isAllSavedProducts, setAllSavedProducts] = useState(false);

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

        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavorites(userData.savedProducts);
    }
  }, []);

  const handleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    dispatch(setSavedProducts(updatedFavorites));
  };

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    isModalVisible(true);
  };

  const truncateText = (text, maxLength = 25) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
  };

  const colorPicker = (category) => {
    switch (category) {
      case "Sunscreen":
        return { backgroundColor: "#FCF079" };
      case "Moisturizer":
        return { backgroundColor: "#CFF2FA" };
      case "Eye Cream":
        return { backgroundColor: "#D5CFFF" };
      case "Toner":
        return { backgroundColor: "#CFFEAE" };
      case "Facial Cleanser":
        return { backgroundColor: "#FCD7F6" };
      case "Retinol":
        return { backgroundColor: "#FFC9BA" };
      default:
        return { backgroundColor: "#fff" };
    }
  };

  return (
    <View>
      <AllSavedProductsList
        isAllSavedProducts={isAllSavedProducts}
        setAllSavedProducts={setAllSavedProducts}
        favorites={favorites}
        setFavorites={setFavorites}
        selectedProduct={selectedProduct}
        modalVisible={modalVisible}
        colorPicker={colorPicker}
        styles={styles}
        truncateText={truncateText}
      />

      <View className="flex flex-row items-center justify-between mt-10">
        <Text className="text-dark-800 text-3xl" style={fonts.HeaderFont}>
          Favorites
        </Text>
        <TouchableOpacity onPress={() => setAllSavedProducts(true)}>
          <Text className="text-base text-dark-800" style={fonts.BodyFont}>
            See more
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20 }}>
        {allProducts.length === 0 ? (
          <Text style={[{ textAlign: 'center', marginTop: 20 }, fonts.BodyFont]}>
            No products found.
          </Text>
        ) : (
          allProducts.map((item) => {
            if (favorites.includes(item.id)) {
              return (
                <Pressable key={item.id} onPress={() => handleOpenModal(item)}>
                  <View style={styles.card}>
                    <TouchableOpacity
                      style={styles.heartIcon}
                      onPress={() => handleFavorite(item.id)}
                    >
                      <AntDesign
                        name={favorites.includes(item.id) ? "heart" : "hearto"}
                        size={20}
                        color={favorites.includes(item.id) ? "red" : "gray"}
                      />
                    </TouchableOpacity>
                    <Image
                      source={require('../assets/skincare-aquaflask.png')}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.infoContainer}>
                      <Text className="text-dark-800" style={[styles.name, fonts.HeaderFont]}>
                        {truncateText(item.productName)}
                      </Text>
                      <Text style={[styles.brand, fonts.BodyFont]}>{item.brand}</Text>
                      <Text style={[styles.size, fonts.BodyFont]}>{item.size}ml</Text>
                      <Text style={[styles.skinType, fonts.BodyFont]}>{item.skinType}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            }
          })
        )}
      </ScrollView>

      <ProductModal
        visible={modalVisible}
        onClose={() => isModalVisible(false)}
        product={selectedProduct}
        name={selectedProduct?.productName}
        category={selectedProduct?.category}
        color={colorPicker(selectedProduct?.category)}
        brand={selectedProduct?.brand}
        size={selectedProduct?.size}
        skinType={selectedProduct?.skinType}
        productImage={selectedProduct?.productImage}
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
    paddingInline: 25,
    marginHorizontal: 10,
    alignItems: 'center',
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
  heartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
});
