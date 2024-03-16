import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestToBeAddedToASquadListItem from '../components/ActivityListItems/RequestToBeAddedToASquadListItem'
import { API, graphqlOperation } from "aws-amplify";
import {useUserContext} from './../../UserContext'
import { notificationsByUserID } from '../graphql/queries'




const RequestToBeAddedToSquadsScreen = () => {
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState()

  //console.log(user)
  useEffect(() => {
    const fetchRequestToBeAddedToSquadsData = async () => {
          // const userID = user.id
          // console.log("here is the user id", userID)
            try {
              const notificationQueryResult = await API.graphql(
                graphqlOperation(notificationsByUserID, { userID: userID })
              );
              if(!notificationQueryResult.data?.notificationsByUserID){
                console.log("Error fetching notifications") 
              }
              console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
                const notificationData = notificationQueryResult.data?.notificationsByUserID.items
                const squadAddRequestsArray = notificationData[0].squadAddRequestsArray;
                console.log("here is the poll request array",squadAddRequestsArray)
                if(squadAddRequestsArray){
                  setRequestToBeAddedToSquadsData(squadAddRequestsArray )
                }else{
                  console.log("request to be added in squad array is still empty")
                }
               

            } catch (error) {
              console.log("error fetching the notifications",error)
            }
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