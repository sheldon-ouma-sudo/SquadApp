import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import SquadListItem from '../components/SquadListItem';
import { API, graphqlOperation } from "aws-amplify";
import SearchBar from '../components/SearchBar';
import { getSquad } from '../graphql/queries';

const UserDisplaySquadJoined = ({ squadJoined, user }) => {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (squadJoined) {
          // Remove duplicates from squadJoined array
          const uniqueSquadJoined = [...new Set(squadJoined)];

          const squad_created = [];
          for (const squadID of uniqueSquadJoined) {
            const squadData = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
            squad_created.push(squadData.data?.getSquad);
          }
          setSquads(squad_created);
        }
      } catch (error) {
        console.log('Error fetching squads:', error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchData();
  }, [squadJoined]);

  const handleSearchBarClick = () => {
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
          setClicked={handleSearchBarClick}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : squads.length === 0 ? (
          <Text>No squads found</Text>
        ) : (
          <FlatList
            data={squads}
            renderItem={({ item }) => 
              <SquadListItem
                squad={item} 
                userInfo={user} 
                onRequestSent={handleRequestSent}
              />
            }
            keyExtractor={(item, index) => item?.id ? item.id.toString() : `fallback-key-${index}`}
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

export default UserDisplaySquadJoined;
