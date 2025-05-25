import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import SearchBar from '../SkincareListView/SearchBar';
import ProductCard from '../SkincareListView/ProductCard';
import SkincareAds from '../SkincareAds';
import ProductModal from '../SkincareListView/ProductModal';

import { db } from '../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";

export default function SkincareListView() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

    const handleFavorite = (id) => {
      const updatedFavorites = favorites.includes(id)
        ? favorites.filter(item => item !== id)
        : [...favorites, id];
  
      setFavorites(updatedFavorites);
      dispatch(setSavedProducts(updatedFavorites));
    };

  const handleSearch = () => {
      const keyword = searchText.toLowerCase();

      let result = [];

      if (selectedFilter === "All") {
        result = allProducts.filter(p =>
          p.productName.toLowerCase().includes(keyword) ||
          p.brand.toLowerCase().includes(keyword) ||
          p.category.toLowerCase().includes(keyword) ||
          p.skinType.toLowerCase().includes(keyword)
        );
      } else if (selectedFilter === "Category") {
        result = allProducts.filter(p => p.category.toLowerCase().includes(keyword));
      } else if (selectedFilter === "Brand") {
        result = allProducts.filter(p => p.brand.toLowerCase().includes(keyword));
      } else if (selectedFilter === "Skin Type") {
        result = allProducts.filter(p => p.skinType.toLowerCase().includes(keyword));
      } else if (selectedFilter === "Approved") {
        result = allProducts.filter(p => p.approve === true);
      }

      setFilteredProducts(result);
    };

  const handleFilterSelect = (filter) => {
      setSelectedFilter(filter);

      if (filter === 'Approved') {
        // Immediately filter approved products
        const approvedProducts = allProducts.filter(p => p.approve === true);
        setFilteredProducts(approvedProducts);
      } else if (filter === 'All') {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(allProducts);
      }
    };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView className="p-5">
        <SearchBar 
          search={searchText}
          setSearch={setSearchText}
          onSearch={handleSearch}
          onFilterSelect={handleFilterSelect}
          selectedFilter={selectedFilter} 
        />
        <SkincareAds />
        <ProductCard 
          products={filteredProducts}
          onProductPress={handleProductPress}
          handleFavorite={handleFavorite}
        />
      </ScrollView>

      {selectedProduct && (
        <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        products={filteredProducts}
        name={selectedProduct.productName}
        category={selectedProduct.category}
        brand={selectedProduct.brand}
        size={selectedProduct.size}
        skinType={selectedProduct.skinType}
        productImage={selectedProduct.image}
        approve={selectedProduct.approve}
        handleOpenModal={handleProductPress}
      />
      )}
    </>
  );
}
