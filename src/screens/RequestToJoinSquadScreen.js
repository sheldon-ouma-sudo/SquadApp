import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestToJoinASquadListItem from '../components/ActivityListItems/RequestToJoinSquadsListItem'
import { API, graphqlOperation } from "aws-amplify";
import {useUserContext} from './../../UserContext'
import { notificationsByUserID } from '../graphql/queries'



const RequestToJoinSquadScreen = () => {
   const[requestToJoinPersonalSquadsData, setRequestToJoinPersonalSquadsData] = useState([])
  const {user} = useUserContext()


  //console.log(user)
  useEffect(() => {
    const fetchRequestToJoinPersonalSquadsData = async () => {
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
                const SquadJoinRequestArray = notificationData[0].SquadJoinRequestArray;
                console.log("here is the poll request array",SquadJoinRequestArray)
                if(SquadJoinRequestArray){
                 setRequestToJoinPersonalSquadsData(SquadJoinRequestArray )
                }else{
                  console.log("request to be added in squad array is still empty")
                }
               

            } catch (error) {
              console.log("error fetching the notifications",error)
            }
     };
     fetchRequestToJoinPersonalSquadsData();
  }, []);
 

    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.pollRequestContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: -200 }}>Poll Response</Text>
        <FlatList
          data={requestToJoinPersonalSquadsData}
          renderItem={({ item }) => 
          <RequestToJoinASquadListItem 
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
  
  

export default RequestToJoinSquadScreen 