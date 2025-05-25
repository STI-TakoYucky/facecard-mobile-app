import React from "react";
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from "@expo/vector-icons/AntDesign";

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
                color="black"
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
                      <MaterialIcons name="verified" size={24} color="lightpink" />
                    )}
                  </View>
                
                  {/* PRODUCT NAME */}
                  <Text className="my-6 text-2xl font-bold">{props.name}</Text>

                  {/* PRODUCT BRANDS, GRAM, SKINTYPE */}
                  <Text style={{fontSize: 18}}>{props.brand}</Text>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text style={{width: 'auto', marginRight: 15, fontSize: 15}}>
                      {props.size}
                    </Text>
                    <Feather 
                    name="droplet" 
                    size={24} 
                    color="black" 
                    />  
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{width: 'auto', marginRight: 15, fontSize: 15}}>{props.skinType}</Text>
                    <Feather 
                    name="smile" 
                    size={24} 
                    color="black" 
                    />  
                  </View>
                
                  {/* RECOMMENDATION */}
                  <Text style={{marginVertical: 30, fontSize: 20, fontWeight: 'bold'}}>
                    More From {props.brand}
                  </Text>

                <ScrollView horizontal={true} showsVerticalScrollIndicator ={false}>
                  {recommendedProducts.map((item) => (
                    <Pressable key={item.id} onPress={() => props.handleOpenModal(item)}>
                      <View style={styles.card}>
                        <TouchableOpacity
                          style={styles.heartIcon}
                          onPress={(e) => {
                            e.stopPropagation();
                            props.handleFavorite(item.id);
                          }}
                        > 
                        <AntDesign 
                          name={props.favorites?.includes(item.id) ? "heart" : "hearto"} 
                          size={15} 
                          color={props.favorites?.includes(item.id) ? "red" : "gray"} 
                        />
                        </TouchableOpacity>
                        <Image
                          source={item.productImage ? { uri: item.productImage } : require('../../assets/skincare-aquaflask.png')}
                          style={styles.image}
                          resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{item.productName}</Text>
                          <Text style={styles.brand}>{item.brand}</Text>
                          <Text style={styles.size}>{item.size}</Text>
                          <Text style={styles.skinType}>{item.skinType}</Text>
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    width: '30%', 
    borderRadius: 12,
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