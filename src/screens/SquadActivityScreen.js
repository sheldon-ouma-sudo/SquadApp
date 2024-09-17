import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID, getRequestToBeAddedInASquad, getRequestToJoinASquad } from '../graphql/queries';  // Import the queries
import { onCreateRequestToJoinASquad, onCreateRequestToBeAddedInASquad, onDeleteRequestToBeAddedInASquad } from '../graphql/subscriptions';
import RequestsToJoinUserSquadListItem from '../components/RequestsToJoinUserSquadListItem';
import RequestsToBeAddedInASquad from '../components/RequestsToBeAddedInASquad';
import { useUserContext } from '../../UserContext';

const SquadActivityScreen = () => {
  const { user } = useUserContext();
  const [joinSquadRequests, setJoinSquadRequests] = useState([]);
  const [addedToSquadRequests, setAddedToSquadRequests] = useState([]);

  const removeJoinRequest = (id) => {
    setJoinSquadRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  const removeAddRequest = (id) => {
    setAddedToSquadRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
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
              const request = requestResult.data?.getRequestToJoinASquad;
              return request?.requestingUserID !== user.id ? request : null;
            })
          );
          setJoinSquadRequests(joinRequests.filter(Boolean));

          const addedRequests = await Promise.all(
            (notification.squadAddRequestsArray || []).map(async (requestId) => {
              const requestResult = await API.graphql(graphqlOperation(getRequestToBeAddedInASquad, { id: requestId }));
              const request = requestResult.data?.getRequestToBeAddedInASquad;
              return request?.requestingUserID !== user.id ? request : null;
            })
          );
          setAddedToSquadRequests(addedRequests.filter(Boolean));
        }
      } catch (error) {
        console.log('Error fetching squad requests:', error);
      }
    };

    if (user?.id) {
      fetchNotificationsAndRequests();
    }

    const createRequestToJoinSub = API.graphql(graphqlOperation(onCreateRequestToJoinASquad)).subscribe({
      next: (data) => {
        const newRequest = data.value.data.onCreateRequestToJoinASquad;
        if (newRequest && newRequest.requestingUserID !== user.id) {
          setJoinSquadRequests((prevRequests) => [...prevRequests, newRequest]);
        }
      },
      error: (error) => console.log('Error on create request to join squad subscription:', error),
    });

    const createRequestToBeAddedSub = API.graphql(graphqlOperation(onCreateRequestToBeAddedInASquad)).subscribe({
      next: (data) => {
        const newRequest = data.value.data.onCreateRequestToBeAddedInASquad;
        if (newRequest && newRequest.requestingUserID !== user.id) {
          setAddedToSquadRequests((prevRequests) => [...prevRequests, newRequest]);
        }
      },
      error: (error) => console.error('Error on create request to be added subscription:', error),
    });

    return () => {
      createRequestToJoinSub.unsubscribe();
      createRequestToBeAddedSub.unsubscribe();
    };
  }, [user?.id]);

  const combinedData = [
    { type: 'header', title: 'Requests to Join Your Squad' },
    ...joinSquadRequests.map((item, index) => ({ ...item, requestType: 'join', uniqueKey: `join-${item.id || index}` })),
    { type: 'header', title: 'Requests to Add You to Squads' },
    ...addedToSquadRequests.map((item, index) => ({ ...item, requestType: 'add', uniqueKey: `add-${item.id || index}` })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionHeader}>{item.title}</Text>;
    }

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
        keyExtractor={(item) => item.uniqueKey} // Ensure unique keys
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
