import React from "react";
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
                source={require('../../assets/skincare-aquaflask.png')}
                style={{width: 250, height: 300, alignSelf: 'center'}}
              />
            </View>

            {/* PRODUCT INFO */}
            <View style={styles.productInfoView}>
                <View style={styles.productInfo}>
                  
                  {/* PRODUCT CATEGORY */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.category, props.color]}>{props.category}</Text>
                    
                  </View>
                
                  {/* PRODUCT NAME */}
                  <Text className="my-6 text-2xl font-bold">{props.name}</Text>

                  {/* PRODUCT BRANDS, GRAM, SKINTYPE */}
                  <Text style={{fontSize: 18}}>{props.brand}</Text>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text style={{width: 'auto', marginRight: 15, fontSize: 15}}>
                      {props.size}ml
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
                  <View style={styles.card}>
                    <View style={styles.imageContainer}>
                      <Image 
                      source={require('../../assets/skincare-aquaflask.png')}
                      style={{width: 100, height: 100, marginBottom: 10}}
                      />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={{fontSize: 16, fontWeight: 'bold', padding: 1, marginVertical: 2}}>{props.name}</Text>
                      <Text style={{fontSize: 12, padding: 1}}>{props.brand}</Text>
                      <Text style={{fontSize: 12, padding: 1}}>{props.size}ml</Text>
                    </View>
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
  card:{
    backgroundColor: '#eee',
    flexDirection: 'row',
    width: 300,
    height: 'auto',
    marginHorizontal: 17,
    borderRadius: 10,

    elevation: 13,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  infoContainer:{
    flex: 1,
    justifyContent: 'center'
  }
});