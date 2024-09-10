import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID, getRequestToBeAddedInASquad, getRequestToJoinASquad } from '../graphql/queries';  // Import the queries
import { onCreateRequestToJoinASquad, onCreateRequestToBeAddedInASquad, onDeleteRequestToBeAddedInASquad } from '../graphql/subscriptions';
import RequestsToJoinUserSquadListItem from '../components/RequestsToJoinUserSquadListItem';
import RequestsToBeAddedInASquad from '../components/RequestsToBeAddedInASquad';
import { useUserContext } from '../../UserContext';

const SquadActivityScreen = () => {
  const { user } = useUserContext();  // Get the current user from context
  const [joinSquadRequests, setJoinSquadRequests] = useState([]); // Hold requests to join squads
  const [addedToSquadRequests, setAddedToSquadRequests] = useState([]); // Hold requests to be added to squads

 // Function to remove a join squad request from the list
 const removeJoinRequest = (id) => {
  setJoinSquadRequests((prevRequests) => 
    prevRequests.filter((request) => request.id !== id)
  );
};

// Function to remove an add squad request from the list
const removeAddRequest = (id) => {
  setAddedToSquadRequests((prevRequests) => 
    prevRequests.filter((request) => request.id !== id)
  );
};
  useEffect(() => {
    const fetchNotificationsAndRequests = async () => {
      try {
        const notificationData = await API.graphql(graphqlOperation(notificationsByUserID, { userID: user.id }));
        const notifications = notificationData?.data?.notificationsByUserID?.items;
  
        if (notifications && notifications.length > 0) {
          const notification = notifications[0];
          const joinRequests = await Promise.all(
            (notification.SquadJoinRequestArray || []).map(async (requestId) => {
              const requestResult = await API.graphql(graphqlOperation(getRequestToJoinASquad, { id: requestId }));
              return requestResult.data.getRequestToJoinASquad;
            })
          );
          setJoinSquadRequests(joinRequests);
  
          const addedRequests = await Promise.all(
            (notification.squadAddRequestsArray || []).map(async (requestId) => {
              const requestResult = await API.graphql(graphqlOperation(getRequestToBeAddedInASquad, { id: requestId }));
              return requestResult.data.getRequestToBeAddedInASquad;
            })
          );
          setAddedToSquadRequests(addedRequests);
        }
      } catch (error) {
        console.log('Error fetching squad requests:', error);
      }
    };
  
    if (user?.id) {
      fetchNotificationsAndRequests();
    }
  
    // // Subscriptions for new requests
    const createRequestToJoinSub = API.graphql(
      graphqlOperation(onCreateRequestToJoinASquad)
    ).subscribe({
      next: (data) => {
        const newRequest = data.value.data.onCreateRequestToJoinASquad;
        if (newRequest) {
          setJoinSquadRequests((prevRequests) => [...prevRequests, newRequest]);
        }
      },
      error: (error) => console.log('Error on create request to join squad subscription:', error),
    });
  
    const createRequestToBeAddedSub = API.graphql(
      graphqlOperation(onCreateRequestToBeAddedInASquad)
    ).subscribe({
      next: (data) => {
        const newRequest = data.value.data.onCreateRequestToBeAddedInASquad;
        if (newRequest) {
          setAddedToSquadRequests((prevRequests) => [...prevRequests, newRequest]);
        }
      },
      error: (error) => console.error('Error on create request to be added subscription:', error),
    });
  
    // Cleanup subscriptions
    return () => {
      createRequestToJoinSub.unsubscribe();
      createRequestToBeAddedSub.unsubscribe();
    };
  }, [user?.id]);
  
  

  // Combine the two lists of requests with headers
  const combinedData = [
    { type: 'header', title: 'Requests to Join Your Squad' },
    ...joinSquadRequests.map(item => ({ ...item, requestType: 'join' })),
    { type: 'header', title: 'Requests to Add You to Squads' },
    ...addedToSquadRequests.map(item => ({ ...item, requestType: 'add' })),
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionHeader}>{item.title}</Text>;
    }

    // Differentiate between join and added requests
    if (item.requestType === 'join') {
      return <RequestsToJoinUserSquadListItem item={item} removeRequestFromList={removeJoinRequest} />;
    }

    if (item.requestType === 'add') {
      return <RequestsToBeAddedInASquad item={item} removeRequestFromList={removeAddRequest} />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={combinedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || index.toString()} // Use index as fallback for headers
      contentContainerStyle={styles.listContent}
    />
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#1145FD',
  },
  listContent: {
    padding: 15,
    backgroundColor: '#F4F8FB',
  },
});

export default SquadActivityScreen;
