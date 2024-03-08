import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";
import PollResponseComponent from './../components/PollRequestListItem'
import PollRequestComponent from './../components/PollResponseListItem'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {useUserContext, user} from './../../UserContext'
import { ScrollView } from 'react-native-gesture-handler'

const PollRequest = () => {
  const[pollRequestData,setPollRequestData] = useState([])
  const[pollResponseData, setPollResponseData] = useState([])
  const {user} = useUserContext()
  //console.log(user)
  useEffect(() => {
    const fetchRequestToAddUserToSquads = async () => {
          //console.log(user)
          //console.log("here is the user id", user.id)
          const userID = user.id
      try {
        const notificationQueryResult = await API.graphql(
          graphqlOperation(notificationsByUserID, { userID: userID })
        );
        if(!notificationQueryResult.data?.notificationsByUserID){
          console.log("Error fetching users") 
        }
        console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
          const notificationData = notificationQueryResult.data?.notificationsByUserID.items
          const squadAddRequestsArray = notificationData[0].squadAddRequestsArray;
          console.log("here is the squadAddRequestArray",squadAddRequestsArray)
          //setRequestToBeAddedToSquadsData(squadAddRequestsArray)
      } catch (error) {
        console.log("error fetching the notifications",error)
      }
     };
     fetchRequestToAddUserToSquads();
  }, []);
 



  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.pollRequestContainer}>
    <Text
     style={{fontWeight:'bold', fontSize:18}}
    >Poll Requests</Text>
    </View>   

  <View
  style={styles.pollResponseContainer}
  >
    <Text
     style={{fontWeight:'bold',
     fontSize:18
     }}>
      Poll Responses</Text>
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