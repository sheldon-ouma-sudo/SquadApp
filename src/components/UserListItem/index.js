import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createSquadUser, updateUser, createNotification,createRequestToBeAddedInASquad,updateNotification} from '../../graphql/mutations';
import {useUserContext, user} from '../../../UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID} from '../../graphql/queries';
//import { createSquadUser } from '../../graphql/mutations';

    const UserListItem = ({
      user,
      userInfo,
      onPress = () => {},
      selectable = false,
      isSelected = false,
    }) => {
      const navigation = useNavigation();
      const [selected, setSelected] = useState(false);
      const[localUserInfo, setLocalUserInfo] = useState()
      const [localUserSquadCreatedArray, setLocalUserSquadCreatedArray] = useState([])
      const[localUserSquadJoinedArray, setLocalUserSquadJoinedArray] = useState([])
      const[currentUserInfo, setCurrentUserInfo] = useState()
      const [currentUserSquadCreatedArray, setCurrentUserSquadCreatedArray] = useState([])
      const [currentUserSquadJoinedArray, setCurrentUserSquadJoinedArray] = useState([])
      const[currentUserHasNotification, setCurrentUserHasNotifications] = useState(false)
      const[currentUserNotificationID, setCurrentUserNotificationID] = useState()
      const[newResquestToBeAddedInASquad,setNewResquestToBeAddedInASquad] = useState("")
      const[newResquestToBeAddedInASquadArr, setNewSquadAddRequestArr] = useState()
      const[currentUserNewNotificationID, setCurrentUserNewNotificationID] = useState("")
      const[existingSquadRequestsArr, setExistingSquadRequestsArr] = useState([])
      
      const localUser = useUserContext()
//fetch local user info data
              useEffect(() => {
                //console.log(localUser)
                const userInfo = localUser
                //console.log("here is the local user info", userInfo.user.userSquadId)
                const fetchLocalUserData = async () =>{
                  //console.log("here is the local user info for the first time", userInfo)
                   if(userInfo){
                    //set local user info 
                    //console.log("here is the local user info inside the if statement", userInfo.user.userSquadId)
                   setLocalUserInfo(userInfo)
                   //get the local user info created squad array 
                   //console.log("here is the squads created by local user for the first time",userInfo.userSquadId)
                   setLocalUserSquadCreatedArray(userInfo.user.userSquadId)
                   //get the local user squads joined array 
                  setLocalUserSquadJoinedArray(userInfo.user.squadJoined)
                 }else{
                  //console.log("there is an error getting the user info")
                 }

                }    
                fetchLocalUserData()
              }, []);

  //fetch current user info
              useEffect(() => {
                const fetchCurrentUserData = async () =>{
                 // console.log("here is the current user id", user.id)
                   if(user){
                    //set local user info 
                   setCurrentUserInfo(user)
                   //get the local user info created squad array 
                   setCurrentUserSquadCreatedArray(user.userSquadId)
                   //get the local user squads joined array 
                   setCurrentUserSquadJoinedArray(user.squadJoined)
                   //check if user has notifications
                   // Define the filter for the query
                try {
                  const user_ID = user.id
                  //console.log("here is the user id in try catch", user_ID)
                  const notificationQueryResult = await API.graphql(
                    graphqlOperation(notificationsByUserID, { userID: user_ID })
                  );
                    
                  //console.log("result from notification query",notificationQueryResult)
                  const notifications = notificationQueryResult.data?.notificationsByUserID.items;
                  console.log("here are the notifications", notifications)
                  if (notifications.length > 0) {
                    console.log("User has notifications:", notifications);
                    const notificationID = notifications[0].id
                    setCurrentUserNotificationID(notificationID)
                    setExistingSquadRequestsArr(notifications.squadAddRequestsArray)
                  } else {
                        console.log("User has no notifications.");
                        setCurrentUserHasNotifications(false);
                   }
                } catch (error) {
                  console.log("error getting current user notification", error)
                }
                  }
                       //})
                      //.catch(error => {
                     //console.error("Error fetching notifications:", error);
                    //  //});
                    //   }else{
                    //     console.log("there is an error getting the user info")
                    //   }

                      }    
                fetchCurrentUserData()
              }, []);


      const handleSquadCreation = async () => {
        // console.log("here is the local user info", localUserInfo);
        // console.log("here is the current user info", currentUserInfo);
        // console.log("here is the local user id", localUserInfo.user.id);
        const localUserID = localUserInfo.user.id;
        console.log("here is the current user id", currentUserInfo.id);
        const currentUserID = currentUserInfo.id;
        // console.log("here is the array of the squads created by the local user", localUserSquadCreatedArray)
        // console.log("here is the  array of squads created  by the current user", currentUserSquadCreatedArray)
        // console.log("here is the  array of Squads joined by local  user", localUserSquadJoinedArray)
        // console.log("here is the array of squads joined by the current user", currentUserSquadJoinedArray)
      
        if (selected === false) {
          setSelected(true);
        
        const localUserSquadID = localUserInfo.user.userSquadId[0]
        console.log("this is the local user squad created ID", localUserSquadID)
        console.log("this is the currentUser ID", currentUserID)

  //1. add the local user's squad to the current user Squad joined Array -- update to be any array in the 
        if(!currentUserSquadJoinedArray.includes(localUserSquadCreatedArray[0]))
        setCurrentUserSquadJoinedArray(currentUserSquadJoinedArray.push(localUserSquadCreatedArray[0]))
        console.log("new squadJoined array for the current user is: ",currentUserSquadJoinedArray)
        const updateCurrentUserSquadJoinedInput = {
          id: currentUserID,
          squadJoined: currentUserSquadJoinedArray
        }
        console.log("here is the update input", updateCurrentUserSquadJoinedInput)
   //2. update the currentUser squads joined arrary
          try {
            const currentUserSquadjoinedArrUpdateResult = await API.graphql(
              graphqlOperation(updateUser, {
                input: { id: currentUserID, squadJoined: currentUserSquadJoinedArray }
              })
            );
            console.log("currentUserSquadJoined Arr update successfully✅", currentUserSquadjoinedArrUpdateResult)
          } catch (error) {
            console.log("error updating current user squadJoinedArr",error)
          }
        
        
  //3. create a new squad user with the current user
           try {
            const results = await API.graphql(graphqlOperation(createSquadUser, {
              input: { squadId: localUserSquadID, userId:currentUserID }
            }));
            console.log("here is the squaduser created successfully✅",results)
          }catch(error){
            console.log("error creating a squadUser ❌", error)
          }
               //const requestToBeAddedInASquadCreationID = requestToBeAddedInASquadCreationResult.data?.id
      
  // //4. create notification if the user has none or update if the user has one
        if(!currentUserHasNotification){

              try {
                console.log("before we start here is the current user ID", currentUserID)
                const results = await API.graphql(graphqlOperation(createNotification, {
                  input: { userID:currentUserID }
                }));
                console.log("here is the notification created successfully✅",results)
                console.log("here is the notification ID:", results.data?.createNotification?.id)
                setCurrentUserNewNotificationID(results.data?.createNotification?.id)
              }catch(error){
                console.log("error creating a notification ❌", error)
              }   
     // 5. Create RequestToBeAddedInASquad for the current user
                try {
                  console.log("currentUserNewNotificationID", currentUserNewNotificationID)
                  const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
                       input: { notificationID: currentUserNewNotificationID}
                     }));
                     console.log("requestToBeAddedInASquad Created successfully✅",results.data?.createRequestToBeAddedInASquad.id)
                     setNewResquestToBeAddedInASquad(results.data?.createRequestToBeAddedInASquad.id)
                     const newArr = currentUserSquadJoinedArray.push(createRequestToBeAddedInASquad.id)
                     setNewSquadAddRequestArr(newArr)
                  }catch(error){
                   console.log("error creating a requestToBeAddedInASquad  ❌", error)
                 }
                //6.update the notification after being created
                 try {
                  const newNotificationCreatedUpdateResult = await API.graphql(
                    graphqlOperation(updateNotification, {
                      input: { id: currentUserNewNotificationID,   squadAddRequestsArray: currentUserSquadJoinedArray }
                     
                    })
                  );
                  console.log("new notification update successfu✅", newNotificationCreatedUpdateResult)
                } catch (error) {
                  console.log("error updating new notificationcreated❌",error)
                }
                  }else{
                    console.log("user has notifications")
            //7. the user has notification so we are just going to update the notification that they have
                  existingSquadRequestsArr.push(newResquestToBeAddedInASquad )
                  const existingNotificationUpdateInput = {
                      input: {
                      id: currentUserNotificationID, // Replace "notificationId" with the actual ID of the notification you want to update
                      squadAddRequestsArray: existingSquadRequestsArr
                    }
                  };
                  API.graphql(graphqlOperation(updateNotification, existingNotificationUpdateInput))
                    .then(result => {
                      console.log("Notification updated successfully✅:", result.data.updateNotification);
                  })
                    .catch(error => {
                      console.log("Error updating notification:", error);
                    });
                  }
                    }else{
                      setSelected(false)
                    }
            }
        
        
      
      
      
      return (
        <Pressable
        style={styles.container}
        behavior="padding"
        onPress={onPress}
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
              onPress={handleSquadCreation}
              >
              {!selected ? (
              <AntDesign name="addusergroup" size={23} color="white" style={{ marginBottom: 5 }} />
                
              ) : (
                <SimpleLineIcons name="user-following" size={20} color="#1145FD" style={{ marginBottom: 6 }} />
              )}
          </TouchableOpacity>
            </View>
        </Pressable>
      )
      }
    
      
      const styles = StyleSheet.create({
      container:{
        flex:1,
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 20,
        //marginVertical: 65,
        borderColor: "#FFFF",
        //height: 100,
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 5,
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
        borderRadius: 10,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        marginLeft: 25,
      },
      
      unAddedUserIcon: {
        height: 40,
        width: 95,
        backgroundColor: "white",
        borderRadius: 10,
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