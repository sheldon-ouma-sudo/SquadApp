import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPollRequest, notificationsByUserID } from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify";
import PollRequestComponent from './../components/ActivityListItems/PollRequestListItem.js'
import {useUserContext} from './../../UserContext'



//remember the to cojoin the poll request data and poll request in one useEffect
const PollRequest = () => {

  const[pollRequestData,setPollRequestData] = useState([])
  const[poll, setPoll] = useState()
  const {user} = useUserContext()
  //console.log(user)
  useEffect(() => {
    const fetchPollRequest = async () => {
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
          const pollRequestsArray = notificationData[0].pollRequestsArray;
          console.log("here is the poll request array",pollRequestsArray)
          setPollRequestData(pollRequestsArray)

      } catch (error) {
        console.log("error fetching the notifications",error)
      }
     };
     fetchPollRequest();
  }, []);
 
  useEffect(() => {
    const fetchPollRequestInfo = async () => {
      const userID = user.id;
      console.log("User ID:", userID);
  
      for (const pollRequestID of pollRequestData) {
        try {
          console.log("Poll Request ID:", pollRequestID);
          
          // Retrieve the poll request info
          const pollRequestQueryResults = await API.graphql(graphqlOperation(getPollRequest, { id: pollRequestID }));
          const pollRequest = pollRequestQueryResults.data?.getPollRequest;
  
          console.log("Poll Request:", pollRequest);
  
          if (pollRequest) {
            // Extract the poll ID from the poll request
            const pollID = pollRequest.pollRequestPollId;
  
            if (pollID) {
              // Fetch the associated poll using the poll ID
              const pollQueryResults = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
              const poll = pollQueryResults.data?.getPoll;
  
              console.log("Associated Poll:", poll);
  
              // Handle the fetched poll as needed (e.g., store it in state)
              // For example:
              // setPoll(poll);
            } else {
              console.log("Poll ID not found for the poll request:", pollRequestID);
            }
          } else {
            console.log("Poll request not found:", pollRequestID);
          }
        } catch (error) {
          console.log("Error getting poll request info:", error);
        }
      }
    };
  
    // Call the fetchPollRequestInfo function
    fetchPollRequestInfo();
  }, [pollRequestData, user.id]); // Add dependencies if needed
  
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.pollRequestContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Poll Requests</Text>
        <FlatList
          data={pollRequestData}
          renderItem={({ item }) =>
           <PollRequestComponent 
          item={item} 
          poll = {poll}
          
          />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",


  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70  
  },
  pollRequestContainer:{},
  pollResponseContainer:{}
})


export default PollRequest