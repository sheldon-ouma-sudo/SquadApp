import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, deleteRequestToJoinASquad, createSquadUser, updateNotification } from '../../graphql/mutations';
import { getUser, getSquad, getNotification, notificationsByUserID } from '../../graphql/queries';
import { useUserContext } from '../../../UserContext';

const RequestsToJoinUserSquadListItem = ({ item, removeRequestFromList }) => {
  const { user, updateLocalUser } = useUserContext();

  const handleAccept = async () => {
    try {
      const userID = user.id;
      const requestingUserID = item.requestingUserID; // Get requesting user's ID
      const squadID = item.squadID; // Get the squad ID
      
      // Fetch requesting user's details
      const requestingUserData = await API.graphql(graphqlOperation(getUser, { id: requestingUserID }));
      const requestingUser = requestingUserData.data.getUser;
      // Update requesting user's squad arrays
      const updatedSquadJoinedID = [...(requestingUser.squadJoinedID || []), squadID];
      const squadResult = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
      const squad = squadResult.data.getSquad;
      const updatedSquadJoined = [...(requestingUser.squadJoined || []), squad];
      const updatedNumOfSquadJoined = (requestingUser.numOfSquadJoined || 0) + 1;
      // Update requesting user in database
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: requestingUserID,
            squadJoinedID: updatedSquadJoinedID,
            squadJoined: updatedSquadJoined,
            numOfSquadJoined: updatedNumOfSquadJoined,
          },
        })
      );

      // Create the SquadUser
      await API.graphql(
        graphqlOperation(createSquadUser, {
          input: {
            squadId: squadID,
            userId: requestingUserID,
          },
        })
      );

      
      let notifications = user.Notifications;
      if (!notifications || notifications.length === 0) {
        const notificationData = await API.graphql(
          graphqlOperation(notificationsByUserID, { userID })  // Ensure correct variable name
        ); 
        notifications = notificationData.data?.notificationsByUserID?.items || [];
        updateLocalUser({
          ...user,
          Notifications: notifications,
        });
      }
  
      // Update notification to remove the request
      if (notifications.length > 0 && notifications[0]?.SquadJoinRequestArray) {
        const updatedRequestsArray = notifications[0].SquadJoinRequestArray.filter((reqID) => reqID !== item.id);

        await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: notifications[0].id,
              SquadJoinRequestArray: updatedRequestsArray,
            },
          })
        );
      }

      // Delete the request
      await API.graphql(graphqlOperation(deleteRequestToJoinASquad, { input: { id: item.id } }));

      // Remove request from FlatList
      removeRequestFromList(item.id);
    } catch (error) {
      console.log('Error accepting the request:', error);
    }
  };

  const handleIgnore = async () => {
    try {
      const userID = user.id
      // Fetch notifications if not available in local user data
      let notifications = user.Notifications;
      if (!notifications || notifications.length === 0) {
        const notificationData = await API.graphql(
          graphqlOperation(notificationsByUserID, { userID })  // Ensure correct variable name
        );
        notifications = notificationData.data?.notificationsByUserID?.items || [];
        updateLocalUser({
          ...user,
          Notifications: notifications,
        });
      }
  

      // Step 1: Remove the request ID from the notification's `SquadJoinRequestArray`
      if (notifications.length > 0) {
        const updatedRequestsArray = notifications[0].SquadJoinRequestArray.filter(
          (reqID) => reqID !== item.id
        );

        await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: notifications[0].id,
              SquadJoinRequestArray: updatedRequestsArray,
            },
          })
        );
      }

      // Step 2: Delete the request
      await API.graphql(graphqlOperation(deleteRequestToJoinASquad, { input: { id: item.id } }));

      // Step 3: Remove the request from the FlatList
      removeRequestFromList(item.id);
    } catch (error) {
      console.log('Error ignoring the request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={handleAccept} color="#1145FD" />
        <Button title="Ignore" onPress={handleIgnore} color="#1145FD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RequestsToJoinUserSquadListItem;
