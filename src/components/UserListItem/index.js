import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createSquadUser, updateUser, createNotification,createRequestToBeAddedInASquad,updateNotification} from '../../graphql/mutations';
import {useUserContext, user} from '../../../UserContext'
import { API, graphqlOperation } from 'aws-amplify';
import { notificationsByUserID} from '../../graphql/queries';
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
                  //console.log("there is an error getting the user info")
                 }

                }    
                fetchLocalUserData()
              }, []);

  //fetch current user info
              useEffect(() => {
                const fetchCurrentUserData = async () =>{
                 //console.log("here is the current user id", user.id)
                 setCurrentUserID(user.id)
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
                  //console.log("here are the notifications", notifications)
                  if (notifications.length > 0) {
                    //console.log("User has notifications:", notifications);
                    const notificationID = notifications[0].id
                    setCurrentUserNotificationID(notificationID)
                    setExistingRequestsToBeAddedInASquadArr(notifications.squadAddRequestsArray)
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


  //1. add the local user's squad to the current user Squad joined Array -- update to be any array in the 
      const handleCurrentUserSquadJoinedArrayUpdate = async () => {
        const localUserSquadID = localUserInfo.user.userSquadId[0]
        //console.log("this is the local user squad created ID", localUserSquadID)
        //console.log("this is the currentUser ID", currentUserID)

        if(!currentUserSquadJoinedArray.includes(localUserSquadCreatedArray[0])){
        setCurrentUserSquadJoinedArray(currentUserSquadJoinedArray.push(localUserSquadCreatedArray[0])) //updated Squads joined array
       
   //2. update the currentUser squads joined arrary
          try {
            const currentUserSquadjoinedArrUpdateResult = await API.graphql(
              graphqlOperation(updateUser, {
                input: { id: currentUserID, squadJoined: currentUserSquadJoinedArray }
              })
            );
            console.log("currentUserSquadJoined Arr update successfully✅", currentUserSquadjoinedArrUpdateResult)
            return true
          } catch (error) {
            console.log("error updating current user squadJoinedArr",error)
          }
        }else{
          console.log("the user is already in your squad")
          return false;
        }
      }
       //3. create a new squaduser
          const handleCreateNewSquadUser = async()=>{
            //3. create a new squad user with the current user
            const localUserSquadID = localUserInfo.user.userSquadId[0]
            console.log("this is the local user squad created ID", localUserSquadID)
            try {
              const results = await API.graphql(graphqlOperation(createSquadUser, {
                input: { squadId: localUserSquadID, userId:currentUserID }
              }));
              console.log("here is the squaduser created successfully✅",results)
            }catch(error){
              console.log("error creating a squadUser ❌", error)
            }
          }
    // 4. create notification if the user has none
        const handleCreateNewNotification = async()=>{
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
        }
        //5. create new RequestToBeAddedInASquad
        const handleCreateRequestToBeAddedInASquad = async()=>{
                try {
                  console.log("currentUserNewNotificationID", currentUserNewNotificationID)
                  const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
                       input: { notificationID: currentUserNewNotificationID}
                     }));
                     console.log("requestToBeAddedInASquad Created successfully✅",results.data?.createRequestToBeAddedInASquad.id)
                     setCurrentUserNewRequestToBeAddedInSquad(results.data?.createRequestToBeAddedInASquad.id)
                     const newArr = [(results.data?.createRequestToBeAddedInASquad.id)]
                     setNewCurrentUserResquestToBeAddedInASquadArr(newArr)
                  }catch(error){
                   console.log("error creating a requestToBeAddedInASquad  ❌", error)
                 }
        }
//6. update new notification notification update
        const handleNewNotificationUpdate = async() =>{

          try {
            const newNotificationCreatedUpdateResult = await API.graphql(
              graphqlOperation(updateNotification, {
                input: { id: currentUserNewNotificationID,   squadAddRequestsArray: newCurrentUserResquestToBeAddedInASquadArr } 
              })
            );
            console.log("new notification update successfu✅", newNotificationCreatedUpdateResult)
          } catch (error) {
            console.log("error updating new notificationcreated❌",error)
          }
        }
//come back here
        const handleExistingNotificationNewRequestToBeAddedInASquad =async()=>{
          try {
            console.log("currentUserNewNotificationID", currentUserNewNotificationID)
            const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
                 input: { notificationID: currentUserNewNotificationID}
               }));
               console.log("existing new requestToBeAddedInASquad Created successfully✅",results.data?.createRequestToBeAddedInASquad.id)
               setCurrentUserNewRequestToBeAddedInSquad(results.data?.createRequestToBeAddedInASquad.id)
               existingRequestsToBeAddedInASquadArr.push(results.data?.createRequestToBeAddedInASquad.id)
               const newArr = [results.data?.createRequestToBeAddedInASquad.id]
               setNewCurrentUserResquestToBeAddedInASquadArr(newArr)
            }catch(error){
             console.log("error creating a existing notification requestToBeAddedInASquad  ❌", error)
           }
  }
        
    const handleExistingNotificationUpdate=async()=>{
      try {
        const existingNotificationUpdateResult = await API.graphql(
          graphqlOperation(updateNotification, {
            input: { id: currentUserNotificationID,   squadAddRequestsArray: newCurrentUserResquestToBeAddedInASquadArr } 
          })
        );
        console.log("existing notification update successfu✅", existingNotificationUpdateResult)
      } catch (error) {
        console.log("error updating new notificationcreated❌",error)
      }
    }

  const handleDeletingRequestToBeAddedToASquad=async()=>{
    const requestToBeAddedInASquadID = newCurrentUserResquestToBeAddedInASquadArr.pop()
    console.log("here is the requestToBeAddedInASquadID that was deleted",requestToBeAddedInASquadID)
    try {
      // Execute the mutation with the input data
      const { data } = await deleteRequestToBeAddedInASquad({
        variables: {
          id:currentUserNewRequestToBeAddedInSquad
        },
      });

      // Handle the response if needed
      console.log('Request deleted:', data.deleteRequestToBeAddedInASquad);
    } catch (error) {
      // Handle errors
      console.log('Error deleting request:', error);
    }
  }

