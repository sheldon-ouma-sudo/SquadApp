import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID, getPollRequest, getPollResponse } from '../graphql/queries';  // Import the queries
import { onCreatePollRequest, onCreatePollResponse, onUpdatePollRequest, onUpdatePollResponse, onDeletePollRequest, onDeletePollResponse } from '../graphql/subscriptions';
import PollRequestListItem from '../components/PollRequestListItem'; // Component to display poll request item
import PollResponseListItem from '../components/PollResponseListItem'; // Component to display poll response item
import { useUserContext } from '../../UserContext';

const PollActivityScreen = () => {
  const { user } = useUserContext();  // Get current user from context
  const [pollRequests, setPollRequests] = useState([]); // Hold poll requests
  const [pollResponses, setPollResponses] = useState([]); // Hold poll responses

  // Function to remove a poll request from the list
  const removePollRequest = (id) => {
    setPollRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  // Function to remove a poll response from the list
  const removePollResponse = (id) => {
    setPollResponses((prevResponses) =>
      prevResponses.filter((response) => response.id !== id)
    );
  };

  useEffect(() => {
    const fetchNotificationsAndRequests = async () => {
      try {
       
        const notificationData = await API.graphql(graphqlOperation(notificationsByUserID, { userID: user.id }));
        // console.log("here is the notificationData", notificationData)
        const notifications = notificationData?.data?.notificationsByUserID?.items;
        // console.log("here are the notification", notifications)
        if (notifications && notifications.length > 0) {
          const notification = notifications[0];

          // Fetch Poll Requests
          const requests = await Promise.all(
            (notification.pollRequestsArray || []).map(async (requestId) => {
              const requestResult = await API.graphql(graphqlOperation(getPollRequest, { id: requestId }));
              return requestResult.data.getPollRequest;
            })
          );
          // console.log("heare are the requests", requests)
          setPollRequests(requests);

          // Fetch Poll Responses
          const responses = await Promise.all(
            (notification.pollResponsesArray || []).map(async (responseId) => {
              const responseResult = await API.graphql(graphqlOperation(getPollResponse, { id: responseId }));
              return responseResult.data.getPollResponse;
            })
          );
          setPollResponses(responses);
        }
      } catch (error) {
        console.log('Error fetching poll requests and responses:', error);
      }
    };

    if (user?.id) {
      fetchNotificationsAndRequests();
    }

  //   // Subscriptions for new poll requests
    const createPollRequestSub = API.graphql(
      graphqlOperation(onCreatePollRequest)
    ).subscribe({
      next: (data) => {
        const newRequest = data.value.data.onCreatePollRequest;
        if (newRequest) {
          setPollRequests((prevRequests) => [...prevRequests, newRequest]);
        }
      },
      error: (error) => console.log('Error on create poll request subscription:', error),
    });

    const updatePollRequestSub = API.graphql(
      graphqlOperation(onUpdatePollRequest)
    ).subscribe({
      next: (data) => {
        const updatedRequest = data.value.data.onUpdatePollRequest;
        setPollRequests((prevRequests) =>
          prevRequests.map((request) => (request.id === updatedRequest.id ? updatedRequest : request))
        );
      },
      error: (error) => console.log('Error on update poll request subscription:', error),
    });

    const deletePollRequestSub = API.graphql(
      graphqlOperation(onDeletePollRequest)
    ).subscribe({
      next: (data) => {
        const deletedRequest = data.value.data.onDeletePollRequest;
        removePollRequest(deletedRequest.id);
      },
      error: (error) => console.log('Error on delete poll request subscription:', error),
    });

    // Subscriptions for new poll responses
    const createPollResponseSub = API.graphql(
      graphqlOperation(onCreatePollResponse)
    ).subscribe({
      next: (data) => {
        const newResponse = data.value.data.onCreatePollResponse;
        if (newResponse) {
          setPollResponses((prevResponses) => [...prevResponses, newResponse]);
        }
      },
      error: (error) => console.log('Error on create poll response subscription:', error),
    });

    const updatePollResponseSub = API.graphql(
      graphqlOperation(onUpdatePollResponse)
    ).subscribe({
      next: (data) => {
        const updatedResponse = data.value.data.onUpdatePollResponse;
        setPollResponses((prevResponses) =>
          prevResponses.map((response) => (response.id === updatedResponse.id ? updatedResponse : response))
        );
      },
      error: (error) => console.log('Error on update poll response subscription:', error),
    });

    const deletePollResponseSub = API.graphql(
      graphqlOperation(onDeletePollResponse)
    ).subscribe({
      next: (data) => {
        const deletedResponse = data.value.data.onDeletePollResponse;
        removePollResponse(deletedResponse.id);
      },
      error: (error) => console.log('Error on delete poll response subscription:', error),
    });

    // Cleanup subscriptions
    return () => {
      createPollRequestSub.unsubscribe();
      updatePollRequestSub.unsubscribe();
      deletePollRequestSub.unsubscribe();
      createPollResponseSub.unsubscribe();
      updatePollResponseSub.unsubscribe();
      deletePollResponseSub.unsubscribe();
     };
  }, [user?.id]);

  // Combine the two lists of requests with headers
  const combinedData = [
    { type: 'header', title: 'Poll Requests' },
    ...pollRequests.map(item => ({ ...item, requestType: 'pollRequest' })),
    { type: 'header', title: 'Poll Responses' },
    ...pollResponses.map(item => ({ ...item, requestType: 'pollResponse' })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionHeader}>{item.title}</Text>;
    }
  
    // Differentiate between poll requests and responses
    if (item.requestType === 'pollRequest') {
      return <PollRequestListItem item={item} removeRequestFromList={removePollRequest} />;
    }
  
    if (item.requestType === 'pollResponse') {
      return <PollResponseListItem item={item} removeResponseFromList={removePollResponse} />;
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

export default PollActivityScreen;
