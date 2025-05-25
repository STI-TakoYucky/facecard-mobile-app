import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import FaceDiaryHeader from '../FaceDiaryView/FaceDiaryHeader';
import CreateEntry from '../FaceDiaryView/CreateEntry';
import EntryCard from '../FaceDiaryView/EntryCard';
import EntryModal from '../FaceDiaryView/EntryModal';
import { useDispatch, useSelector } from 'react-redux';
import { saveDiaryEntries } from '../../state/userDataSlice/userDataSlice';

export default function FaceDiaryView() {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  // Initialize entries from Redux store on mount or when userData.diaryEntries changes
  const [entries, setEntries] = useState(userData.savedDiaryEntries || []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);

  // Sync local entries to Redux whenever entries change
  useEffect(() => {
    dispatch(saveDiaryEntries(entries));
  }, [entries, dispatch]);

  // SAVE or EDIT entry
  const handleSaveEntry = (newEntry) => {
    if (selectedEntryIndex !== null) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[selectedEntryIndex] = newEntry;
      setEntries(updatedEntries);
    } else {
      // Add new entry at the beginning
      setEntries((prev) => [newEntry, ...prev]);
    }
    setModalVisible(false);
    setSelectedEntryIndex(null);
  };

  // DELETE entry
  const handleDeleteEntry = (indexToDelete) => {
    setEntries((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // OPEN modal for editing
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
