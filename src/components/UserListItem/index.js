import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Button } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNotification, createRequestToBeAddedInASquad, updateNotification } from '../../graphql/mutations';
import { useUserContext } from '../../../UserContext';
import { getUser, notificationsByUserID } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { graphql } from 'graphql';

const UserListItem = ({ user }) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(null);
  const [currentUserID, setCurrentUserID] = useState('');
  const [currentUserHasNotification, setCurrentUserHasNotifications] = useState(false);
  const [currentUserNotificationID, setCurrentUserNotificationID] = useState('');
  const [existingRequestsToBeAddedInASquadArr, setExistingRequestsToBeAddedInASquadArr] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [squads, setSquads] = useState([]);
  const { user: localUser } = useUserContext();

  useEffect(() => {
    if (localUser) {
      console.log("here is the local user: ", localUser)
      const results =  API.graphql(graphqlOperation(getUser,{input: localUser.id}))
      
      setLocalUserInfo(localUser);
    }
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
      const newNotificationID = results.data?.createNotification.id;
      setCurrentUserNotificationID(newNotificationID);
      setCurrentUserHasNotifications(true);
      return newNotificationID;
    } catch (error) {
      console.log("Error creating notification", error);
      return false;
    }
  };

  const handleRequestCreation = async (notificationID, selectedSquads) => {
    try {
      const requestPromises = selectedSquads.map(async (squadID) => {
        const message = `${localUserInfo.name} has requested to add you to their Squad, ${squadID}`;
        const results = await API.graphql(
          graphqlOperation(createRequestToBeAddedInASquad, {
            input: {
              notificationID,
              requestingUserID: localUserInfo.id,
              squads: [squadID],
              message,
            },
          })
        );
        return results.data?.createRequestToBeAddedInASquad.id;
      });

      const requestIDs = await Promise.all(requestPromises);
      return requestIDs;
    } catch (error) {
      console.log("Error creating request to be added in squad", error);
      return [];
    }
  };

  const handleUpdateNotification = async (updatedArray) => {
    try {
      await API.graphql(
        graphqlOperation(updateNotification, {
          input: { id: currentUserNotificationID, squadAddRequestsArray: updatedArray },
        })
      );
    } catch (error) {
      console.log("Error updating notification", error);
    }
  };

  const handleAddUserToSquad = () => {
    setModalVisible(true);
  };

  const handleSquadsSelected = async (selectedSquads) => {
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
  };

  const handleUserNavigation = () => {
    navigation.navigate("UserDisplayScreen", { user });
  };

  const renderSquadItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.squadItem, squads.includes(item.id) && styles.selectedSquadItem]}
      onPress={() => setSquads((prev) => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}
    >
      <Text style={styles.squadName}>{item.squadName}</Text>
    </TouchableOpacity>
  );

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
            style={[selected ? styles.unAddedUserIcon : styles.addedUserIcon]}
            onPress={handleAddUserToSquad}
          >
            {!selected ? (
              <AntDesign name="addusergroup" size={27} color="white" style={{ marginBottom: 5, marginLeft:30, marginTop: 5}} />
            ) : (
              <SimpleLineIcons name="user-following" size={20} color="#1145FD" style={{ marginBottom: 6 }} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Squads</Text>
            <FlatList
              data={squads} // Replace this with your squads data
              renderItem={renderSquadItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Confirm Selection" onPress={() => handleSquadsSelected(squads)} />
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
  addedUserIcon: {
    height: 40,
    width: 95,
    backgroundColor: "#1145FD",
    borderRadius: 17,
    borderColor: "#FFFF",
    borderWidth: 2.5,
    marginRight: 10
  },
  unAddedUserIcon: {
    height: 40,
    width: 95,
    backgroundColor: "white",
    borderRadius: 17,
    borderColor: "#1145FD",
    borderWidth: 2.5,
    marginLeft: 25,
    
  },

    unAddedUserIcon: {
      height: 40,
      width: 95,
      backgroundColor: "white",
      borderRadius: 17,
      borderColor: "#1145FD",
      borderWidth: 2.5,
      marginLeft: 25,
      marginTop: -10, // Adjust this value to move the button up
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
