import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';
import { listUsers } from '../graphql/queries';

const ExploreUserScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listUsers));
        if (!results.data?.listUsers) {
          console.log('Error fetching users');
          return;
        }
        setUsers(results.data?.listUsers?.items);
      } catch (error) {
        console.log('Error getting users', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchPhrase) return users;
    return users.filter((item) => {
      return item.userName && item.userName.toLowerCase().includes(searchPhrase.toLowerCase());
    });
  }, [searchPhrase, users]);

  const handleSearchBarClick = () => {
    // Handle click event for the search bar here
    console.log('Search bar clicked');
  };

  // Define the handleSquadsSelected function here
  const handleSquadsSelected = (squads) => {
    console.log('Selected Squads:', squads);
    // Implement the logic to handle the selected squads here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick} // Pass the function to handle search bar click
        />
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <UserListItem user={item} handleSquadsSelected={handleSquadsSelected} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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

export default ExploreUserScreen;
