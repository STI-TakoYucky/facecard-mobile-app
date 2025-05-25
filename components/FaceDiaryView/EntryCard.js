import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function EntryCard({ entry, index, onEdit, onDelete }) {

  const [editEntry, setEdit] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text className="mt-5 text-xl font-bold">{entry.date}</Text>
      <View style={styles.card}>
        {entry.imageUri && (
          <Image 
            source={{ uri: entry.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{entry.title}</Text>
          <Text style={styles.subText}>{entry.mainText}</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Entypo 
            name="dots-three-horizontal" 
            size={18} 
            color="black" 
            onPress={() => setEdit(prev => !prev)}/>
        </TouchableOpacity>

        {editEntry && (
          <Animated.View>
            <View style={styles.popupMenu}>
              <TouchableOpacity onPress={() => {
                setEdit(false); // hide the menu
                onEdit(entry, index); // call edit
              }}>
                <Text style={styles.popupText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setEdit(false); // hide the menu
                onDelete(index); // call delete
              }}>
                <Text style={styles.popupText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: 370,
    alignSelf: 'center',
    marginTop: 3,
    borderRadius: 8,
    padding: 10,
    elevation: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: 30 // space for the icon
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  subText: {
    fontSize: 14,
    color: '#333'
  },
  iconButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 3,
    zIndex: 1
  },
  popupMenu: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 6,
    elevation: 6,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  popupText: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  }
});
