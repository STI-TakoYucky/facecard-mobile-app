import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

export default function EntryCard({ entry }) {
  return (
    <View>
      <Text className="mt-5 text-xl font-bold">{entry.date}</Text>
      <View style={styles.card}>
        {entry.imageUri && (
          <Image 
            source={{ uri: entry.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={styles.text}>{entry.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: 370,
    maxHeight: 200,
    alignSelf: 'center',
    marginTop: 3,
    borderRadius: 8,
    padding: 10,
    elevation: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10
  },
  text: {
    flex: 1,
    alignSelf: 'center'
  },
});