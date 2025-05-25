import { View, Text, Modal, TouchableOpacity, ScrollView, Pressable, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fonts } from "../../utils/fonts";
import ProductModal from "../SkincareListView/ProductModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { setSavedProducts } from "../../state/userDataSlice/userDataSlice";

export default function AllSavedProductsList({isAllSavedProducts, setAllSavedProducts, favorites, setFavorites}) {
 
  const [modalVisible, isModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)
  const [allProducts, setAllProducts] = useState([]);

    // RETRIEVE DATA FROM FIREBASE
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
      }
        fetchProducts();
    }, []);

  useEffect(() => {
    if (favorites.length == 0 ) {
      setFavorites(userData.savedProducts)
    }
  }, [])
  
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
      default: 
        return { backgroundColor: "#fff" };
    }
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isAllSavedProducts}
      onRequestClose={() => setAllSavedProducts(false)}
    >
      <View
        className="bg-primary-100 px-5 py-4 max-h-[80px] gap-5 flex-row justify-start items-center" style={{ elevation: 5 }}>
        <TouchableOpacity onPress={() => setAllSavedProducts(false)}>
          <Ionicons name="arrow-back-sharp" size={22} color="#2D3B75" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-white px-5">
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between">
            <Text className="text-dark-800 text-3xl mt-10" style={[fonts.HeaderFont]}>Favorites</Text>
        </View>
        {allProducts.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No products found.</Text>
        ) : (
            allProducts.map((item) => {
            if(favorites.includes(item.id)) {
                return (
                    (
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
                        source={{uri: item.image}}
                        style={styles.image} 
                        resizeMode="cover" 
                        />
                        <View style={styles.infoContainer}>
                        <Text style={styles.name}>{truncateText(item.productName)}</Text>
                        <Text style={styles.brand}>{item.brand}</Text>
                        <Text style={styles.size}>{item.size}ml</Text>
                        <Text style={styles.skinType}>{item.skinType}</Text>
                        </View>
                    </View>
                    </Pressable>
                )
                )
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
    </Modal>
  );
}


const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
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