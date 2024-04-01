import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, ActivityIndicator,  ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import {getPoll, squadPollsBySquadId} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/SquadPollListItem/index";
import { useUserContext } from '../../UserContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const MySquadPollScreen = () => {
  const [squadPollData, setSquadPollData] = useState([])
  const [pollIDArray, setPollIDArray] = useState([])
  const [userSquadJoinedArray, setUserSquadJoinedArray] = useState([])
  const [squadID, setSquadID] = useState()
  const{user} = useUserContext()
  //console.log("here is the user", user)
    

//get all the squads the user has joined
    useEffect(()=>{
    if(user){
      console.log("here is the squad the user has joined", user.squadJoined)
      const userSquads = user.squadJoined
      setUserSquadJoinedArray(userSquads)
    }

    },[user])
   //get the squadPoll associated with the squads
   useEffect(() => {
    //get squads poll
    const handleSquadPollDataQuery = async () => {
      if (userSquadJoinedArray) {
        for (const squadID of userSquadJoinedArray) {
          //console.log("here is the squad ID", squadID)
          if (squadID) {
            setSquadID(squadID)
            try {
              //console.log("Squad ID:", squadID);
              const results = await API.graphql(graphqlOperation(squadPollsBySquadId, {
                squadId: squadID
              }))
              //console.log("here are the results for query", results.data?.squadPollsBySquadId)
              
              // Extract pollId from each squad poll
              const squadPolls = results.data?.squadPollsBySquadId;
              if (squadPolls) {
                const pollIds = squadPolls.items.map(item => item.pollId);
                //console.log("Poll IDs:", pollIds);
                setPollIDArray(pollIds)
              }
              
            } catch (error) {
              console.log("error querying for the squadpolls", error)
            }
          }
        }
      }
    }
    handleSquadPollDataQuery()
  }, [userSquadJoinedArray])
  
   useEffect(()=>{
    const handleSquadPollData=async()=>{
      console.log(pollIDArray)
      let array = []
      for(const pollID of pollIDArray){
        //console.log(pollID)
        try {
          const queryResults = await API.graphql(graphqlOperation(getPoll, {
            id:pollID
          }))
          //console.log("here is the poll results from the poll result query", queryResults.data?.getPoll)
          array.push(queryResults.data?.getPoll)
        } catch (error) {
          console.log("error querying for the poll")
        }
      }
     //console.log("the final array is as follows", array)
     setSquadPollData(array)
    }
    handleSquadPollData()
   }, [pollIDArray])


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <BottomSheetModalProvider>
     <FlatList    
       data={squadPollData}
       renderItem={({ item }) => (
         <Poll poll={item} 
          squadID = {squadID}
         />
       )}
       keyExtractor={(item) => item.id}
       style={styles.list}
       contentContainerStyle={{ flexGrow: 1 }}
     />
   </BottomSheetModalProvider>
 </KeyboardAvoidingView>
  )
}

export default MySquadPollScreen
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
  }
})