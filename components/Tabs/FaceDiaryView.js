import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FaceDiaryHeader from '../FaceDiaryView/FaceDiaryHeader';
import CreateEntry from '../FaceDiaryView/CreateEntry';
import EntryTracker from '../FaceDiaryView/EntryTracker';
import EntryCard from '../FaceDiaryView/EntryCard';
import EntryModal from '../FaceDiaryView/EntryModal';

export default function FaceDiaryView() {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FaceDiaryHeader />
        <EntryTracker />

        {entries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))}
      </ScrollView>

      {/* Fixed Create Button */}
      <View style={styles.addEntryContainer}>
        <CreateEntry onPress={() => setModalVisible(true)} />
      </View>

      <EntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={addEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Give space for floating button
  },
  addEntryContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    zIndex: 10,
  }
});
