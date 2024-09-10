import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, deleteRequestToBeAddedInASquad, updateNotification, createSquadUser, updateSquad } from '../../graphql/mutations'
import { getSquad, getNotification, notificationsByUserID } from '../../graphql/queries'; // for fetching the squad
import { useUserContext } from '../../../UserContext'; // Import the user context to get the local user



const RequestsToBeAddedInASquad = ({ item, removeRequestFromList }) => {
  const { user, updateLocalUser } = useUserContext(); // Get local user

  const handleAccept = async () => {
    try {
      const userID = user.id;
      console.log("here is the user ID: ", userID);
      const squadID = item.squadID;
      const requestingUserID = item.requestingUserID;
      //console.log("here are the userID, requesting userId, and squadID:", userID, requestingUserID, squadID);
      
      const squadResult = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
      const squad = squadResult.data.getSquad;
      //console.log("here is the squad", squad);
      
      const updatedSquadJoinedID = [...(user.squadJoinedID || []), squadID];
      const updatedSquadJoined = [...(user.squadJoined || []), squad];
      const updatedNumOfSquadJoined = (user.numOfSquadJoined || 0) + 1;
      
      updateLocalUser({
        ...user,
        squadJoinedID: updatedSquadJoinedID,
        squadJoined: updatedSquadJoined,
        numOfSquadJoined: updatedNumOfSquadJoined,
      });
  
      const updateUserResults = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: userID,
            squadJoinedID: updatedSquadJoinedID,
            squadJoined: updatedSquadJoined,
            numOfSquadJoined: updatedNumOfSquadJoined,
          },
        })
      );
      //console.log("here is the update user results", updateUserResults);
      
      const updatedNumOfUsers = squad.numOfUsers + 1;
      const updateNumOfUserResults = await API.graphql(
        graphqlOperation(updateSquad, {
          input: {
            id: squadID,
            numOfUsers: updatedNumOfUsers,
          },
        })
      );
      //console.log("here is the updated num of users", updateNumOfUserResults);
  
      const createSquadUserResults = await API.graphql(
        graphqlOperation(createSquadUser, {
          input: {
            squadId: squadID,
            userId: userID,
          },
        })
      );
      //console.log("here is the squadusers creation results", createSquadUserResults);
      
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
  
      // Uncomment and ensure userID is passed if required
      if (notifications.length > 0) {
        const updatedRequestsArray = notifications[0].squadAddRequestsArray.filter(reqID => reqID !== item.id);
        const updateNotificationResults = await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: notifications[0].id,
              squadAddRequestsArray: updatedRequestsArray,
              userID: user.id,  // Pass `userID` if required
            },
          })
        );
        //console.log("here is the update notification results", updateNotificationResults);
      }
  
      removeRequestFromList(item.id);
      console.log("Request ID to be removed:", item.id);
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
        const notificationData = await API.graphql(graphqlOperation(notificationsByUserID, { id: user.id }));
        notifications = notificationData.data?.getNotification ? [notificationData.data.notificationsByUserID] : [];
        
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
    borderRadius: 25,
    borderColor: "#C2B960",
    borderWidth: 3,
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
