import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateNotification, deletePollRequest } from '../../graphql/mutations';  // Mutations
import { getPoll, notificationsByUserID } from '../../graphql/queries';  // Queries
import { useUserContext } from '../../../UserContext';
import ResponsePollSCreen from '../../screens/ResponsePollScreen'


const PollRequestListItem = ({ item, removeRequestFromList }) => {
  const { user, updateLocalUser } = useUserContext();
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollData, setPollData] = useState(null); // Store the poll data

  // Function to handle accepting the poll request
  const handleAccept = async () => {
    try {
      const requestingUserID = item.userID;
      const pollID = item.ParentPollID;

      // Fetch poll details
      const pollResult = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
      setPollData(pollResult.data.getPoll);  // Store the poll data

      // Show the poll modal after accepting the request
      setShowPollModal(true);

    } catch (error) {
      console.log('Error accepting the poll request:', error);
    }
  };


 
 // Function to handle ignoring the poll request
 const handleIgnore = async () => {
  try {
    const userID = user.id;
    let notifications = user.Notifications;

    // Fetch notifications if not available in local user data
    if (!notifications || notifications.length === 0) {
      const notificationData = await API.graphql(graphqlOperation(notificationsByUserID, { userID }));
      notifications = notificationData.data?.notificationsByUserID?.items || [];
      updateLocalUser({
        ...user,
        Notifications: notifications,
      });
    }

    // Step 1: Remove the poll request ID from the notification's `pollRequestsArray`
    if (notifications.length > 0) {
      const updatedRequestsArray = notifications[0].pollRequestsArray.filter(
        (reqID) => reqID !== item.id
      );

      // Step 2: Update the notification
      await API.graphql(
        graphqlOperation(updateNotification, {
          input: {
            id: notifications[0].id,
            pollRequestsArray: updatedRequestsArray,
          },
        })
      );
    }
         // Step 3: Delete the poll request
         await API.graphql(graphqlOperation(deletePollRequest, { input: { id: item.id } }));

         // Step 4: Remove the request from the FlatList
         removeRequestFromList(item.id);
   
       } catch (error) {
         console.log('Error ignoring the poll request:', error);
       }
     };


  return (
    <View style={styles.container}>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={handleAccept} color="#1145FD" />
        <Button title="Ignore" onPress={handleIgnore} color="#1145FD" />
      </View>

      {/* Modal for displaying poll */}
      <Modal
        visible={showPollModal}
        animationType="slide"
        onRequestClose={() => setShowPollModal(false)}
      >
        {pollData && (
          <ResponsePollSCreen poll={pollData} onClose={() => setShowPollModal(false)} />
        )}
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowPollModal(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
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
  closeButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
    margin: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PollRequestListItem;