import React from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

export default function SkincareCategories() {
  const products = ["Moisturiser", "Serum", "Toner", "Suncreen", "Cleanser", "Lip Care", "Eye Cream"];

  const pressTester = () => {
    alert("Hello");
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        {products.map((product, index) => (
          <Text key={index} style={styles.text} onPress={pressTester}>
            {product}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    marginVertical: 15,
    
  },
  contentContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
    
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
  },
});
