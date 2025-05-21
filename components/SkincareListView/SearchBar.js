import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SearchBar() {
  
  const [search, setSearch] = useState('');

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
      <TouchableOpacity style={styles.menuIcon}>
        <Entypo 
          name="menu"
          size={20}
          color="black"
        />
      </TouchableOpacity>
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
});