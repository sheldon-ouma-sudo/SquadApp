import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Button } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNotification, createRequestToBeAddedInASquad, updateNotification } from '../../graphql/mutations';
import { useUserContext } from '../../../UserContext';
import { getUser, notificationsByUserID } from '../../graphql/queries';
import { getSquad } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Alert } from 'react-native';


const UserListItem = ({ user, onUserAddedToSquad }) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(null);
  const [currentUserID, setCurrentUserID] = useState('');
  const [currentUserHasNotification, setCurrentUserHasNotifications] = useState(false);
  const [currentUserNotificationID, setCurrentUserNotificationID] = useState('');
  const [existingRequestsToBeAddedInASquadArr, setExistingRequestsToBeAddedInASquadArr] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [squads, setSquads] = useState([]);
  const [selectedSquads, setSelectedSquads] = useState([]); 
  const { user: localUser } = useUserContext();

    // Fetch squads for the local user
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localUser) {
          // console.log("here is the local user", localUser);
          setLocalUserInfo(localUser);

          const allSquads = [];

          // Fetch Primary Squad
          const primaryUserSquadID = localUser.userPrimarySquad[0];
          if (primaryUserSquadID) {
            try {
              const primaryResults = await API.graphql(graphqlOperation(getSquad, { id: primaryUserSquadID }));
              const primarySquad = primaryResults.data?.getSquad;
              // console.log("here is the primary squad", primarySquad)
              if (primarySquad) {
                allSquads.push(primarySquad); // Add the primary squad to the list
              }
            } catch (error) {
              console.log("Error getting user primary squad", error);
            }
          }

          // Fetch Non-Primary Squads
          const userID = localUser.id;
          const userResults = await API.graphql(graphqlOperation(getUser, { id: userID }));
          const nonPrimarySquadArr = userResults.data?.getUser?.nonPrimarySquadsCreated || [];

          if (nonPrimarySquadArr.length > 0) {
            const squadPromises = nonPrimarySquadArr.map(async (squadCreatedID) => {
              try {
                const squadResults = await API.graphql(graphqlOperation(getSquad, { id: squadCreatedID }));
                const nonPrimarySquad = squadResults.data?.getSquad;
                if (nonPrimarySquad) {
                  allSquads.push(nonPrimarySquad); // Add non-primary squads to the list
                }
              } catch (error) {
                console.log("Error querying squads", error);
              }
            });

            // Wait for all promises to resolve
            await Promise.all(squadPromises);
          }

          // Set all squads (both primary and non-primary)
          // console.log("here is the all squads", allSquads)
          setSquads(allSquads);
        }
      } catch (error) {
        console.log("There is an error", error);
      }
    };

    fetchData();
  }, [localUser]);



  useEffect(() => {
    const fetchCurrentUserData = async () => {
      if (user) {
        // console.log("here is the current user", user)
        setCurrentUserID(user.id);
        try {
          const notificationQueryResult = await API.graphql(
            graphqlOperation(notificationsByUserID, { userID: user.id })
          );
          const notifications = notificationQueryResult.data?.notificationsByUserID.items;

          if (notifications?.length > 0) {
            setCurrentUserNotificationID(notifications[0].id);
            setCurrentUserHasNotifications(true);
            setExistingRequestsToBeAddedInASquadArr(notifications[0].squadAddRequestsArray || []);
          } else {
            setCurrentUserHasNotifications(false);
          }
        } catch (error) {
          console.log("Error fetching current user's notification data", error);
        }
      }
    };

    fetchCurrentUserData();
  }, [user]);

  const handleNotificationCreation = async () => {
    try {
      const results = await API.graphql(
        graphqlOperation(createNotification, { input: { userID: currentUserID } })
      );
      const newNotificationID = results.data?.createNotification?.id;
      if (!newNotificationID) {
        console.log("Notification creation failed. No ID returned.");
      }
      setCurrentUserNotificationID(newNotificationID); // Ensure this is set
      setCurrentUserHasNotifications(true);
      return newNotificationID;
    } catch (error) {
      console.log("Error creating notification", error);
      return false;
    }
  };
  
  const handleRequestCreation = async (notificationID, selectedSquads) => {
    const squadIDArray = [];
    console.log("here are the selected squads", selectedSquads)
    try {
      const requestPromises = selectedSquads.map(async (squadID) => {
        try {
          // Fetch the squad details to get the squadName
          const squadResults = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
          const squadName = squadResults.data?.getSquad?.squadName;
  
          // Modify the message to include the squad name
          const message = `${localUserInfo.name} has requested to add you to their Squad, ${squadName}`;
  
          // Store squadID in the array
          squadIDArray.push(squadID);
  
          // Create the request
          const results = await API.graphql(
            graphqlOperation(createRequestToBeAddedInASquad, {
              input: {
                notificationID,
                requestingUserID: localUserInfo.id,
                squads: squadIDArray, // Updated to use the accumulated squadIDArray
                message: message,
                squadID: squadID
              },
            })
          );
          return results.data?.createRequestToBeAddedInASquad.id;
        } catch (error) {
          console.log(`Error fetching squad or creating request for squad ID ${squadID}:`, error);
          return null;
        }
      });
  
      const requestIDs = await Promise.all(requestPromises);
      return requestIDs.filter((id) => id !== null); // Filter out any null values in case of errors
    } catch (error) {
      console.log("Error creating request to be added in squad", error);
      return [];
    }
  };
  
  const handleUpdateNotification = async (updatedArray) => {
    if (!currentUserNotificationID) {
      console.log("Error: currentUserNotificationID is missing");
      return;
    }
    
    try {
      const results = await API.graphql(
        graphqlOperation(updateNotification, {
          input: { id: currentUserNotificationID, squadAddRequestsArray: updatedArray },
        })
      );
      // console.log("Notification updated successfully✅", results);
    } catch (error) {
      console.log("Error updating notification", error);
    }
  };

  const handleAddUserToSquad = () => {
    setModalVisible(true);
  };

  const handleSquadsSelected = async (selectedSquads) => {
    const selectedUserSquadJoinedID = user.squadJoinedID || [];

    // Check if any of the selected squads are already in the user's squadJoinedID
    const alreadyInSquad = selectedSquads.some((squadID) => selectedUserSquadJoinedID.includes(squadID));
  
    if (alreadyInSquad) {
      // Show an alert if the user is already in the selected squad
      Alert.alert('Already in Squad', 'The user is already a member of the selected squad.');
      return; // Prevent the request creation if the user is already in the squad
    }
    if (!currentUserHasNotification) {
      const newNotificationID = await handleNotificationCreation();
      if (newNotificationID) {
        const requestIDs = await handleRequestCreation(newNotificationID, selectedSquads);
        if (requestIDs.length > 0) {
          const updatedArray = [...existingRequestsToBeAddedInASquadArr, ...requestIDs];
          await handleUpdateNotification(updatedArray);
          setSelected(true);
        }
      }
    } else {
      const requestIDs = await handleRequestCreation(currentUserNotificationID, selectedSquads);
      if (requestIDs.length > 0) {
        const updatedArray = [...existingRequestsToBeAddedInASquadArr, ...requestIDs];
        await handleUpdateNotification(updatedArray);
        setSelected(true);
      }
    }
    setModalVisible(false); // Close modal after selection
    onUserAddedToSquad(user.id);
  };

  const handleUserNavigation = () => {
    navigation.navigate("UserDisplayScreen", { user });
  };
  const toggleSelectSquad = (squadID) => {
    setSelectedSquads((prevSelected) =>
      prevSelected.includes(squadID)
        ? prevSelected.filter((id) => id !== squadID)
        : [...prevSelected, squadID]
    );
  };

  const renderSquadItem = ({ item }) => {
    // Ensure the item exists and has an ID
    if (!item || !item.id) {
      return null;
    }

    return (
      <TouchableOpacity
        style={[styles.squadItem, selectedSquads.includes(item.id) && styles.selectedSquadItem]}
        onPress={() => toggleSelectSquad(item.id)}
      >
        <Text style={styles.squadName}>{item.squadName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleUserNavigation}>
        <View style={styles.userImageContainer}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode='contain'
            style={styles.userImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity
            style={[selected ? styles.addedUserIcon : styles.unAddedUserIcon]}
            onPress={handleAddUserToSquad}
          >
            {!selected ? (
              <AntDesign name="addusergroup" size={27} color="white" style={{ marginBottom: 5, marginLeft:30, marginTop: 5}} />
            ) : (
              <SimpleLineIcons name="user-following" size={20} color="#1145FD" style={{ marginBottom: 6, marginLeft:30, marginTop: 5}} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Squads</Text>
            <FlatList
              data={squads.filter(squad => squad && squad.id)} // Ensure squads are valid
              renderItem={renderSquadItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Confirm Selection" onPress={() => handleSquadsSelected(selectedSquads)} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 20,
    borderColor: "#C2B960",
    borderRadius: 28,
    backgroundColor: "white",
    borderWidth: 4,
    marginRight: 30,
  },
  userImageContainer: {
    marginStart: 10,
  },
  userImage: {
    width: 50,
    height: 70,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 5,
    justifyContent: "space-between", // Add this line to evenly distribute space between elements
    alignItems: "center", // Center the content vertically
    flex: 1, // Make the details container take all available space
  },
  userName: {
    fontWeight: '500',
    marginLeft: 5,
    marginTop: -20
  },
  unAddedUserIcon: {
    height: 40,
    width: 95,
    backgroundColor: "#1145FD",
    borderRadius: 17,
    borderColor: "#FFFF",
    borderWidth: 2.5,
    marginRight: 10,
    marginLeft: 25,
    marginTop: -10,
  },
  addedUserIcon: {
    height: 40,
    width: 95,
    backgroundColor: "white",
    borderRadius: 17,
    borderColor: "#1145FD",
    borderWidth: 2.5,
    marginLeft: 25,
    marginRight: 10,
    marginTop: -10,
    
  },

  //   unAddedUserIcon: {
  //     height: 40,
  //     width: 95,
  //     backgroundColor: "white",
  //     borderRadius: 17,
  //     borderColor: "#1145FD",
  //     borderWidth: 2.5,
  //     marginLeft: 25,
  //     marginTop: -10, // Adjust this value to move the button up
    
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%', // Use a percentage to make the modal wider
    height: '80%', // Increase the height of the modal
    padding: 20, // You can adjust padding as necessary
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Align the title in the center
  },
  squadItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedSquadItem: {
    backgroundColor: '#ddd',
  },
  squadName: {
    fontSize: 16,
  },
});

export default UserListItem;
