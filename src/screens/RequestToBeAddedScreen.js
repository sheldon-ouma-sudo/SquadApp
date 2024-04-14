import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestToBeAddedToASquadListItem from '../components/ActivityListItems/RequestToBeAddedToASquadListItem'
import { API, graphqlOperation } from "aws-amplify";
import {useUserContext} from './../../UserContext'
import { getRequestToBeAddedInASquad, notificationsByUserID } from '../graphql/queries'




const RequestToBeAddedToSquadsScreen = () => {
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState()
  const[requestParent, setRequestParent] = useState()


   const {user} = useUserContext()


  //console.log(user)
  useEffect(() => {
    const fetchRequestToBeAddedToSquadsData = async () => {
          const userID = user.id
          console.log("here is the user id", userID)
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
 
  useEffect(() => {
    const handleRequestToBeAddedSquad = async () => {
      if (requestToBeAddedToSquadsData) {
        console.log("here is the requestToBeAdded ID Array", requestToBeAddedToSquadsData);
        for (const squadRequestToBeAddedID of requestToBeAddedToSquadsData) {
          console.log("here is the current ID", squadRequestToBeAddedID);
          try {
            const squadRequestToBeAddedResults = await API.graphql(graphqlOperation(getRequestToBeAddedInASquad, {
              id: squadRequestToBeAddedID
            }));
            console.log("here is the squad request result", squadRequestToBeAddedResults.data?.getRequestToBeAddedInASquad);
          } catch (error) {
            console.log("error getting the squad request", error);
          }
        }
      }
    };
  
    handleRequestToBeAddedSquad();
  }, [requestToBeAddedToSquadsData]);
  






  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >
    <View style={styles.pollRequestContainer}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: -200 }}>Poll Response</Text>
      <FlatList
        data={requestToBeAddedToSquadsData}
        renderItem={({ item }) => 
        <RequestToBeAddedToASquadListItem
        item={item} 
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
  pollRequestContainer:{
  
  },
  pollResponseContainer:{}
  })



export default RequestToBeAddedToSquadsScreen