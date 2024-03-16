import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestToBeAddedToASquadListItem from '../components/ActivityListItems/RequestToBeAddedToASquadListItem'
import { API, graphqlOperation } from "aws-amplify";
import {useUserContext} from './../../UserContext'




const RequestToBeAddedToSquadsScreen = () => {
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState()

  //console.log(user)
  useEffect(() => {
    const fetchRequestToBeAddedToSquadsData = async () => {
          const userID = user.id
          console.log("here is the user id", userID)
      // try {
      //   const notificationQueryResult = await API.graphql(
      //     graphqlOperation(notificationsByUserID, { userID: userID })
      //   );
      //   if(!notificationQueryResult.data?.notificationsByUserID){
      //     console.log("Error fetching users") 
      //   }
      //   console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
      //     const notificationData = notificationQueryResult.data?.notificationsByUserID.items
      //     const pollRequestsArray = notificationData[0].pollRequestsArray;
      //     console.log("here is the poll request array",pollRequestsArray)
      //     setPollRequestData(pollRequestsArray)

      // } catch (error) {
      //   console.log("error fetching the notifications",error)
      // }
     };
     fetchRequestToBeAddedToSquadsData();
  }, []);
 

  return (
    <View>
      <Text>RequestToBeAddedScreen, we are here</Text>
    </View>
  )
}

export default RequestToBeAddedToSquadsScreen