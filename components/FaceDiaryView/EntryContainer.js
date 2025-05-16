import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import EntryModal from "./EntryModal";

export default function EntryContainer() {

  const [modalVisible, isModalVisible] = useState(false);

  const handleOpenModal = () => {
    isModalVisible(true); 
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Feather 
            name="plus" 
            size={25} 
            color="#162041"
          />
        </TouchableOpacity>
      </View>

      <EntryModal
        visible={modalVisible}
        onClose={() => isModalVisible(false)}
      />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    top: 580,
    right: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    marginTop: 10,
    borderRadius: 30,
    
    elevation: 10,
  },
});