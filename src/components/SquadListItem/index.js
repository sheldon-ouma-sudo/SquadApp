import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createNotification, createRequestToAJoinSquad, createSquadUser, updateNotification, updateUser } from "../../graphql/mutations";
import { graphqlOperation, Auth, API } from 'aws-amplify';
import { notificationsByUserID } from "../../graphql/queries";
//import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//import { graphql } from "graphql";
import { getUser } from "../../graphql/queries";

dayjs.extend(relativeTime);

const SquadListItem =({ squad,
  userInfo,
  onPress = () => {},
  selectable = false,
  isSelected = false,})=>{
 const navigation = useNavigation()
 const[squadSelected, setSquadSelected] = useState(false)
 ///const [userSquadsJoinedArray, setUserSquadsJoinedArray] = useState([])
 const [currentUserID, setCurrentUserID] = useState("")
 const [currentUserName, setCurrentUserName] = useState("")
 const [currentUserHasNotification, setCurrentUserHasNotifications] = useState(false)
 const [currentUserNotificationID, setCurrentUserNotificationID] = useState("")
 const [existingJoinCurrentUserASquadArr, setExistingJoinCurrentUserASquadArr] = useState([])
 const [localUserSquadJoinedArray, setLocalUserSquadJoinedArray] = useState([])
 const [localUserID,  setLocalUserID] = useState("")
 const [currentUserSquadID, setCurrentUserSquadID] = useState("")
 const [newCurrentUserCreatedNotification, setNewCurrentUserCreatedNotification] = useState("")
 const [newRequestToJoinCurrentSquadArr, setNewRequestToJoinCurrentUserSquadArr] = useState([])
 const [localUserName,  setLocalUserName]=useState()



            useEffect(() => {
              const fetchLocalSquadJoinedData = async () => {
                if (userInfo) {
                  const localUSERID = userInfo.id
                  setLocalUserID(localUSERID)
                  //console.log("we have local user data",userInfo);
                  // console.log("here is the number of squads the local user has joined", userInfo.numOfSquadJoined)
                  const numOfSquadJoined = userInfo.numOfSquadJoined
                  //console.log("here is the number of squad joined by the user", numOfSquadJoined)
                 //c setLocalUserNumOfSquadJoined(numOfSquadJoined)
                  //console.log("here is the squads the local user has joined", userInfo.squadJoined)
                  const squadsJoinedByLocalArr = userInfo.squadJoined
                  setLocalUserSquadJoinedArray(squadsJoinedByLocalArr)
                  const local_Username = userInfo.name
                  console.log("here is the local username", local_Username)
                  setLocalUserName(local_Username)
                  //setSquadToBeJoined(userInfo.userSquadId); // Access userSquadId directly
                }
                }
                fetchLocalSquadJoinedData()
            }, []);
            
          
            useEffect(() => {
              const fetchCurrentSquadAuthUserData = async () => {
                if (userInfo) {
                  //console.log("here is the currentUser",squad.authUserID);
                  const currentUserSquadCreatedArray = [squad.id]
                  //console.log("here is the authuser squad created", currentUserSquadCreatedArray)
                  const userID = squad.authUserID
                  setCurrentUserID(userID)
                  const squadID = squad.id
                  setCurrentUserSquadID(squadID)

                  try {
                    //console.log("here is the ")
                    const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
                    //console.log("successful getting the user✅",userData)
                    const userFromBackend = userData.data?.getUser;
                    //console.log("here is the user from backend ", userFromBackend)
                    // Update state with the user information
                    setCurrentUserName(userFromBackend.name)
                  } catch (error) {
                    console.log("error getting the squad creator", error)
                  }
                //check if the user has notifications 
                //console.log("here is current user name", currentUserName)
                try {
                  //const user_ID = user.id
                  //console.log("here is the user id in try catch", user_ID)
                  const notificationQueryResult = await API.graphql(
                    graphqlOperation(notificationsByUserID, { userID: userID })
                  );
                    
                  //console.log("result from notification query",notificationQueryResult)
                  const notifications = notificationQueryResult.data?.notificationsByUserID.items;
                  //console.log("here are the notifications", notifications)
                  if (notifications.length > 0) {
                    //console.log("User has notifications:", notifications);
                    //console.log("here is user's notification id:",notifications[0].id)
                    const notificationID = notifications[0].id
                    console.log("here is the notification ID", notificationID)
                    setCurrentUserNotificationID(notificationID)
                    setCurrentUserHasNotifications(true)
                    //console.log("here is the current user's squad join request array", notifications[0].SquadJoinRequestArray)
                    const currentUserSquadJoinedList = notifications[0].SquadJoinRequestArray
                    if(currentUserSquadJoinedList == null || currentUserSquadJoinedList === undefined){
                      const newArrCreated = []
                      setExistingJoinCurrentUserASquadArr(newArrCreated)
                    }else{
                      console.log("the user existing squad joined request is not undefined or empty", currentUserSquadJoinedList)
                      setExistingJoinCurrentUserASquadArr(currentUserSquadJoinedList)
                    }
                    //console.log("here is the current users SquadJoinRequestArray", currentUserSquadJoinedList)
                   
                  } else {
                        console.log("User has no notifications.");
                        setCurrentUserHasNotifications(false);
                   }
                } catch (error) {
                  console.log("error getting current user notification", error)
                }

                }
                }
                fetchCurrentSquadAuthUserData()
            }, [squad, userInfo]);
          

        




    //2. check if it is possible to add current users to the local user squad
        const possibleToJoinCurrentSquad = async () => {
          console.log("here is the local user squad joined array before checking", localUserSquadJoinedArray)
          if (localUserSquadJoinedArray.includes(squad.id)) {
              console.log("No, the local user is already in this squad!");
              return false;
          } else {
              console.log("Yes sir, you may proceed");
              return true;
          }
            };

    //         const handleLocalUserRequestToJoinCurrentUserSquadrray = async () => {
    //          console.log("here is the local user joined array before addition", localUserSquadJoinedArray)
    //          console.log("current user squad Id", currentUserSquadID)
    //          localUserSquadJoinedArray.push(currentUserSquadID)
    //          const newSquadJoined = localUserSquadJoinedArray
    //          const numOfSquadJoined = localUserNumOfSquadJoined + 1
    //          console.log("here is the new number of local squad user has joined", numOfSquadJoined)
    //          setLocalUserNumOfSquadJoined(numOfSquadJoined)
    //          console.log("here is the local user new joined array aftern addition", localUserSquadJoinedArray)
    //          console.log("here is the new squad joined", newSquadJoined)
    //          setLocalUserSquadJoinedArray(newSquadJoined)
    //         }
         

    //         const handleLocalUserUpdateInfo = async()=>{
    //           console.log("here is the new local user squadJoined", localUserSquadJoinedArray)
    //           console.log("here is the local user id", localUserID)
    //           console.log("here is the number of squads the user has joined", userInfo.numOfSquadJoined)
    //           console.log("here is the number of squads the user has joined", localUserNumOfSquadJoined)
    //           try {
    //             const result = await API.graphql(graphqlOperation(updateUser, {input:{id: localUserID, squadJoined: localUserSquadJoinedArray, numOfSquadJoined:localUserNumOfSquadJoined}}))
    //             console.log("local user update info successful✅", result)
    //           } catch (error) {
    //             console.log("error updating the local user", error)
    //           }
    //         }


    //         //create new userSquad
    //         const handleCreateUserSquad=async()=>{
    //           console.log("here is the local user ID", localUserID)
    //           console.log("here is the squad id", currentUserSquadID)
    //           try {
    //             const results = await API.graphql(graphqlOperation(createSquadUser,
    //                {input:{
    //                 userId:localUserID,
    //                 squadId: currentUserSquadID
    //                }}))
    //                console.log("creating new squad user successful✅", results)
    //           } catch (error) {
                
    //           }

    //         }


            const handleCurrentSquadAuthUserNotificationCreation = async()=>{
              try {
                console.log("before we start here is the current user ID", currentUserID)
                if(!currentUserID){
                  console.log("the current user id is still loading")
                }else{
                const results = await API.graphql(graphqlOperation(createNotification, {
                  input: { userID:currentUserID}
                }));
              
               // console.log("here is the notification created successfully✅",results)
                //  console.log("here is the notification ID:", results.data?.createNotification?.id)
                const newNotificationCreatedID = results.data?.createNotification?.id
                console.log("the new notification ID created is the following: ",newNotificationCreatedID)
                setNewCurrentUserCreatedNotification(newNotificationCreatedID)
                setCurrentUserNotificationID(newNotificationCreatedID)
                console.log("here is the new notification",newCurrentUserCreatedNotification)
                return newNotificationCreatedID;
              }
              }catch(error){
                console.log("error creating a new notification ❌", error)
              return false;
              }  
              }


           const handleRequestToJoinCurrentSquadCreation=async(notification_ID)=>{
            console.log("here is the notification ID", notification_ID)
            const Message = localUserName + " has asked to joined the Squad"

            try {
              const results = await API.graphql(graphqlOperation(createRequestToAJoinSquad, 
                {input:{
                  notificationID : notification_ID,
                  message: Message
                }}
                ))
                console.log("success creating new request to join current user squad ID✅", results)
                const requestToJoinSquadID = results.data?.createRequestToAJoinSquad.id;
                console.log("here is the request to join squad", requestToJoinSquadID)
                console.log("here is the newRequestToJoinCurrentSquadArr", newRequestToJoinCurrentSquadArr)
                const arr = []
                const array = arr.push(requestToJoinSquadID)
                setNewRequestToJoinCurrentUserSquadArr(array)
                console.log("here is the new current user requests to join the squads", newRequestToJoinCurrentSquadArr)
                return requestToJoinSquadID; 
            } catch (error) {
              console.log("error creating creating RequestToAJoinSquad, ", error)
              return false;
            }
           }



    //RequestToJoinSquadArrayUpdate
      const handleCurrentSquadAuthUserRequestToJoinSquadArrayUpdate=async(createdRequestToJoinSquadID)=>{
        console.log("here is the existing user notification ID",newCurrentUserCreatedNotification)
        console.log("here is the new ID of the createdNotificationID", createdRequestToJoinSquadID)
        try {
          console.log("the existing requestToJoinSquadArray", existingJoinCurrentUserASquadArr )
          if(existingJoinCurrentUserASquadArr !== null || existingJoinCurrentUserASquadArr !== undefined){
            console.log("here is the existing request to join squads array", existingJoinCurrentUserASquadArr)
           const newArray = existingJoinCurrentUserASquadArr
           console.log("here is the existing array before updating")
           newArray.push(createdRequestToJoinSquadID)
           console.log("here is the new array after updating", newArray)
           setExistingJoinCurrentUserASquadArr(newArray)
           console.log("here  is the updated array", newArray)
           return newArray;
          }else{
            console.log("existing joint squad array locally is undefined or null")
            const newArray = []
            newArray.push(createdRequestToJoinSquadID)
            setExistingJoinCurrentUserASquadArr(newArray)
            return newArray;
          }
          
        } catch (error) {
          console.log("error updating the notification's request to join squad array",error)
          return false;
        }
      }
    
   
     //update notification 
     const handleUpdateNotification = async (array, notificationID) => {
      console.log("here is the notification id", notificationID);
      console.log("here is the array needed to be updated", array);
      try {
        const results = await API.graphql(graphqlOperation(updateNotification, {
          input: {
            id: notificationID, // Assuming 'notificationID' is the correct field name in your schema
            SquadJoinRequestArray: array // Make sure the field name matches the schema (camelCase)
          }
        }));
        console.log("update new user notification update successful ✅", results);
        return true;
      } catch (error) {
        console.log("error updating the new current user notification", error);
        return false;
      }
    }
    

    // const handleCurrentUserAuthUserNotificationUpdate = async()=>{
    //   console.log("here is the existing current user notificationId", currentUserNotificationID)
    //   try {
    //     const results = await API.graphql(graphqlOperation(createRequestToAJoinSquad, {input:{
    //       notificationID: currentUserNotificationID
    //     }}))
    //     console.log("success in creating ExistingNotificationRequestToJoinSquadArray squad✅", results)
    //     const resultsID = results.data?.createRequestToAJoinSquad.id
    //     console.log("here is the new results ID", resultsID)
    //     console.log("existingUserJointCurrent before the if statement", existingJoinCurrentUserASquadArr)
    //     if (existingJoinCurrentUserASquadArr === null || existingJoinCurrentUserASquadArr === undefined) {
    //       console.log("the array is still empty");
    //      const newArr = []
    //       newArr.push(resultsID);
    //       console.log("here is the new array", newArr);
    //       setExistingJoinCurrentUserASquadArr(newArr);
    //       console.log("attempt to change the array just before returning")
    //       return newArr
    //     } else {
    //       existingJoinCurrentUserASquadArr.push(resultsID)
    //       console.log("Here is the existing current user squad join request array before addition of the new existing request", existingJoinCurrentUserASquadArr)
    //       const newArr = existingJoinCurrentUserASquadArr
    //       console.log("here is the existing current request update before setting ", newArr);
    //       setExistingJoinCurrentUserASquadArr(newArr);
    //       return newArr
    //     }
    //   } catch (error) {
    //     console.log("error creating a new squad join request❌", error)
    //   }
    // }

    // const handleExistingNotificationRequestToJoinSquadUpdate=async(arr)=>{

    //    console.log("here is the existing current user notificationId", currentUserNotificationID)
    //    if(existingJoinCurrentUserASquadArr===undefined){
    //     console.log("here is the existing current user notification requestToJoin array is empty", existingJoinCurrentUserASquadArr)
    //     console.log("so instead we will use this", arr)
    //     try {
    //       const resultFromDeletedRequestToBeAddedInAsquadNotification = await API.graphql(graphqlOperation(updateNotification, {input:{id: currentUserNotificationID, SquadJoinRequestArray:arr}}))
    //       console.log("updating existing user notification successful✅", resultFromDeletedRequestToBeAddedInAsquadNotification)
    //      } catch (error) {
    //       console.log("error updating existing user notifications request to join❌", error)
    //      }
    //    }else{
      
    //    try {
    //     const result = await API.graphql(graphqlOperation(updateNotification, {input:{
    //       id: currentUserNotificationID,
    //       SquadJoinRequestArray: existingJoinCurrentUserASquadArr
    //     }}))
    //     console.log("updating existing user notification successful✅", result)
    //    } catch (error) {
    //     console.log("error updating existing user notificationsnotifications❌", error)
    //    }
    //   }
    //   }

    //add the squad selected to the user's joined squad array
      const handleSquadSelected=async() =>{
        console.log("here is the squad name",squad.squadName)
        console.log("here is the user squadJoined array",localUserSquadJoinedArray)
            const canAddToSquad = await possibleToJoinCurrentSquad();
            if(canAddToSquad === true){
             console.log("yes you can join this squad")
             if(squadSelected==false){
              setSquadSelected(true)
              if(currentUserHasNotification===false){
                console.log("user has no notification")
                const notificationID = await handleCurrentSquadAuthUserNotificationCreation()
                if(notificationID !==false){
                  //if successfully created the notification, create a new request to join squad
                  const requestToJoinSquadID = await handleRequestToJoinCurrentSquadCreation(notificationID)
                  if(requestToJoinSquadID !== false){
                    console.log("successfully received the newl", requestToJoinSquadID)
                    const locallyUpdatedCurrentSquadAuthUserRequestToJoinSquadArray = await handleCurrentSquadAuthUserRequestToJoinSquadArrayUpdate(requestToJoinSquadID)
                    if(locallyUpdatedCurrentSquadAuthUserRequestToJoinSquadArray !== false){
                      console.log("request to join squad array update successful")
                      //update the notification
                      handleUpdateNotification(locallyUpdatedCurrentSquadAuthUserRequestToJoinSquadArray, notificationID)
                    }else{
                      console.log("request to join squad array update unsuccessful")
                    }
                  }else{
                    console.log("Error creating the requestToJoinSquad")
                  }
                }
              }else{
                console.log("the current squad auth user already has notification", currentUserNotificationID)
                console.log('here is the user current notification ID',  currentUserNotificationID)
                //get the request ID 
                const requestID = await handleRequestToJoinCurrentSquadCreation(currentUserNotificationID)
                if(requestID !== false){
                  //update request Array
                  const requestArr = await handleCurrentSquadAuthUserRequestToJoinSquadArrayUpdate(requestID)
                  if(requestArr !== false){
                    //handle the notification update
                    console.log("we have received the updated the request array", requestArr)
                    const updateNotificationSuccess = await handleUpdateNotification(requestArr, currentUserNotificationID)
                    if(updateNotificationSuccess===true){
                      console.log("update the notification successful")
                    }else{
                      console.log("update notification unsuccessful")
                    }

                  }else{
                    console.log("error updating the notification's request to join squad array")
                  }
                }else{
                  console.log("error creating the request ID")
                }

              }
            }else{
              Alert.alert("You have already joined this squad!")
              setSquadSelected(false)
            }
          }
          }
          
 return (
   <Pressable
   style={styles.container}
   behavior="padding"
   >
  <View
   style={styles.userImageContainer}
  >
  <FontAwesome name="group" size={34} color="#1145FD" style={{marginTop:-25}}/>
  </View>
  <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
   <View
   style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
   >
       <Text
        style = {styles.squadNameText}
       > 
       {squad?.squadName}
       </Text>
       <Text
       style = {styles.squadCreator}
       >
         Created by {currentUserName}
       </Text>
     </View>
     <TouchableOpacity
          style={[
            { justifyContent: "flex-end" },
            { alignItems: "center" },
            squadSelected ? styles.joinedSquadTextContainer : styles.joinSquadTextContainer, // Add this condition
          ]}
          onPress={handleSquadSelected}
        >
        <Text style={{ color: squadSelected ? "#1145FD" : "white", marginBottom: 10 }}>
            {squadSelected ? "Request Sent!" : "Join Squad"}
          </Text>
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