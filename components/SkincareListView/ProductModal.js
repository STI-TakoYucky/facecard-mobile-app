import React from "react";
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from "@expo/vector-icons/AntDesign";
import { fonts } from "../../utils/fonts";

export default function ProductModal(props) {

  const recommendedProducts = props.products
  ? props.products.filter(
      p =>
        p.brand === props.brand &&
        p.id &&
        props.product?.id &&
        p.id !== props.product?.id
    )
  : [];


  return (
      <Modal 
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onClose}
      >
        {/* HEADER */}
        <View style={styles.modal}> 
          <View style={styles.header}>
            <TouchableOpacity onPress={props.onClose}>
              <Ionicons 
                name="arrow-back-sharp" 
                size={22} 
                color="#2D3B75"
                style={{margin: 13}} />
            </TouchableOpacity>
          </View>
           
          {/* IMAGE */}
          <ScrollView>
            <View>
              <Image 
                source={props.productImage ? { uri: props.productImage } : require('../../assets/skincare-aquaflask.png')} 
                style={{width: 250, height: 300, alignSelf: 'center'}}
              />
            </View>

            {/* PRODUCT INFO */}
            <View style={styles.productInfoView}>
                <View style={styles.productInfo}>
                  
                  {/* PRODUCT CATEGORY */}
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.category, props.color]}>{props.category}</Text>
                    {props.approve === true && (
                      <MaterialIcons name="verified" size={24} color="#2D3B75" />
                    )}
                  </View>
                
                  {/* PRODUCT NAME */}
                  <Text className="my-6 text-2xl text-dark-800" style={[fonts.HeaderFont]}>{props.name}</Text>

                  {/* PRODUCT BRANDS, GRAM, SKINTYPE */}
                  <Text className="text-dark-800 text-lg" style={[fonts.HeaderFont]}>{props.brand}</Text>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text className="text-dark-800" style={{width: 'auto', marginRight: 15, fontSize: 15}}>
                      {props.size}
                    </Text>
                    <Feather 
                    name="droplet" 
                    size={24} 
                    color="#2D3B75" 
                    />  
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text className="text-dark-800" style={[fonts.BodyFont, {width: 'auto', marginRight: 15, fontSize: 15}]}>{props.skinType}</Text>
                    <Feather 
                    name="smile" 
                    size={24} 
                    color="#2D3B75" 
                    />  
                  </View>
                
                  {/* RECOMMENDATION */}
                  <Text className="text-dark-800" style={[fonts.HeaderFont, {marginVertical: 30, fontSize: 20}]}>
                    More From {props.brand}
                  </Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator ={false} style={{paddingBottom: 50}}>
                  {recommendedProducts.map((item) => (
                    <Pressable key={item.id} onPress={() => props.handleOpenModal(item)}>
                  <View style={styles.card}>
                    <TouchableOpacity
                      style={styles.heartIcon}
                      onPress={() => props.handleFavorite(item.id)}
                    >
                      <AntDesign
                        name={props.favorites?.includes(item.id) ? "heart" : "hearto"}
                        size={22}
                        color={props.favorites?.includes(item.id) ? "#f87171" : "gray"}
                      />
                    </TouchableOpacity>
                    <Image
                      source={{uri: item.image}}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.infoContainer}>
                      <Text className="text-dark-800" style={[styles.name, fonts.HeaderFont]}>
                        {item.productName}
                      </Text>
                      <Text style={[styles.brand, fonts.BodyFont]}>{item.brand}</Text>
                      <Text style={[styles.size, fonts.BodyFont]}>{item.size}ml</Text>
                      <Text style={[styles.skinType, fonts.BodyFont]}>{item.skinType}</Text>
                    </View>
                  </View>
                </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  modal:{
    flex: 1
  },  
  header:{
    backgroundColor: 'lightpink',
    
    elevation: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  productInfoView:{
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    minHeight: 500,

    elevation: 24,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  productInfo:{
    margin: 25,
    padding: 8,
  },
  category:{
    fontSize: 14,
    fontWeight: 'bold',
    color: "#2D3B75",
    paddingBlock: 10,
    borderRadius: 5,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 7,
  },
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: 300,
    height: 120,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    alignItems: 'center',

    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  brand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  size: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  skinType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  heartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
});