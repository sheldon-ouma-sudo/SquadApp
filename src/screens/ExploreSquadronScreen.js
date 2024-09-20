import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import SquadListItem from '../components/SquadListItem';
import { listSquads } from '../graphql/queries';
import { onCreateSquad } from '../graphql/subscriptions';
import { useUserContext } from '../../UserContext';
import { useFocusEffect } from '@react-navigation/native';

const ExploreSquadronScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [squads, setSquads] = useState([]);
  const [filteredSquads, setFilteredSquads] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useUserContext();

  // Function to fetch squads from the backend
  const fetchSquads = async () => {
    try {
      setLoading(true);
      const results = await API.graphql(graphqlOperation(listSquads));
      if (!results.data?.listSquads?.items) {
        console.log('Error fetching squads');
        return;
      }

      // Sort squads by createdAt in descending order
      const sortedSquads = results.data.listSquads.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSquads(sortedSquads);
      setFilteredSquads(sortedSquads); // Set filtered squads to the fetched squads initially
    } catch (error) {
      console.log('Error getting squads', error);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch squads and subscribe to new squad creation events when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchSquads();

      const subscription = API.graphql(graphqlOperation(onCreateSquad)).subscribe({
        next: (squadData) => {
          const newSquad = squadData.value.data.onCreateSquad;
          setSquads((prevSquads) => {
            const updatedSquads = [newSquad, ...prevSquads];
            return updatedSquads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          });
        },
        error: (error) => console.log('Error on squad subscription', error),
      });

      return () => {
        subscription.unsubscribe();
      };
    }, [])
  );

  // Filter squads based on the search phrase
  useEffect(() => {
    setFilteredSquads(
      squads.filter((squad) =>
        squad.squadName.toLowerCase().includes(searchPhrase.toLowerCase())
      )
    );
  }, [searchPhrase, squads]);

  const handleSearchBarClick = () => {
    console.log('Search bar clicked');
  };

  const handleRequestSent = (squadId) => {
    // Filter out the squad for which the join request has been sent
    setSquads((prevSquads) => prevSquads.filter((squad) => squad.id !== squadId));
  };

  // Debugging logs to check for potential issues
  useEffect(() => {
    console.log("Current Squads: ", squads);
  }, [squads]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : filteredSquads.length === 0 ? (
          <Text>No squads found</Text>
        ) : (
          <FlatList
            data={filteredSquads}
            renderItem={({ item, index }) => {
              if (!item || !item.id) {
                console.log(`Missing or null id for squad at index ${index}:`, item);
                return null; // Skip rendering if item or id is invalid
              }
              return (
                <SquadListItem
                  squad={item}
                  userInfo={user}
                  onRequestSent={handleRequestSent}
                />
              );
            }}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : `squad-${index}`)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F8FB',
  },
  searchBarContainer: {
    marginTop: 10,
    marginLeft: 30,
    width: 420,
  },
});

export default ExploreSquadronScreen;
