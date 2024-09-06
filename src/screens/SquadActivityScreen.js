import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getRequestToBeAddedInASquad, getRequestToJoinASquad } from '../graphql/queries';
import RequestsToJoinUserSquadListItem from '../components/RequestsToJoinUserSquadListItem';
import RequestsToBeAddedInASquad from '../components/RequestsToBeAddedInASquad';

const SquadActivityScreen = ({ route }) => {
  const { squadAddRequestsArray, squadJoinRequestArray } = route.params || {};
  const [joinSquadRequests, setJoinSquadRequests] = useState([]);
  const [addedToSquadRequests, setAddedToSquadRequests] = useState([]);

    // Callback to remove request from the list
    const removeRequestFromList = (id) => {
      setAddedToSquadRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    };

  // Fetch requests for squads
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch request to join squads using squadJoinRequestArray
        const joinRequests = await Promise.all(
          squadJoinRequestArray.map(async (requestId) => {
            const requestResult = await API.graphql(
              graphqlOperation(getRequestToJoinASquad, { id: requestId })
            );
            return requestResult.data.getRequestToJoinASquad;
          })
        );
        setJoinSquadRequests(joinRequests);

        // Fetch request to be added to squads using squadAddRequestsArray
        const addedRequests = await Promise.all(
          squadAddRequestsArray.map(async (requestId) => {
            const requestResult = await API.graphql(
              graphqlOperation(getRequestToBeAddedInASquad, { id: requestId })
            );
            return requestResult.data.getRequestToBeAddedInASquad;
          })
        );
        setAddedToSquadRequests(addedRequests);
      } catch (error) {
        console.log('Error fetching squad requests:', error);
      }
    };

    if (squadAddRequestsArray.length || squadJoinRequestArray.length) {
      fetchRequests();
    }
  }, [squadAddRequestsArray, squadJoinRequestArray]);

  // Render item for join squad requests
  const renderJoinRequestItem = ({ item }) => (
    <RequestsToJoinUserSquadListItem item={item} />
  );

  // Render item for added to squad requests
  const renderAddedRequestItem = ({ item }) => (
    <RequestsToBeAddedInASquad item={item} removeRequestFromList={removeRequestFromList}/>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* FlatList for Request to Join Squads */}
        <Text style={styles.sectionHeader}>Requests to Join Your Squad</Text>
        <FlatList
          data={joinSquadRequests}
          renderItem={renderJoinRequestItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          nestedScrollEnabled
          contentContainerStyle={styles.listContent}
        />

        {/* FlatList for Request to Be Added to Squads */}
        <Text style={styles.sectionHeader}>Requests to Add You to Squads</Text>
        <FlatList
          data={addedToSquadRequests}
          renderItem={renderAddedRequestItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          nestedScrollEnabled
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F4F8FB',
  },
  container: {
    padding: 15,
    backgroundColor: '#F4F8FB',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#1145FD',
  },
  flatList: {
    maxHeight: 200, // Control the height to make both lists visible
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20, // Ensure enough padding for scrolling
  },
  requestItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default SquadActivityScreen;
