import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createNotification, createRequestToJoinASquad, createSquadUser, updateNotification, updateUser } from "../../graphql/mutations";
import { graphqlOperation, Auth, API } from 'aws-amplify';
import { notificationsByUserID } from "../../graphql/queries";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUser } from "../../graphql/queries";

dayjs.extend(relativeTime);

const SquadListItem = ({ squad, userInfo, onRequestSent }) => { // Add onRequestSent prop
  const navigation = useNavigation();
  const [squadSelected, setSquadSelected] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserHasNotification, setCurrentUserHasNotifications] = useState(false);
  const [currentUserNotificationID, setCurrentUserNotificationID] = useState("");
  const [existingJoinCurrentUserASquadArr, setExistingJoinCurrentUserASquadArr] = useState([]);
  const [localUserSquadJoinedArray, setLocalUserSquadJoinedArray] = useState([]);
  const [currentSquadAuthUserID, setCurrentSquadAuthUserID] = useState("");
  const [localUserName, setLocalUserName] = useState("");
  const [localUserID, setLocalUserID ] = useState("")

  useEffect(() => {
    if (userInfo) {
      console.log("here is the local user", userInfo)
      const fetchLocalSquadJoinedData = async () => {
        setLocalUserName(userInfo.name);
        setLocalUserID(userInfo.id)
        setLocalUserSquadJoinedArray(userInfo.squadJoined);
      };

      const fetchCurrentSquadAuthUserData = async () => {
        const userID = squad.authUserID;
        if (!userID) {
          console.log("the currentSquad auth user is non-valid");
        } else {
          console.log("here is the userID", userID);
          setCurrentSquadAuthUserID(userID);
          try {
            const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
            const userFromBackend = userData.data?.getUser;
            setCurrentUserName(userFromBackend.name);
            const notificationQueryResult = await API.graphql(
              graphqlOperation(notificationsByUserID, { userID })
            );
            const notifications = notificationQueryResult.data?.notificationsByUserID.items;
            if (notifications.length > 0) {
              setCurrentUserNotificationID(notifications[0].id);
              setCurrentUserHasNotifications(true);
              setExistingJoinCurrentUserASquadArr(
                notifications[0].SquadJoinRequestArray || []
              );
            } else {
              setCurrentUserHasNotifications(false);
            }
          } catch (error) {
            console.log("Error fetching user or notification data", error);
          }
        }
      };

      fetchLocalSquadJoinedData();
      fetchCurrentSquadAuthUserData();
    }
  }, [squad, userInfo]);

  const possibleToJoinCurrentSquad = () => {
    if (localUserSquadJoinedArray.includes(squad.id)) {
      Alert.alert("You have already joined this squad!");
      return false;
    }
    return true;
  };

  const handleCurrentSquadAuthUserNotificationCreation = async () => {
    if (currentSquadAuthUserID) {
      try {
        const results = await API.graphql(
          graphqlOperation(createNotification, { input: { userID: currentSquadAuthUserID } })
        );
        const newNotificationCreatedID = results.data?.createNotification?.id;
        setCurrentUserNotificationID(newNotificationCreatedID);
        setCurrentUserHasNotifications(true);
        return newNotificationCreatedID;
      } catch (error) {
        console.log("Error creating a new notification", error);
        return false;
      }
    } else {
      console.log("non-valid current squad auth user id", currentSquadAuthUserID);
    }
  };

  const handleRequestToJoinCurrentSquadCreation = async (notificationID) => {
    const message = `${localUserName} has asked to join the Squad`;
    const requestingUserID = localUserID 
    const squadID = squad.id
    try {
      const results = await API.graphql(
        graphqlOperation(createRequestToJoinASquad, {
          input: { notificationID, message, requestingUserID, squadID }
        })
      );
      const requestToJoinSquadID = results.data?.createRequestToJoinASquad.id;
      return requestToJoinSquadID;
    } catch (error) {
      console.log("Error creating RequestToJoinSquad", error);
      return false;
    }
  };

  const handleUpdateNotification = async (array, notificationID) => {
    try {
      await API.graphql(
        graphqlOperation(updateNotification, {
          input: { id: notificationID, SquadJoinRequestArray: array }
        })
      );
      return true;
    } catch (error) {
      console.log("Error updating the notification", error);
      return false;
    }
  };

  const handleSquadSelected = async () => {
    if (possibleToJoinCurrentSquad()) {
      setSquadSelected(true);
      if (!currentUserHasNotification) {
        const notificationID = await handleCurrentSquadAuthUserNotificationCreation();
        if (notificationID) {
          const requestToJoinSquadID = await handleRequestToJoinCurrentSquadCreation(notificationID);
          if (requestToJoinSquadID) {
            const updatedArray = [...existingJoinCurrentUserASquadArr, requestToJoinSquadID];
            setExistingJoinCurrentUserASquadArr(updatedArray);
            await handleUpdateNotification(updatedArray, notificationID);
            onRequestSent(squad.id); // Notify parent that request has been sent
          }
        }
      } else {
        const requestToJoinSquadID = await handleRequestToJoinCurrentSquadCreation(currentUserNotificationID);
        if (requestToJoinSquadID) {
          const updatedArray = [...existingJoinCurrentUserASquadArr, requestToJoinSquadID];
          setExistingJoinCurrentUserASquadArr(updatedArray);
          await handleUpdateNotification(updatedArray, currentUserNotificationID);
          onRequestSent(squad.id); // Notify parent that request has been sent
        }
      }
    }
  };

  const handleSquadNavigation = () => {
    navigation.navigate("SquadDisplayScreen", { squad });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      behavior="padding"
      onPress={handleSquadNavigation}
    >
      <View style={styles.userImageContainer}>
        <FontAwesome name="group" size={34} color="#1145FD" style={{ marginTop: -25 }} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 5 }}>
        <View style={[styles.pollCaptionContainer, { justifyContent: 'flex-start' }]}>
          <Text style={styles.squadNameText}>
            {squad?.squadName}
          </Text>
          <Text style={styles.squadCreator}>
            Created by {currentUserName}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            { justifyContent: "flex-end" },
            { alignItems: "center" },
            squadSelected ? styles.joinedSquadTextContainer : styles.joinSquadTextContainer,
          ]}
          onPress={handleSquadSelected}
        >
          <Text style={{ color: squadSelected ? "#1145FD" : "white", marginBottom: 10 }}>
            {squadSelected ? "Request Sent!" : "Join Squad"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

        const styles = StyleSheet.create({
        container:{
        flex:1,
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 20,
        //marginVertical: 65,
        borderColor: "#C2B960",
        //height: 100,
        borderRadius: 28,
        backgroundColor: "white",
        borderWidth: 3.5,
        marginRight:30
        },
        pollCaptionContainer:{
          height: 50,
          width: 180,
        },
        joinSquadTextContainer:{
        height:40,
        width: 95,
        backgroundColor: "#1145FD",
        borderRadius: 16,
        borderColor: "#C2B960",
        borderWidth: 2.5,
        marginLeft:25,
        marginTop:-25

        },
        joinedSquadTextContainer:{
        height:40,
        width: 105,
        backgroundColor: "#FFFF",
        borderRadius: 16,
        borderColor:"#1145FD",
        borderWidth: 2.5,
        marginLeft:25,
        marginTop:-25
        },

        pollCaptionContainer:{
          height: 50,
          width: 180,
        },
        numOfVotesContainer:{
        height:40,
        width: 95,
        backgroundColor: "#1145FD",
        borderRadius: 10,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        marginLeft:5,

        },
        votedText:{
          color: "white",
          fontWeight: "bold",
          marginBottom:7,
          marginLeft:1,
          fontSize: 8.5,
          textAlignVertical:'center'
        }, 
        userImageContainer:{
        marginStart:10,
        marginTop:50
        },
        userImage:{
            width:50,
            height:70
        },
        squadNameText:{
        fontWeight:'500',
        marginLeft:5,
        marginTop:-40
        },
        squadCreator:{
        marginTop: 15,
        marginLeft: 5,
        color: '#545454',
        fontSize:10
        }
        },
        )
        export default SquadListItem;