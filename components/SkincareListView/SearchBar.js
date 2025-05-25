import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SearchBar({ search, onSearch, onFilterSelect, selectedFilter, setSearch }) {
  
  const [menuVisible, isMenuVisible] = useState(false);
  
  const filters = ["All", "Category", "Brand", "Skin Type", "Approved"];

  const handleMenu = (filter) => {
    isMenuVisible(false);
    onFilterSelect?.(filter); // optional callback to parent
  };

  return (
    <View style={styles.container}>
      {/* SEARCH BUTTON */}
      <TouchableOpacity onPress={onSearch}>
        <Icon 
          style={styles.searchIcon}
          name="search"
          size={15}
          color="black"
        /> 
      </TouchableOpacity>

      {/* SEARCH BAR */}
      <TextInput 
        value={search}
        style={styles.searchBar} 
        placeholder="Search..."
        onChangeText={setSearch}
      />

      {/* MENU BUTTON */}
      <TouchableOpacity style={styles.menuIcon} onPress={() => isMenuVisible(!menuVisible)}>
        <Entypo 
          name="menu"
          size={20}
          color="black"
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdown}>
          {filters.map((item) => (
            <TouchableOpacity 
              key={item} 
              onPress={() => handleMenu(item)} 
              style={[
                styles.dropdownItem,
                selectedFilter === item && styles.selectedItem
              ]}
            >
              <Text style={[
                styles.dropdownText,
                selectedFilter === item && styles.selectedText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 13
  },
  searchIcon: {
    padding: 5,
    marginHorizontal: 10
  },
  searchBar: {
    flex: 1.5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#eee',
    maxWidth: 250,
    maxHeight: 40,
    padding: 8,
  },
  menuIcon: {
    marginLeft: 'auto',
    marginRight: 10
  },
  dropdown: {
    position: 'absolute',
    top: 45, // adjust if it overlaps input
    right: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    paddingVertical: 5,
    width: 150,
    zIndex: 1,
    elevation: 15,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
