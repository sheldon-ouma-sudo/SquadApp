import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { onCreatePoll, onUpdatePoll, onDeletePoll } from '../graphql/subscriptions'; 

const TrendingPollScreen = () => {
  const [polls, setPolls] = useState([])
  

    useEffect(() => {
      const fetchPolls = async () => {
        try { 
          const results = await API.graphql(graphqlOperation(listPolls));
          if(!results.data?.listPolls){
            console.log("Error fetching polls") 
          }
          // console.log("this is the list of the Polls",results.data.listPolls.items)
            setPolls(results.data?.listPolls?.items)
        } catch (error) {
          console.log(error)
        }
      };
      fetchPolls();
    }, []);
   
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
     <BottomSheetModalProvider>
      <FlatList    
        data={polls}
        renderItem={({ item }) => (
          <Poll poll={item} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </BottomSheetModalProvider>
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
list: {
  padding: 10,
},
})

export default TrendingPollScreen