import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createSquadUser, updateUser, createNotification,createRequestToBeAddedInASquad,updateNotification} from '../../graphql/mutations';
import {useUserContext, user} from '../../../UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { getUser, notificationsByUserID} from '../../graphql/queries';
import { deleteRequestToBeAddedInASquad, deleteSquadUser } from '../../graphql/mutations';
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
      const[currentUserID, setCurrentUserID] = useState("")
      const[localUserID, seLocalUserID] = useState("")
      const [currentUserSquadCreatedArray, setCurrentUserSquadCreatedArray] = useState([])
      const [currentUserSquadJoinedArray, setCurrentUserSquadJoinedArray] = useState([])
      const[currentUserHasNotification, setCurrentUserHasNotifications] = useState(false)
      const[currentUserNotificationID, setCurrentUserNotificationID] = useState()
      const[newCurrentUserResquestToBeAddedInASquadArr, setNewCurrentUserResquestToBeAddedInASquadArr] = useState()
      const[currentUserNewNotificationID, setCurrentUserNewNotificationID] = useState("")
      const[currentUserNewRequestToBeAddedInSquad, setCurrentUserNewRequestToBeAddedInSquad] = useState([])
      const[existingRequestsToBeAddedInASquadArr, setExistingRequestsToBeAddedInASquadArr] = useState([])
      const[currentUserName, setCurrentUserName] = useState("")
      const[currentUserNotification, setCurrentUserNotification] = useState()
      
      const localUser = useUserContext()
