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
      const userID = user.id
      const squadID = item.squadID; // Get the squad ID
      const requestingUserID = item.requestingUserID; // Get the ID of the user who sent the request
      console.log("here are the requesting requesting user Id and squad ID",userID, requestingUserID,squadID )
      // Step 1: Get the squad details
      const squadResult = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
      const squad = squadResult.data.getSquad;
      console.log("here is the squad", squad)
      // Step 2: Update the local user's squads
      const updatedSquadJoinedID = [...(user.squadJoinedID || []), squadID]; 
      console.log("here is the update squad joined ID things: ",updatedSquadJoinedID)
      const updatedSquadJoined = [...(user.squadJoined || []), squad];
      console.log("here is the update squad joined things: ",updatedSquadJoined, )
      const updatedNumOfSquadJoined = (user.numOfSquadJoined || 0) + 1;
      console.log("here is the num of squad joined things: ",updatedNumOfSquadJoined )
     
      updateLocalUser({
        ...user,
        squadJoinedID: updatedSquadJoinedID,
        squadJoined: updatedSquadJoined,
        numOfSquadJoined: updatedNumOfSquadJoined,
      });

     const updateUserResults =  await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: userID,
            squadJoinedID: updatedSquadJoinedID,
            squadJoined: updatedSquadJoined,
            numOfSquadJoined: updatedNumOfSquadJoined,
          },
        })
      );
 console.log("here is the update user results", updateUserResults)
      //step 3 should be updating the squad
      //update the number of squad users
      // Step 3: Update the squad to increase the number of users in the squad
      const updatedNumOfUsers = squad.numOfUsers + 1;

      const updateNumOfUserResults =   await API.graphql(
      graphqlOperation(updateSquad, {
      input: {
      id: squadID,
      numOfUsers: updatedNumOfUsers,
      // Add any other fields you want to update in the squad
    },
  })
);
 console.log("here is the updated num of users", updateNumOfUserResults)

      // Step 4: Add the requesting user to the SquadUser table
      const createSquadUserResults = await API.graphql(
        graphqlOperation(createSquadUser, {
          input: {
            squadId: squadID,
            userId: userID,
          },
        })
      );
console.log("here is the squadusers creation results", createSquadUserResults)
      // Step 5: Fetch notifications for the local user (if not available locally)
      let notifications = user.Notifications;
      if (!notifications || notifications.length === 0) {
        const notificationData = await API.graphql(graphqlOperation(notificationsByUserID, { id: userID}));
        notifications = notificationData.data?.getNotification ? [notificationData.data.notificationsByUserID] : [];
        updateLocalUser({
          ...user,
          Notifications: notifications,
        });
      }

      // Step 6: Update the notification by removing the request ID from the `squadAddRequestsArray`
      if (notifications.length > 0) {
        const updatedRequestsArray = notifications[0].squadAddRequestsArray.filter((reqID) => reqID !== item.id);
       const updateNotificationResults =  await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: notifications[0].id,
              squadAddRequestsArray: updatedRequestsArray,
            },
          })
        );
        console.log("here is the update notification results",updateNotificationResults  )
      }

      // Step 7: Delete the request to join the squad
      //await API.graphql(graphqlOperation(deleteRequestToBeAddedInASquad, { input: { id: item.id } }));

      // Step 8: Remove the request from the FlatList
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
