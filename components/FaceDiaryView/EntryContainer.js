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
    <View className="p-5, items-center">
          <View style={styles.container}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Feather 
                name="plus" 
                size={25} 
                color="black"
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
    backgroundColor: 'white',
    width: 350,
    height: 300,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,

    elevation: 10,
  }
});