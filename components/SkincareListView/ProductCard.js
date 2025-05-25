import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import ProductModal from "./ProductModal";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { setSavedProducts } from "../../state/userDataSlice/userDataSlice";
import { fonts } from "../../utils/fonts"; // <-- import your custom fonts

export default function ProductCard({ products }) {

  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

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

  const colorPicker = (category) => {
    switch (category) {
      case "Sunscreen": return { backgroundColor: "#FCF079" };
      case "Moisturizer": return { backgroundColor: "#CFF2FA" };
      case "Eye Cream": return { backgroundColor: "#D5CFFF" };
      case "Toner": return { backgroundColor: "#CFFEAE" };
      case "Facial Cleanser": return { backgroundColor: "#FCD7F6" };
      case "Retinol": return { backgroundColor: "#FFC9BA" };
      default: return { backgroundColor: "#fff" };
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView style={{ paddingBottom: 50}} showsVerticalScrollIndicator={false}>
        {products.length === 0 ? (
          <Text style={[{ textAlign: 'center', marginTop: 20 }, fonts.BodyFont]}>
            No products found.
          </Text>
        ) : (
          products.map((item) => (
            <Pressable key={item.id} onPress={() => handleOpenModal(item)}>
              <View style={{
                position: 'relative',
                flexDirection: 'row',
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                padding: 10,
                marginHorizontal: 10,
                marginVertical: 6,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <TouchableOpacity
                  style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}
                  onPress={() => handleFavorite(item.id)}
                >
                  <AntDesign
                    name={favorites.includes(item.id) ? "heart" : "hearto"}
                    size={22}
                    color={favorites.includes(item.id) ? "#f87171" : "gray"}
                  />
                </TouchableOpacity>
                <Image
                  source={require('../../assets/skincare-aquaflask.png')}
                  style={{ width: 100, height: 100, borderRadius: 10, marginRight: 12 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text className="text-dark-800" style={[{ fontSize: 16, marginBottom: 4 }, fonts.HeaderFont]}>
                    {item.productName}
                  </Text>
                  <Text style={[{ fontSize: 14, color: '#555', marginBottom: 2 }, fonts.BodyFont]}>
                    {item.brand}
                  </Text>
                  <Text style={[{ fontSize: 13, color: '#666', marginBottom: 8 }, fonts.BodyFont]}>
                    {item.size}ml
                  </Text>
                  <Text style={[{ fontSize: 13, color: '#666', marginBottom: 8 }, fonts.BodyFont]}>
                    {item.skinType}
                  </Text>
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
