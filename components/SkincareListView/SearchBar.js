import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SearchBar({ onFilterSelect }) {
  
  const [search, setSearch] = useState('');
  const [menuVisible, isMenuVisible] = useState(false);

  const filters = ["All", "Category", "Brand", "Skin Type"];

  const handleMenu = (filter) => {
    isMenuVisible(false);
    onFilterSelect?.(filter); // optional callback to parent
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon 
          style={styles.searchIcon}
          name="search"
          size={15}
          color="black"
        /> 
      </TouchableOpacity>
      <TextInput 
        value={search}
        style={styles.searchBar} 
        placeholder="Search..."
        onChangeText={setSearch}
      />
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
              style={styles.dropdownItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 13
  },
  searchIcon:{
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
  menuIcon:{
    marginLeft: 'auto',
    marginRight: 10
  },
  dropdown: {
    position: 'absolute',
    top: 25,
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
});