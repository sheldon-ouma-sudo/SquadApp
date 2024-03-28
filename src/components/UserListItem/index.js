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
                  //console.log("there is an error getting the user info")
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
                
                  }
                      }    
                fetchCurrentUserData()
              }, []);

     

      // 1. check if the current user has notification 
      const checkIfCurrentUserHasNotification = async() =>{
        try {
          //const user_ID = user.id
         //console.log("here is the current user ID", currentUserID)
          const notificationQueryResult = await API.graphql(
            graphqlOperation(notificationsByUserID, { userID: currentUserID })
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
            console.log("here is the array of the request to be added in squads array", array)
            setExistingRequestsToBeAddedInASquadArr(array)
            return notificationID
          } else {
                console.log("User has no notifications.");
                setCurrentUserHasNotifications(false);
            return false
           }
        } catch (error) {
          console.log("error getting current user notification", error)
          return false
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
    const handleUpdatesquadAddRequestsArrayLocally = async (notification, requestID)=>{
      console.log("here is the notification",notification )
      try {
        const array = notification[0].squadAddRequestsArray
        if(array ===  null || array == undefined){
          const newArr = []
          newArr.push(requestID)
          setCurrentUserSquadJoinedArray(newArr)
          console.log("here is the new array", newArr)
          return newArr
        }else{
          array.push(requestID)
          return array
        }
      } catch (error) {
        console.log("error updating the array locally",error)
        return false
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
      //     //let randomArr = [1, 2, 3, 4];
      //console.log("here is the current user", currentUserID, "and here is the current user username", currentUserName)
      //console.log("here is the current user's joint squads", currentUserSquadJoinedArray)
      //console.log("here is the local user's created squads", localUserSquadCreatedArray[0])

      if (currentUserSquadJoinedArray.includes(localUserSquadCreatedArray[0])) {
          console.log("No, the current user is already in the local user squad already!");
          return false;
      } else {
          console.log("Yes sir, you may proceed");
          return true;
      }
        };




      // //2 add the local user's squad to the current user Squad joined Array -- update to be any array in the 
      // const handleAddCurrentUserToLocalSquadJoinedArray = async () => {
      //   const localUserSquadID = localUserInfo.user.userSquadId[0]
      //   // console.log("here is the local user squad ID", localUserSquadID)
      //   // console.log("here is the current user's joint squads", currentUserSquadJoinedArray)
      //   // console.log("here is the local user's created squads", localUserSquadCreatedArray)
      //   // if(!currentUserSquadJoinedArray.includes(localUserSquadCreatedArray[0])){
      //   setCurrentUserSquadJoinedArray(currentUserSquadJoinedArray.push(localUserSquadCreatedArray[0])) //updated Squads joined array
      //   //console.log("here is the updated current user squad",currentUserSquadJoinedArray)
      //     try {
      //       const currentUserSquadjoinedArrUpdateResult = await API.graphql(
      //         graphqlOperation(updateUser, {
      //           input: { id: currentUserID, squadJoined: currentUserSquadJoinedArray }
      //         })
      //       );
      //       console.log("currentUserSquadJoined Arr update successfully✅", currentUserSquadjoinedArrUpdateResult)
      //     } catch (error) {
      //       console.log("error updating current user squadJoinedArr",error)
      //     }

      // }
      
      //  //3. create a new squaduser
      // const handleCreateNewSquadUser = async()=>{
      //   //3. create a new squad user with the current user
      //   const localUserSquadID = localUserInfo.user.userSquadId[0]
      //   //console.log("this is the local user squad created ID", localUserSquadID)
      //   try {
      //     const results = await API.graphql(graphqlOperation(createSquadUser, {
      //       input: { squadId: localUserSquadID, userId:currentUserID }
      //     }));
      //     //console.log("here is the squaduser created successfully✅",results)
      //   }catch(error){
      //     console.log("error creating a squadUser ❌", error)
      //   }
      // }
    // // 4. create notification if the user has none
    // const handleCreateNewNotification = async()=>{
    //   try {
    //     // console.log("before we start here is the current user ID", currentUserID)
    //     const results = await API.graphql(graphqlOperation(createNotification, {
    //       input: { userID:currentUserID }
    //     }));
    //     // console.log("here is the notification created successfully✅",results)
    //     // console.log("here is the notification ID:", results.data?.createNotification?.id)
    //     setCurrentUserNewNotificationID(results.data?.createNotification?.id)
    //   }catch(error){
    //     console.log("error creating a notification ❌", error)
    //   }  
    // }
// const handleNewCreateRequestToBeAddedInASquad = async () => {
//   try {
//     if (!currentUserNewNotificationID) {
//       console.log("Error: currentUserNewNotificationID is empty");
//       return;
//     }

//     const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
//       input: { notificationID: currentUserNewNotificationID }
//     }));
//     console.log("requestToBeAddedInASquad Created successfully✅", results.data?.createRequestToBeAddedInASquad.id);
//     setCurrentUserNewRequestToBeAddedInSquad(results.data?.createRequestToBeAddedInASquad.id);
//     const newArr = [results.data?.createRequestToBeAddedInASquad.id];
//     console.log("here is the updated array in handleCreateRequestToBeAddedInASquad", newArr);
//     setNewCurrentUserResquestToBeAddedInASquadArr(newArr);
//     setExistingRequestsToBeAddedInASquadArr(newArr)
//   } catch (error) {
//     console.log("error creating a requestToBeAddedInASquad ❌", error);
//   }
// }
// //work with existing notification ID
// const handleExistingCreateRequestToBeAddedInASquad = async () => {
//   try {
//     if (!currentUserNotificationID) {
//       console.log("Error: currentUserNotificationID is empty");
//       return;
//     }

//     const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
//       input: { notificationID: currentUserNotificationID}
//     }));
//     console.log("requestToBeAddedInASquad Created successfully✅", results.data?.createRequestToBeAddedInASquad.id);
//     setCurrentUserNewRequestToBeAddedInSquad(results.data?.createRequestToBeAddedInASquad.id);
//     const newArr = [results.data?.createRequestToBeAddedInASquad.id];
//     console.log("here is the updated array in handleCreateRequestToBeAddedInASquad", newArr);
//     setNewCurrentUserResquestToBeAddedInASquadArr(newArr);
//   } catch (error) {
//     console.log("error creating a requestToBeAddedInASquad ❌", error);
//   }
// }

  // //6. update new notification notification update
  // const handleNewNotificationUpdate = async() =>{
  //   try {
  //     const newNotificationCreatedUpdateResult = await API.graphql(
  //       graphqlOperation(updateNotification, {
  //         input: { id: currentUserNewNotificationID,   squadAddRequestsArray: newCurrentUserResquestToBeAddedInASquadArr } 
  //       })
  //     );
  //     console.log("new notification update successfu✅", newNotificationCreatedUpdateResult)
  //   } catch (error) {
  //     console.log("error updating new notificationcreated❌",error)
  //   }
  // }
//   const handleExistingNotificationNewRequestToBeAddedInASquad =async()=>{
//     try {
//      // console.log("currentUserNewNotificationID", currentUserNewNotificationID)
//       const results = await API.graphql(graphqlOperation(createRequestToBeAddedInASquad, {
//            input: { notificationID: currentUserNotificationID}
//          }));
//          console.log("existing new requestToBeAddedInASquad Created successfully✅✅✅✅✅",results.data?.createRequestToBeAddedInASquad.id)
//          const newRequestID = results.data?.createRequestToBeAddedInASquad.id
//          console.log("this is the new request ID",newRequestID)
//          setCurrentUserNewRequestToBeAddedInSquad(results.data?.createRequestToBeAddedInASquad.id)
//         if(existingRequestsToBeAddedInASquadArr === null || existingRequestsToBeAddedInASquadArr === undefined){
//           let newArr  = []
//           console.log("here is the new request ID inside the if statement", newRequestID)
//           newArr.push(newRequestID)
//           console.log("here is the new array", newArr)
//           setExistingRequestsToBeAddedInASquadArr(newArr)
//           console.log("this should be the update array", existingRequestsToBeAddedInASquadArr)
//           return true
//         }else{
//           console.log("here is the existing requests to be added in a squad before addition", existingRequestsToBeAddedInASquadArr)
//           console.log("here is the new request ID inside the else statement", newRequestID)
//          const newExistingArr = existingRequestsToBeAddedInASquadArr.push(newRequestID)
//          setExistingRequestsToBeAddedInASquadArr(newExistingArr)
//          const newArr = [newRequestID]
//          console.log("here is tha new  array before updating", newArr)
//          setNewCurrentUserResquestToBeAddedInASquadArr(newArr)
//          return true
//         }
         
//       }catch(error){
//        console.log("error creating a existing notification requestToBeAddedInASquad  ❌", error)
//      }
// }



  // const handleExistingNotificationUpdate=async()=>{
  // if(existingRequestsToBeAddedInASquadArr === null || existingRequestsToBeAddedInASquadArr === undefined){
  //   console.log("the existing request to be added in other squads is still empty: ", existingRequestsToBeAddedInASquadArr)
  // }else{
  //   console.log("here is the previoulsy existing squad joined array", existingRequestsToBeAddedInASquadArr)
  //   try {
  //     const existingNotificationUpdateResult = await API.graphql(
  //       graphqlOperation(updateNotification, {
  //         input: { id: currentUserNotificationID,   squadAddRequestsArray: existingRequestsToBeAddedInASquadArr} 
  //       })
  //     );
  //     console.log("existing notification update successfu✅✅✅", existingNotificationUpdateResult.data?.updateNotification)
  //   } catch (error) {
  //     console.log("error updating new notificationcreated❌",error)
  //   }
  // }
  // }

 
//  const handleDeletingRequestToBeAddedToASquad=async()=>{
//     const requestToBeAddedInASquadID = newCurrentUserResquestToBeAddedInASquadArr.pop()
//     console.log("here is the requestToBeAddedInASquadID that was deleted",requestToBeAddedInASquadID)
//     try {
//       // Execute the mutation with the input data
//       const { data } = await deleteRequestToBeAddedInASquad({
//         variables: {
//           id:currentUserNewRequestToBeAddedInSquad
//         },
//       });

//       // Handle the response if needed
//       console.log('Request deleted:', data.deleteRequestToBeAddedInASquad);
//     } catch (error) {
//       // Handle errors
//       console.log('Error deleting request:', error);
//     }
//   }

  
    // //handle updating notification
    // const handleNotificationAfterDeleteUpdate = async()=>{
    //   //update notification
    //   try {
    //     const resultFromDeletedRequestToBeAddedInAsquadNotification = await API.graphql(graphqlOperation(updateNotification, {input:{id: currentUserNotificationID, squadAddRequestsArray:newCurrentUserResquestToBeAddedInASquadArr}}))
    //     console.log("updating the old notification by deleting the requestToBeAdded in a squad successful", resultFromDeletedRequestToBeAddedInAsquadNotification)
    //     console.log("the corresponding ID", resultFromDeletedRequestToBeAddedInAsquadNotification.data?.updateNotification?.id)
    //     setCurrentUserNewNotificationID(resultFromDeletedRequestToBeAddedInAsquadNotification.resultFromDeletedRequestToBeAddedInAsquadNotification.data?.updateNotification?.id)
    //   } catch (error) {
    //     console.log("error updating the old notification by deleting the requestToBeAdded in a squad successful",error )
    //   }
    // }

        // //handleSquadUserDelete and Current SquadJoined Array
        // const handleSquadUserDelete=async()=>{
        //   const deletedSquadJoinedID = currentUserSquadJoinedArray.pop()
        //   setCurrentUserSquadJoinedArray(currentUserSquadJoinedArray)
        //   console.log("here is the deleted squad joined", deletedSquadJoinedID)
        //   try {
        //     const resultForDeletingSquadUser = await API.graphql(graphqlOperation(deleteSquadUser,{input:{id: currentUserID}}))
        //     console.log("results from deleting a squad user",resultForDeletingSquadUser)
        //   } catch (error) {
        //     console.log("error deleting squad user", error)
        //   }
        // }
        // //finally update the user
        // const handleUpdateUserAfterDeletion=async()=>{
        //   try {
        //     const resultsForUpdatingUserAfterDeletingSquadJoinedArr = await API.graphql(graphqlOperation(updateUser,{input:{userID:currentUserID, squadJoined:currentUserSquadJoinedArray}}))
        //     console.log("here is the results for updating the user after deleting one of their squad joined", resultsForUpdatingUserAfterDeletingSquadJoinedArr)
        //   } catch (error) {
        //     console.log("error updating squad joined array after latets deletion", error)
        //   }
        // }


      const handleSquadCreation = async () => {
        if (selected === false) {
        //check if the user has notification 
            const userHasNotification = await checkIfCurrentUserHasNotification()
                if(userHasNotification === false){
                  setSelected(true)
                  const newNotificationIDCreated = await handleNotificationProduction()
                  if(newNotificationIDCreated !==false){
                    //create the request
                    const requestId = await handleRequestToBeAddedInASquadCreation(newNotificationIDCreated)
                    if(requestId !== false){
                      //local update the notification 
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
                  console.log("the user has notification")
                  const canAddToSquad = await possibleToAddCurrentUserToLocalUserSquad()
                  if(canAddToSquad === true){
                    setSelected(true)
                    //create the requestToAddRequest
                    console.log("we can move on")
                    const status = await checkIfCurrentUserHasNotification()
                    if(status !== false){
                      const requestID = await handleRequestToBeAddedInASquadCreation()
                      if(requestID!==false){
                        const updatedArray = await handleUpdatesquadAddRequestsArrayLocally(currentUserNotification, requestID)
                        if(updatedArray!==false){
                        const globallyUpdateArray = await handleGlobalNotificationUpdate(updatedArray)
                          if(globallyUpdateArray !== false){
                           console.log("the notification update successfull✅✅")
                          }else{
                             console.log("the notification update unsuccessfull")
                          }
                        }else{
                         console.log("failure to locally update")
                        }
                     }
                    }
                   
                    // //update the notification locally 
                   
                  }
                }





            //const canAddToSquad = await possibleToAddCurrentUserToLocalUserSquad();
            //console.log(canAddToSquad)
            // if (canAddToSquad === true) {
            //   setSelected(true);
            //     console.log("Let's proceed");
            //     //add the current user to the local user's squad
            //     handleAddCurrentUserToLocalSquadJoinedArray();
            //     //create the squad user
            //     handleCreateNewSquadUser()
            //     if(currentUserHasNotification === false){
            //       handleCreateNewNotification()
            //         .then(() => {
            //           // Now that the notification is created, call the function to create the request
            //           handleNewCreateRequestToBeAddedInASquad ()
            //         })
            //         .catch(error => {
            //           console.log("Error creating notification:", error);
            //         });
            //         handleNewNotificationUpdate()
            //       }else{
            //         //create the request
            //         //handleExistingCreateRequestToBeAddedInASquad()
            //         const canUpdate = await handleExistingNotificationNewRequestToBeAddedInASquad()
            //         if(canUpdate===true){
            //           handleExistingNotificationUpdate()
            //         }
                    
            //       }
            // } 
            // else {
            //   //console.log("the user is already in your squad")
            //    Alert.alert("user is already in your squad🫢, you can edit you squad in your squad page!☺️")
            // }
        } else {
          console.log("we can not move on")
            setSelected(false);
            // handleDeletingRequestToBeAddedToASquad()
            // handleNotificationAfterDeleteUpdate()
            // handleSquadUserDelete()
            // handleUpdateUserAfterDeletion()
            
        }
    };
            //if the user is not in the squad already
            // if(handleCurrentUserSquadJoinedArrayUpdate()===true){
            //    handleCreateNewSquadUser()  
            //   if(!currentUserHasNotification){
            //     handleCreateNewNotification()
            //     handleCreateRequestToBeAddedInASquad()
            //     handleNewNotificationUpdate()
            //     console.log("user has no notifications")
            //         }else{
            //           console.log("the user has notification")
            //           handleExistingNotificationNewRequestToBeAddedInASquad()
            //           handleExistingNotificationUpdate()
            //         }

            //    }else{
            //     console.log("the user is already in your squad")
            //     Alert.alert("user is already in your squad🫢, you can edit you squad in your squad page!☺️")
            //     setSelected(false)
            //     return
            //    }
            
           
              //   //remove the latest thing to be added in the existingRequestToBeAddedInASquadArr and delete it from backend
              //   handleDeletingRequestToBeAddedToASquad()
              //   //update notification 
              //   handleNotificationAfterDeleteUpdate
              //   //update the squadJoined Array
              //  handleSquadUserDelete()
              //   //update the user
              //  handleUpdateUserAfterDeletion()

         
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
        //borderColor: "#FFFF",
        //height: 100,
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 1.5,
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