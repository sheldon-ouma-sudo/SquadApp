import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";
import PollResponseComponent from './../components/ActivityListItems/PollRequestListItem.js'
import PollRequestComponent from './../components/ActivityListItems/PollRequestListItem.js'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {useUserContext, user} from './../../UserContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ScrollView } from 'react-native-gesture-handler'

const PollRequest = () => {
  
  const[pollRequestData,setPollRequestData] = useState([])
  const[pollResponseData, setPollResponseData] = useState([])
  const {user} = useUserContext()
  //console.log(user)
  useEffect(() => {
    const fetchPollRequest = async () => {
          //console.log(user)
          //console.log("here is the user id", user.id)
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
 



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.pollRequestContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Poll Requests</Text>
        <FlatList
          data={pollRequestData}
          renderItem={({ item }) => <PollRequestComponent item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.pollResponseContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Poll Responses</Text>
        <FlatList
          data={pollResponseData}
          renderItem={({ item }) => <PollResponseComponent item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default PollRequest
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