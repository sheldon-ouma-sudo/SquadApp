import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';
import { listUsers } from '../graphql/queries';
import { onCreateUser } from '../graphql/subscriptions';  
import { useFocusEffect } from '@react-navigation/native'; // Added import

const ExploreUserScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading spinner
      const results = await API.graphql(graphqlOperation(listUsers));
      if (!results.data?.listUsers.items) {
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
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Refetch users every time the screen is focused using useFocusEffect
  useFocusEffect(
    useCallback(() => {
      fetchUsers(); // Fetch users when the screen is focused

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
    }, []) // Empty dependency array ensures the callback is only set up once
  );

  const filteredUsers = useMemo(() => {
    if (!searchPhrase) return users;
    return users.filter((item) => {
      return item.userName && item.userName.toLowerCase().includes(searchPhrase.toLowerCase());
    });
  }, [searchPhrase, users]);

  const handleSearchBarClick = () => {
    console.log('Search bar clicked');
  };

  // Callback when a user is added to the squad
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
        {loading ? (
          <ActivityIndicator size="small" color="#1145FD" /> // Show spinner when loading
        ) : filteredUsers.length === 0 ? (
          <Text>No users found</Text>
        ) : (
          <FlatList 
            data={filteredUsers}
            renderItem={({ item }) => (
              <UserListItem 
                user={item} 
                onUserAddedToSquad={handleUserAddedToSquad} 
              />
            )}
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

export default ExploreUserScreen;
