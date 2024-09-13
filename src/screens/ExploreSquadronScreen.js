import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import SquadListItem from '../components/SquadListItem';
import { listSquads } from '../graphql/queries';
import { onCreateSquad } from '../graphql/subscriptions'; 
import { useUserContext } from '../../UserContext';

const ExploreSquadronScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [squads, setSquads] = useState([]);
  const [filteredSquads, setFilteredSquads] = useState([]);
  const { user } = useUserContext();

 // Fetch squads on initial render
 useEffect(() => {
  const fetchSquads = async () => {
    try {
      const results = await API.graphql(graphqlOperation(listSquads));
      // console.log("here is the number of squads",results.data?.listSquads)
      if (!results.data?.listSquads.items) {
        console.log('Error fetching squads');
        return;
      }
      // Sort squads by createdAt in descending order
      const sortedSquads = results.data.listSquads.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      //console.log("here is the sorted squads", sortedSquads)
      //onsole.log("here is the sorted squads", sortedSquads)
      setSquads(sortedSquads); 
        // Check the length of squads and log it
        console.log('Number of squads:', sortedSquads.length);
    } catch (error) {
      console.log('Error getting squads', error);
    }
  };
  fetchSquads();
   // Set up the subscription for new squads being created
   const subscription = API.graphql(graphqlOperation(onCreateSquad)).subscribe({
    next: (squadData) => {
      const newSquad = squadData.value.data.onCreateSquad;
      console.log('New squad created: ', newSquad);

      // Add the new squad to the list and sort by creation time
      setSquads((prevSquads) => {
        const updatedSquads = [newSquad, ...prevSquads];
        return updatedSquads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
      //console.log("here is the updated squads", squads)
    },
    error: (error) => console.log('Error on squad subscription', error),
  });

  // Cleanup subscription on unmount
  return () => {
    subscription.unsubscribe();
  };
}, []);
  
    useEffect(() => {
      setFilteredSquads(
        squads.filter((squad) =>
          squad.squadName.toLowerCase().includes(searchPhrase.toLowerCase())
        )
      );
    }, [searchPhrase, squads]);
  

  useEffect(() => {
    setFilteredSquads(
      squads.filter((squad) =>
        squad.squadName.toLowerCase().includes(searchPhrase.toLowerCase())
      )
    );
  }, [searchPhrase, squads]);

  const handleSearchBarClick = () => {
    // Handle click event for the search bar here
    console.log('Search bar clicked');
  };

  const handleRequestSent = (squadId) => {
    // Filter out the squad for which the join request has been sent
    setSquads((prevSquads) => prevSquads.filter((squad) => squad.id !== squadId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick} // Pass the function to handle search bar click
        />
        {filteredSquads.length === 0 ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : (
          <FlatList
            data={filteredSquads}
            renderItem={({ item }) => 
            <SquadListItem
             squad={item} 
             userInfo={user} 
             onRequestSent={handleRequestSent} // Pass the callback function to SquadListItem
             />
            }
            keyExtractor={(item) => item.id.toString()}
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
