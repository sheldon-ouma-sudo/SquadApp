import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';
import { listUsers } from '../graphql/queries';
import { onCreateUser } from '../graphql/subscriptions';  

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
        // Sort users by creation time, from latest to oldest
        const sortedUsers = results.data.listUsers.items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );  
        setUsers(sortedUsers);
      } catch (error) {
        console.log('Error getting users', error);
      }
    };
    fetchUsers();
    // Set up the subscription for new users being created
    const subscription = API.graphql(graphqlOperation(onCreateUser)).subscribe({
      next: (userData) => {
        const newUser = userData.value.data.onCreateUser;
        console.log('New user created: ', newUser);

        // Add the new user to the list and sort by creation time
        setUsers((prevUsers) => {
          const updatedUsers = [newUser, ...prevUsers];
          return updatedUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
      },
      error: (error) => console.log('Error on user subscription', error),
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
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

  // // Update the handleSquadsSelected function to remove the selected user
  const handleUserAddedToSquad = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick}
        />
        <FlatList 
          data={filteredUsers}
          renderItem={({ item }) => (
            <UserListItem user={item} 
            onUserAddedToSquad={handleUserAddedToSquad} />
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
