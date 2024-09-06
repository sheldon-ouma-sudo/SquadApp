import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, deleteRequestToJoinASquad, createSquadUser, updateNotification } from '../../graphql/mutations';
import { getUser, getSquad, getNotification } from '../../graphql/queries';
import { useUserContext } from '../../../UserContext';

const RequestsToJoinUserSquadListItem = ({ item, removeRequestFromList }) => {
  const { user, updateLocalUser } = useUserContext();

  const handleAccept = async () => {
    try {
      const requestingUserID = item.requestingUserID; // Step 1: Get the requesting user's ID
      const squadID = item.squadID; // Step 2: Get the squad ID

      // Step 3: Get the requesting user's details
      const requestingUserData = await API.graphql(graphqlOperation(getUser, { id: requestingUserID }));
      const requestingUser = requestingUserData.data.getUser;

      // Step 4: Add the squad ID to the requesting user's `squadJoinedID`
      const updatedSquadJoinedID = [...requestingUser.squadJoinedID, squadID];

      // Step 5: Fetch the squad details
      const squadResult = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
      const squad = squadResult.data.getSquad;

      // Step 6: Add the squad itself to the requesting user's `squadJoined` array
      const updatedSquadJoined = [...requestingUser.squadJoined, squad];

      // Step 7: Increment the number of squads joined by the requesting user
      const updatedNumOfSquadJoined = requestingUser.numOfSquadJoined + 1;

      // Step 8: Update the requesting user in the database
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

      // Step 9: Create the SquadUser using the squad ID and requesting user ID
      await API.graphql(
        graphqlOperation(createSquadUser, {
          input: {
            squadId: squadID,
            userId: requestingUserID,
          },
        })
      );

      // Step 10: Remove the request ID from the notification's `SquadJoinRequestArray`
      let notifications = user.Notifications;

      if (!notifications || notifications.length === 0) {
        const notificationData = await API.graphql(graphqlOperation(getNotification, { id: user.id }));
        notifications = notificationData.data?.getNotification ? [notificationData.data.getNotification] : [];

        // Update local user with fetched notifications
        updateLocalUser({
          ...user,
          Notifications: notifications,
        });
      }

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

      // Step 11: Delete the request
      await API.graphql(graphqlOperation(deleteRequestToJoinASquad, { input: { id: item.id } }));

      // Step 12: Remove the request from the FlatList
      removeRequestFromList(item.id);
    } catch (error) {
      console.log('Error accepting the request:', error);
    }
  };

  const handleIgnore = async () => {
    try {
      // Fetch notifications if not available in local user data
      let notifications = user.Notifications;

      if (!notifications || notifications.length === 0) {
        const notificationData = await API.graphql(graphqlOperation(getNotification, { id: user.id }));
        notifications = notificationData.data?.getNotification ? [notificationData.data.getNotification] : [];

        // Update local user with fetched notifications
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
