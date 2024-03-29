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
          const userID = user.id
          console.log(" here is poll request data", pollRequestData)
          console.log("here is the user id", userID)
      
      for(const pollRequestID of pollRequestData){
        //retrieve the poll request info
        try {
          console.log("here is the pollRequestID", pollRequestID)
          const pollRequestQueryResults = await API.graphql(graphqlOperation(getPollRequest, { id: pollRequestID}));
  
          console.log("here are the poll requests results", pollRequestQueryResults.data?.getPollRequest)
          const pollItem = pollRequestID.data?.getPollRequest
          if(pollItem){
            setPoll(pollItem)
          }else{
            console.log("the polls are still null")
          }
          
        } catch (error) {
          console.log("error getting poll request Info", error)
        }
      }



     };
     fetchPollRequestInfo();
  }, [pollRequestData]);
 
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