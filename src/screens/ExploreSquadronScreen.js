import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import SquadListItem from '../components/SquadListItem';
import { listSquads } from '../graphql/queries';
import { useUserContext } from '../../UserContext';

const ExploreSquadronScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [squads, setSquads] = useState([]);
  const [filteredSquads, setFilteredSquads] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listSquads));
        if (!results.data?.listSquads) {
          console.log('Error fetching squads');
          return;
        }
        setSquads(results.data.listSquads.items);
      } catch (error) {
        console.log('Error getting squads', error);
      }
    };
    fetchSquads();
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick} // Pass the function to handle search bar click
        />
        {filteredSquads.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredSquads}
            renderItem={({ item }) => <SquadListItem squad={item} userInfo={user} />}
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
