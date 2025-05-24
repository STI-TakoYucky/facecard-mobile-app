import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import SearchBar from '../SkincareListView/SearchBar';
import ProductCard from '../SkincareListView/ProductCard';
import SkincareAds from '../SkincareListView/SkincareAds';

import { db } from '../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";

export default function SkincareListView() {

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

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
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
      fetchProducts();
  }, []);

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
      }

      setFilteredProducts(result);
    };

  return (
    <ScrollView className="p-5">
        <SearchBar 
          search={searchText}
          setSearch={setSearchText}
          onSearch={handleSearch}
          onFilterSelect={setSelectedFilter}
          selectedFilter={selectedFilter} 
        />
        <SkincareAds></SkincareAds>
        <ProductCard 
          products={filteredProducts}
        />
    </ScrollView>
  )
}