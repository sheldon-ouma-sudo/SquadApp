import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import UserListItem from '../components/UserListItem';
import SearchBar from '../components/SearchBar';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';

const SquadUserScreen = ({ squadUsers }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [squadUsersData, setSquadUsersData] = useState([]);

  // Fetch user details for each userId in squadUsers array
// Fetch user details for each userId in squadUsers array
useEffect(() => {
  const fetchUserDetails = async () => {
    if (squadUsers) {
      setLoading(true);
      try {
        const userPromises = squadUsers.map(async (squadUser) => {
          const userData = await API.graphql(graphqlOperation(getUser, { id: squadUser.userId }));
          return userData?.data?.getUser;
        });

        const users = await Promise.all(userPromises);

        // Remove duplicates based on `id`
        const uniqueUsers = users.filter(Boolean).reduce((acc, currentUser) => {
          if (!acc.find(user => user.id === currentUser.id)) {
            acc.push(currentUser);
          }
          return acc;
        }, []);

        setSquadUsersData(uniqueUsers); // Set state with unique user data
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("There is an error getting squad users");
    }
  };

  fetchUserDetails();
}, [squadUsers]);

  // Memoized filtered users based on the search phrase
  const filteredUsers = squadUsersData.filter((user) => {
    if (!searchPhrase) return true;
    return user.name?.toLowerCase().includes(searchPhrase.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : filteredUsers.length === 0 ? (
          <Text>No users found</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={({ item }) => <UserListItem user={item} />}
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

export default SquadUserScreen;
