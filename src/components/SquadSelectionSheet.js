// SquadSelectionSheet.js
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { API, graphqlOperation } from 'aws-amplify';
import { getSquad } from '../graphql/queries';
import SearchBar from './SearchBar';

const SquadSelectionSheet = forwardRef(({ onClose, onSquadsSelected, user}, ref) => {
  const [primarySquad, setPrimarySquad] = useState(null);
  const [squads, setSquads] = useState([]);
  const [filteredSquads, setFilteredSquads] = useState([]);
  const [selectedSquads, setSelectedSquads] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(true);

  const bottomSheetModalRef = useRef(null); // Internal ref

  // Expose `present` and `dismiss` methods to parent via `ref`
  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetModalRef.current?.present();
    },
    dismiss: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  useEffect(() => {
    const fetchSquads = async () => {
      if (user) {
        try {
          const primaryUserSquadID = user.userPrimarySquad[0];
          if (primaryUserSquadID) {
            const primarySquadResult = await API.graphql(graphqlOperation(getSquad, { id: primaryUserSquadID }));
            setPrimarySquad(primarySquadResult.data.getSquad);
          }

          const nonPrimarySquadArr = user.nonPrimarySquadsCreated || [];
          const squadPromises = nonPrimarySquadArr.map(async (squadID) =>
            API.graphql(graphqlOperation(getSquad, { id: squadID }))
          );
          const results = await Promise.all(squadPromises);
          const fetchedSquads = results.map(result => result.data.getSquad);
          setSquads(fetchedSquads);
          setFilteredSquads(fetchedSquads);
        } catch (error) {
          console.log("Error fetching squads", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSquads();
  }, [user]);

  useEffect(() => {
    setFilteredSquads(
      squads.filter((squad) =>
        squad.squadName.toLowerCase().includes(searchPhrase.toLowerCase())
      )
    );
  }, [searchPhrase, squads]);

  const handleSquadSelect = (squadID) => {
    setSelectedSquads((prevSelected) =>
      prevSelected.includes(squadID)
        ? prevSelected.filter((id) => id !== squadID)
        : [...prevSelected, squadID]
    );
  };

  const handleConfirmSelection = () => {
    onSquadsSelected(selectedSquads);
    bottomSheetModalRef.current?.dismiss(); // Dismiss the modal
  };

  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef} // Attach internal ref
      snapPoints={snapPoints}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Select Squads</Text>

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1145FD" />
        ) : (
          <>
            {primarySquad && (
              <>
                <Text style={styles.squadTypeTitle}>Personal Squad</Text>
                <TouchableOpacity
                  style={[
                    styles.squadItem,
                    selectedSquads.includes(primarySquad.id) && styles.selectedSquadItem,
                  ]}
                  onPress={() => handleSquadSelect(primarySquad.id)}
                >
                  <Text style={styles.squadName}>{primarySquad.squadName}</Text>
                </TouchableOpacity>
              </>
            )}

            {filteredSquads.length === 0 ? (
              <Text>No squads found.</Text>
            ) : (
              <>
                <Text style={styles.squadTypeTitle}>Other Squads</Text>
                <FlatList
                  data={filteredSquads}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.squadItem,
                        selectedSquads.includes(item.id) && styles.selectedSquadItem,
                      ]}
                      onPress={() => handleSquadSelect(item.id)}
                    >
                      <Text style={styles.squadName}>{item.squadName}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </>
            )}
          </>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmSelection}
        >
          <Text style={styles.confirmButtonText}>Confirm Selection</Text>
        </TouchableOpacity>
        <SquadSelectionSheet
          ref={bottomSheetModalRef} // Attach the ref to the modal
          onClose={() => { /* Optional: Handle modal close if needed */ }}
          onSquadsSelected={handleSquadsSelected} // Handle selected squads
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  squadTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  squadItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  selectedSquadItem: {
    backgroundColor: '#ddd',
  },
  squadName: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#1764EF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SquadSelectionSheet;
