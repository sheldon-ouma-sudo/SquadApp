import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify";
import PollResponseActivity from './../components/ActivityListItems/PollResponseListItem'
import {useUserContext} from './../../UserContext'


const PollResponse = () => {
  const[pollResponseData, setPollResponseData] = useState([])
  const {user} = useUserContext()

  useEffect(() => {
    const fetchPollResponse = async () => {
          const userID = user.id
          console.log("here is the user id", userID)
      try {
        const notificationQueryResult = await API.graphql(
          graphqlOperation(notificationsByUserID, { userID: userID })
        );
        if(!notificationQueryResult.data?.notificationsByUserID){
          console.log("Error fetching users") 
        }
        console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
          const notificationData = notificationQueryResult.data?.notificationsByUserID.items
          const pollResponseArray = notificationData[0].pollResponseArray;
          console.log("here is the poll request array",pollResponseArray)
          setPollResponseData(pollResponseArray)
      } catch (error) {
        console.log("error fetching the notifications",error)
      }
     };
     fetchPollResponse();
  }, []);
 

  return (
    <View>
      <Text>PollResponse</Text>
    </View>
  )
}

export default PollResponse