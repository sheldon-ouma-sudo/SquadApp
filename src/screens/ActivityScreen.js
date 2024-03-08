import { View, Text, KeyboardAvoidingView, StyleSheet,  } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {useUserContext, user} from '../../../UserContext'



const ActivityScreen = () => {
  const[requestToJoinUserSquadsData,setRequestToJoinUserSquadData] = useState([])
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState([])


  useEffect(() => {
    const fetchRequestToJoinUserSquads = async () => {
    //   try {
    //     const results = await API.graphql(graphqlOperation(listPolls));
    //     if(!results.data?.listPolls){
    //       console.log("Error fetching users") 
    //     }
    //     console.log("this is the list of the Polls",results.data.listPolls.items)
    //       setPolls(results.data?.listPolls?.items)
    //   } catch (error) {
    //     console.log(error)
    //   }
     };
    fetchRequestToJoinUserSquads();
  }, []);
 

  useEffect(() => {
    const fetchRequestToBeAddedToSquadsData = async () => {
    //   try {
    //     const results = await API.graphql(graphqlOperation(listPolls));
    //     if(!results.data?.listPolls){
    //       console.log("Error fetching users") 
    //     }
    //     console.log("this is the list of the Polls",results.data.listPolls.items)
    //       setPolls(results.data?.listPolls?.items)
    //   } catch (error) {
    //     console.log(error)
    //   }
     };
     fetchRequestToBeAddedToSquadsData ();
  }, []);
 

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.pollRequestContainer}>
    <Text
     style={{fontWeight:'bold', fontSize:18, marginRight:200}}
    >Requests To Join Squads</Text>
    </View>   

  <View
  style={styles.pollResponseContainer}
  >
    <Text
     style={{fontWeight:'bold',
     fontSize:18,
     marginRight:200
     }}>
      Requests to Join Your Squad</Text>
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
export default ActivityScreen