//fetch local user info data
              useEffect(() => {
                const userInfo = localUser
                seLocalUserID(userInfo.user.id)
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
                  console.log("there is an error getting the user info")
                 }

                }    
                fetchLocalUserData()
              }, []);

  //fetch current user info
              useEffect(() => {
                const fetchCurrentUserData = async () =>{
                 //console.log("here is the current user", user.userName)
                 const currentUserUserName = user.userName
                 setCurrentUserName(currentUserUserName)
                 const userID = user.id
                 //console.log("here is the user ID", userID)
                 setCurrentUserID(userID)
                 try {
                  const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
                  //console.log("results to confirm that the user is correct", userData)
                 } catch (error) {
                  console.log("error confirming that the user is real")
                 }
                
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
                  //console.log("here is the current user ID", currentUserID)
                    const notificationQueryResult = await API.graphql(
                      graphqlOperation(notificationsByUserID, { userID: user_ID})
                    );
                      
                    //console.log("result from notification query",notificationQueryResult)
                    const notifications = notificationQueryResult.data?.notificationsByUserID.items;
                    //console.log("here are the notifications", notifications)
                    if (notifications) {
                      //console.log("User has notifications:", notifications);
                      //console.log("here is user's notification id:",notifications[0].id)
                      setCurrentUserNotification(notifications)
                      const notificationID = notifications[0].id
                      //console.log("here is the user notification ID",notificationID )
                      setCurrentUserNotificationID(notificationID)
                      setCurrentUserHasNotifications(true)
                      const array = notifications.squadAddRequestsArray
                      //console.log("here is the array of the request to be added in squads array", array)
                      if(array === undefined || array === null){
                        const newArray = []
                        setExistingRequestsToBeAddedInASquadArr(newArray)
                      }else{
                        setExistingRequestsToBeAddedInASquadArr(array)
                      }
  
                      return notificationID
                    } else {
                          console.log("User has no notifications.");
                          setCurrentUserHasNotifications(false);
                    }
                  } catch (error) {
                    console.log("error getting current user notification", error)
                    
                  }
  
                
                  }
                      }    
                fetchCurrentUserData()
              }, []);

  
              // 1. check if the current user has notification 
              const checkIfCurrentUserHasNotification = async() =>{
                if(currentUserHasNotification){
                  console.log("here is the current user notification", currentUserNotification)

                  var notificationData = JSON.stringify(currentUserNotification)
                 notificationData =  await JSON.parse(notificationData)
                  console.log("here is the notification data", notificationData)
                  console.log("the notification id is the following", notificationData[0].id)
                  var notificationID  = notificationData[0].id
                  return notificationID
                }else{
                  console.log("the currentUserHasNotification is false", currentUserHasNotification)
                  return false;
                }
              }
                //create notification for the user if they don't have one 
                const handleNotificationProduction=async ()=>{
                  console.log("here is the user ID", currentUserID)
                  try {
                    const results = await API.graphql(graphqlOperation(createNotification, {input:{userID: currentUserID}}))
                    console.log("here is the result of creating the notification for the user", results)
                    const notification = results.data?.createNotification.items
                    console.log("here is the notification", notification)
                    const notificationID = notification[0].id
                    console.log("here is the notification ID", notificationID)
                    setCurrentUserNewNotificationID(notificationID)
                    setCurrentUserNotificationID(notificationID)
                    return notificationID
                  } catch (error) {
                    console.log("errror creating notification for the current user", error)
                    return false;
                  }
                }

              const handleRequestToBeAddedInASquadCreation=async(notification_id)=>{
              console.log("this is the current user notification Id", currentUserNotificationID)
                try {
                  const result  = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {input:{
                    notificationID: notification_id,
                  }}))
                  const requestToBeAddedID = result.data?.createRequestToBeAddedInASquad.id
                  console.log("here is the ID of the request to be added in a squad", requestToBeAddedID)
                  return requestToBeAddedID;
                } catch (error) {
                  console.log("error creating requestToBeAddedInASquad",error)
                  return false;
                }

              }
              
            //3. get and update the squadAddRequestsArray: [String]
            const handleUpdatesquadAddRequestsArrayLocally = async (notificationID, requestID) => {
              console.log("here is the notification", notificationID);
              try {
                  if (!currentUserNotification) {
                      const newArr = [requestID];
                      setCurrentUserSquadJoinedArray(newArr);
                      console.log("here is the new array", newArr);
                      return newArr;
                  } else {
                      console.log("the current notification is not null");
                      let notificationStringify = JSON.stringify(currentUserNotification)
                      let notificationParsed = JSON.parse(notificationStringify)
                      console.log("here is the notification parsed", notificationParsed)
                      let array = notificationParsed [0].squadAddRequestsArray;
                      console.log("here is the array" ,array)
                      if (!array) {
                          array = [requestID]; // If array is null or undefined, initialize it as a new array with requestID
                      } else {
                          array.push(requestID); // If array exists, push the requestID
                      }
                      console.log("here is the current user squadAddRequestArray:", array);
                      return array;
                  }
              } catch (error) {
                  console.log("error updating the array locally", error);
                  return false;
              }
          }
          
        
    //update the notification globally
    const handleGlobalNotificationUpdate=async(updateArray)=>{
      console.log("here is the updated array", updateArray)
      console.log("here is the current user notification ID", currentUserNotificationID)
      try {
       const results = await API.graphql(graphqlOperation(updateNotification, {input:{
        id: currentUserNotificationID, 
        squadAddRequestsArray: updateArray
       }}))
       console.log("here are the results for updating the notification", results)
       return true
      } catch (error) {
        console.log("error updating the notification", error)
        return false
      }

    }


     //3. check if it is possible to add current users to the local user squad
     const possibleToAddCurrentUserToLocalUserSquad = async () => {
      if (currentUserSquadJoinedArray.includes(localUserSquadCreatedArray[0])) {
          console.log("No, the current user is already in the local user squad already!");
          return false;
      } else {
          console.log("Yes sir, you may proceed");
          return true;
      }
        };


      const handleSquadCreation = async () => {
        if (selected === false) {
        //check if the user has notification 
            const userHasNotification = await checkIfCurrentUserHasNotification()
            console.log("here is the user has notification return value", userHasNotification)
                if(userHasNotification === false){
                  setSelected(true)
                   const newNotificationIDCreated = await handleNotificationProduction()
                   if(newNotificationIDCreated !==false){
                  //   //create the request
                    const requestId = await handleRequestToBeAddedInASquadCreation(newNotificationIDCreated)
                    if(requestId !== false){
                  //     //local update the notification 
                     const updatedArray = await handleUpdatesquadAddRequestsArrayLocally(newNotificationCreated, requestId)
                      if(updatedArray!==false){
                        //globally update the notification 
                        const globallyNotificationUpdateStatus = await handleGlobalNotificationUpdate(updatedArray)
                        if(globallyNotificationUpdateStatus !== false){
                          console.log("Successfully updated the notificationnotification✅✅✅✅✅")
                        }
                      }
                    
                    }
                  }
                }else{
                  console.log("the user has notification and the notification return value is: ", userHasNotification )
                  const canAddToSquad = await possibleToAddCurrentUserToLocalUserSquad()
                  if(canAddToSquad === true){
                      setSelected(true)
                      //create the requestToAddRequest
                        console.log("we can move on")
                       const requestID = await handleRequestToBeAddedInASquadCreation(userHasNotification)
                       console.log("here is the request ID", requestID)
                         if(requestID!==false){
                        const updatedArray = await handleUpdatesquadAddRequestsArrayLocally(userHasNotification, requestID)
                         console.log("the updated array is: ", updatedArray)
                        if(updatedArray!==false){
                      const globallyUpdateArray = await handleGlobalNotificationUpdate(updatedArray)
                        if(globallyUpdateArray !== false){
                          console.log("the notification update successfull✅✅")
                        }else{
                            console.log("the notification update unsuccessfull")
                        }
                     }
                     }     
                   }
                }
        } else {
          console.log("we can not move on")
            setSelected(false);    
        }
    };
           

         
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