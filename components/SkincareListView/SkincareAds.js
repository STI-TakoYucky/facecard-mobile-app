import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function SkincareAds() {
  return (
    <ScrollView
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      style={{marginVertical: 3}}
    >
      <View>
        <TouchableOpacity style={styles.container}>
          <Image 
            source={require('../../assets/neutrogena_ad.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <View>
        <TouchableOpacity style={styles.container}>
          <Image 
            source={require('../../assets/celeteque_ad.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.container}>
          <Image 
            source={require('../../assets/neutrogena_ad.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: 350,
    height: 135,
    backgroundColor: "#fff",
    marginRight: 20, 

  },
  image: {
    width: '100%',
    height: '100%',
  }
});