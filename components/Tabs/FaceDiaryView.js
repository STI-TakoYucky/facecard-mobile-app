import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FaceDiaryHeader from '../FaceDiaryView/FaceDiaryHeader';
import CreateEntry from '../FaceDiaryView/CreateEntry';
import EntryCard from '../FaceDiaryView/EntryCard';
import EntryModal from '../FaceDiaryView/EntryModal';

export default function FaceDiaryView() {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);

  // EDITING ENTRY
  const handleSaveEntry = (newEntry) => {
  if (selectedEntryIndex !== null) {
    // If there is an entry
    const updatedEntries = [...entries];
    updatedEntries[selectedEntryIndex] = newEntry;
    setEntries(updatedEntries);
  } else {
    // Add new entry
    setEntries((prev) => [newEntry, ...prev]);
  }
  setModalVisible(false);
  setSelectedEntryIndex(null);
  };

  // DELETING ENTRY
  const handleDeleteEntry = (indexToDelete) => {
  setEntries((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // HANDLE EDIT
  const handleEditEntry = (index) => {
  setSelectedEntryIndex(index);
  setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FaceDiaryHeader />
        {entries.map((entry, index) => (
          <EntryCard
            key={index}
            index={index}
            entry={entry}
            onEdit={() => handleEditEntry(index)}
            onDelete={() => handleDeleteEntry(index)}
          />
        ))}

      </ScrollView>

      {/* Fixed Create Button */}
      <View style={styles.addEntryContainer}>
        <CreateEntry onPress={() => setModalVisible(true)} />
      </View>

      <EntryModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedEntryIndex(null);
        }}
        onSubmit={handleSaveEntry}
        initialData={selectedEntryIndex !== null ? entries[selectedEntryIndex] : null}
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