//handle updating notification
const handleNotificationAfterDeleteUpdate = async()=>{
  //update notification
  try {
    const resultFromDeletedRequestToBeAddedInAsquadNotification = await API.graphql(graphqlOperation(updateNotification, {input:{notificationID: currentUserNotificationID, squadAddRequestsArray:newCurrentUserResquestToBeAddedInASquadArr}}))
    console.log("updating the old notification by deleting the requestToBeAdded in a squad successful", resultFromDeletedRequestToBeAddedInAsquadNotification)
    console.log("the corresponding ID", resultFromDeletedRequestToBeAddedInAsquadNotification.data?.updateNotification?.id)
    setCurrentUserNewNotificationID(resultFromDeletedRequestToBeAddedInAsquadNotification.resultFromDeletedRequestToBeAddedInAsquadNotification.data?.updateNotification?.id)
  } catch (error) {
    console.log("error updating the old notification by deleting the requestToBeAdded in a squad successful",error )
  }
}


//handleSquadUserDelete and Current SquadJoined Array
const handleSquadUserDelete=async()=>{
  const deletedSquadJoinedID = currentUserSquadJoinedArray.pop()
  setCurrentUserSquadJoinedArray(currentUserSquadJoinedArray)
  console.log("here is the deleted squad joined", deletedSquadJoinedID)
  try {
    const resultForDeletingSquadUser = await API.graphql(graphqlOperation(deleteSquadUser,{input:{id: currentUserID}}))
    console.log("results from deleting a squad user",resultForDeletingSquadUser)
  } catch (error) {
    console.log("error deleting squad user", error)
  }
}
//finally update the user
const handleUpdateUserAfterDeletion=async()=>{
  try {
    const resultsForUpdatingUserAfterDeletingSquadJoinedArr = await API.graphql(graphqlOperation(updateUser,{input:{userID:currentUserID, squadJoined:currentUserSquadJoinedArray}}))
    console.log("here is the results for updating the user after deleting one of their squad joined", resultsForUpdatingUserAfterDeletingSquadJoinedArr)
  } catch (error) {
    console.log("error updating squad joined array after latets deletion", error)
  }
}
    const handleSquadCreation = async () => {
        if (selected === false) {
            setSelected(true);
            //if the user is not in the squad already
            if(handleCurrentUserSquadJoinedArrayUpdate()){
              handleCreateNewSquadUser()  
              if(!currentUserHasNotification){
                handleCreateNewNotification()
                handleCreateRequestToBeAddedInASquad()
                handleNewNotificationUpdate()
                console.log("user has no notifications")
                    }else{
                      console.log("the user has notification")
                      handleExistingNotificationNewRequestToBeAddedInASquad()
                      handleExistingNotificationUpdate()
                    }

               }else{
                console.log("the user is already in your squad")
               }
            
            }else{
                setSelected(false)
                //remove the latest thing to be added in the existingRequestToBeAddedInASquadArr and delete it from backend
                handleDeletingRequestToBeAddedToASquad()
                //update notification 
                handleNotificationAfterDeleteUpdate
                //update the squadJoined Array
               handleSquadUserDelete()
                //update the user
               handleUpdateUserAfterDeletion()

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