import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, deleteRequestToBeAddedInASquad, updateNotification, createSquadUser } from '../../graphql/mutations'
import { getSquad, getNotification } from '../../graphql/queries'; // for fetching the squad
import { useUserContext } from '../../../UserContext'; // Import the user context to get the local user



const RequestsToBeAddedInASquad = ({ item, removeRequestFromList }) => {
  const { user, updateLocalUser } = useUserContext(); // Get local user

  const handleAccept = async () => {
    try {
      const squadID = item.squadID; // Step 1: Get the squad ID

      // Step 2: Add the squad ID to the local user's `squadJoinedID` array
      const updatedSquadJoinedID = [...user.squadJoinedID, squadID];

      // Step 3: Get the squad details based on the squad ID (Step 5: get squad details)
      const squadResult = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
      const squad = squadResult.data.getSquad;

      // Add the squad itself to the user's `squadJoined` array (in addition to `squadJoinedID`)
      const updatedSquadJoined = [...user.squadJoined, squad];
      const updatedNumOfSquadJoined = user.numOfSquadJoined + 1;

      // Step 4: Update the local user locally with the new information
      updateLocalUser({
        ...user,
        squadJoinedID: updatedSquadJoinedID,
        squadJoined: updatedSquadJoined, // Update the squad array with the newly joined squad
        numOfSquadJoined: updatedNumOfSquadJoined,
      });

      // Step 4: Update the local user in the database with the new information
      await API.graphql(
        graphqlOperation(updateUser, {
          input: { id: user.id, squadJoinedID: updatedSquadJoinedID, squadJoined: updatedSquadJoined,  numOfSquadJoined: updatedNumOfSquadJoined, },
        })
      );

      // Step 6: Create the SquadUser using the squad ID and local user ID
      await API.graphql(
        graphqlOperation(createSquadUser, {
          input: {
            squadId: squadID,
            userId: user.id,
          },
        })
      );

      // Step 7: Handle notifications (fetch from backend if not available locally)
    let notifications = user.Notifications;

    if (!notifications || notifications.length === 0) {
      // Fetch notifications from backend if they are not in the local user data
      const notificationData = await API.graphql(graphqlOperation(getNotification, { id: user.id }));
      notifications = notificationData.data?.getNotification ? [notificationData.data.getNotification] : [];
      
      // Update the local user with the fetched notifications
      updateLocalUser({
        ...user,
        Notifications: notifications,
      });
    }

    if (notifications.length > 0) {
      // Now that we have the notifications, proceed to update the `squadAddRequestsArray`
      const updatedRequestsArray = notifications[0].squadAddRequestsArray.filter(
        (reqID) => reqID !== item.id
      );
      
      // Update the notification in the backend
      await API.graphql(
        graphqlOperation(updateNotification, {
          input: {
            id: notifications[0].id,
            squadAddRequestsArray: updatedRequestsArray,
          },
        })
      );
    }

    // Step 8: Delete the request
    await API.graphql(graphqlOperation(deleteRequestToBeAddedInASquad, { input: { id: item.id } }));

    // Step 9: Remove the request from the FlatList
    removeRequestFromList(item.id);
      // Step 8: Delete the request
      await API.graphql(graphqlOperation(deleteRequestToBeAddedInASquad, { input: { id: item.id } }));

      // Step 9: Remove the request from the FlatList
      removeRequestFromList(item.id);
    } catch (error) {
      console.log('Error accepting the request:', error);
    }
  };

  const handleIgnore = async () => {
    try {
      // Step 1: Fetch notifications if they don't exist in the local user context
      let notifications = user.Notifications;
  
      if (!notifications || notifications.length === 0) {
        // Fetch notifications from backend if they are not in the local user data
        const notificationData = await API.graphql(graphqlOperation(getNotification, { id: user.id }));
        notifications = notificationData.data?.getNotification ? [notificationData.data.getNotification] : [];
        
        // Update the local user with the fetched notifications
        updateLocalUser({
          ...user,
          Notifications: notifications,
        });
      }
  
      if (notifications.length > 0) {
        // Step 2: Remove the ID from the notification's squadAddRequestsArray
        const updatedRequestsArray = notifications[0].squadAddRequestsArray.filter(
          (reqID) => reqID !== item.id
        );
        
        // Update the notification in the backend
        await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: notifications[0].id,
              squadAddRequestsArray: updatedRequestsArray,
            },
          })
        );
      }
  
      // Step 3: Delete the request
      await API.graphql(
        graphqlOperation(deleteRequestToBeAddedInASquad, { input: { id: item.id } })
      );
  
      // Step 4: Remove the request from the flatlist
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

export default RequestsToBeAddedInASquad;
