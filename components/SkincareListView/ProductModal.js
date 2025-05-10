import React, { useState } from "react";
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function ProductModal(props) {

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
                source={require('../../assets/celeteque_sunscreen.png')}
                style={{width: 250, height: 300, alignSelf: 'center'}}
              />
            </View>

            {/* PRODUCT INFO */}
            <View style={styles.productInfoView}>
                <View style={styles.productInfo}>
                  
                  {/* PRODUCT CATEGORY */}
                  <Text style={[styles.category, {backgroundColor: props.color}]}>{props.category}</Text>

                  {/* PRODUCT NAME */}
                  <Text style={styles.name}>{props.name}</Text>

                  {/* PRODUCT BRANDS, GRAM, SKINTYPE */}
                  <Text style={{fontSize: 18}}>{props.brand}</Text>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text style={{width: 'auto', marginRight: 15, fontSize: 15}}>{props.size}</Text>
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
                  <Text style={{marginVertical: 40, fontSize: 20, fontWeight: 'bold'}}>
                    More From {props.brand}
                  </Text>

                <ScrollView horizontal={true} showsVerticalScrollIndicator ={false}>
                  <View style={styles.card}>
                    <Image 
                      source={require('../../assets/celeteque_sunscreen.png')}
                      style={{width: 100, height: 100, marginBottom: 10}}
                    />
                    <Text>Hello</Text>
                  </View>

                  <View style={styles.card}>
                    <Image 
                      source={require('../../assets/celeteque_sunscreen.png')}
                      style={{width: 100, height: 100, marginBottom: 10}}
                    />
                    <Text>Hello</Text>
                  </View>

                  <View style={styles.card}>
                    <Image 
                      source={require('../../assets/celeteque_sunscreen.png')}
                      style={{width: 100, height: 100, marginBottom: 10}}
                    />
                    <Text>Hello</Text>
                  </View>
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
  name:{
    marginVertical: 15,
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'black',   
  },
  card:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: 300,
    height: 100,
    marginHorizontal: 30,

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  }
});