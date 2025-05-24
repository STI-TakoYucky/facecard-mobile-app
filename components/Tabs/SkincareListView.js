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

  const filterProducts = () => {
    const search = searchText.toLowerCase();
    const filtered = allProducts.filter((item) => {
      if (selectedFilter === "All") {
        return (
          item.productName?.toLowerCase().includes(search.toLowerCase()) ||
          item.brand?.toLowerCase().includes(search.toLowerCase()) ||
          item.category?.toLowerCase().includes(search.toLowerCase()) ||
          item.skinType?.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (selectedFilter === "Category") {
        return item.category?.toLowerCase().includes(search.toLowerCase());
      }
      if (selectedFilter === "Brand") {
        return item.brand?.toLowerCase().includes(search.toLowerCase());
      }
      if (selectedFilter === "Skin Type") {
        return item.skinType?.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });

    setFilteredProducts(filtered);
  }

  //FILTERS DATA BASED ON SEARCHBAR OR MENU
  useEffect(() => {
    filterProducts();
  }, [searchText, selectedFilter]);

  return (
    <ScrollView className="p-5">
        <SearchBar 
          search={searchText}
          setSearch={setSearchText} 
          onFilterSelect={setSelectedFilter} 
        />
        <SkincareAds></SkincareAds>
        <ProductCard 
          products={filteredProducts}
        />
    </ScrollView>
  )
}