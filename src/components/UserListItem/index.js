import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import {  AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createNotification,createRequestToBeAddedInASquad,updateNotification} from '../../graphql/mutations';
import {useUserContext, user} from '../../../UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID} from '../../graphql/queries';


  const UserListItem = ({user}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(null);
  const [localUserSquadCreatedArray, setLocalUserSquadCreatedArray] = useState([]);
  const [currentUserID, setCurrentUserID] = useState('');
  const [currentUserHasNotification, setCurrentUserHasNotifications] = useState(false);
  const [currentUserNotificationID, setCurrentUserNotificationID] = useState('');
  const [existingRequestsToBeAddedInASquadArr, setExistingRequestsToBeAddedInASquadArr] = useState([]);
  const { user: localUser } = useUserContext();

  useEffect(() => {
    if (localUser) {
      setLocalUserInfo(localUser);
    }
  }, [localUser]);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      if (user) {
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
      const requestPromises = selectedSquads.map(async (squad) => {
        const message = `${localUserInfo.name} has requested to add you to their Squad, ${squad.squadName}`;
        const results = await API.graphql(
          graphqlOperation(createRequestToBeAddedInASquad, {
            input: {
              notificationID,
              requestingUserID: localUserInfo.id,
              squads: [squad.id], // Add the squad ID here
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
  
  const handleAddUserToSquad = async () => {
    if (!selected) {
      if (!currentUserHasNotification) {
        const notificationID = await handleNotificationCreation();
        if (notificationID) {
          const requestID = await handleRequestCreation(notificationID);
          if (requestID) {
            const updatedArray = [...existingRequestsToBeAddedInASquadArr, requestID];
            await handleUpdateNotification(updatedArray);
            setSelected(true);
          }
        }
      } else {
        const requestID = await handleRequestCreation(currentUserNotificationID);
        if (requestID) {
          const updatedArray = [...existingRequestsToBeAddedInASquadArr, requestID];
          await handleUpdateNotification(updatedArray);
          setSelected(true);
        }
      }
    } else {
      Alert.alert("User is already added or requested.");
    }
  };

  const handleUserNavigation = () => {
    navigation.navigate("UserDisplayScreen", { user });
  };
      return (
        <TouchableOpacity
        style={styles.container}
        behavior="padding"
        onPress={handleUserNavigation}
        >
        <View
          style={styles.userImageContainer}
          >
          <Image
          //source={{uri: user.image}}
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode='contain'
          style={styles.userImage}
          />
        </View>
        <View style={{flexDirection:"row", marginTop:20, marginLeft:5 }}>
          <View
          style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
          >
              <Text
                style = {styles.userName}
              > 
              {user.name}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                !selected ? styles.addedUserIcon : styles.unAddedUserIcon,
                {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                },
              ]}
              onPress={handleAddUserToSquad}
              >
              {!selected ? (
              <AntDesign name="addusergroup" size={23} color="white" style={{ marginBottom: 5 }} />
                
              ) : (
                <SimpleLineIcons name="user-following" size={20} color="#1145FD" style={{ marginBottom: 6 }} />
              )}
          </TouchableOpacity>
            </View>
        </TouchableOpacity>
      )
      }
    
      
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
        borderWidth: 4,
        marginRight:30
      
    },
      
      
      pollCaptionContainer:{
        height: 50,
        width: 180,
      },
      addedUserIcon: {
        height: 40,
        width: 95,
        backgroundColor: "#1145FD",
        borderRadius: 17,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        marginLeft: 25,
        marginTop:-5
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
        //marginTop:20
      },
      userImage:{
          width:50,
          height:70
      },
      userName:{
      fontWeight:'500',
      marginLeft:5
      },
      userJoinPeriod:{
      marginTop: 5,
      marginLeft: 5,
      color: '#545454',
      }
      },
      )
    export default UserListItem