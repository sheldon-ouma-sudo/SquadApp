import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem"
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import PollListItem from '../components/PollListItem';


const PersonalPollDisplayScreen = () => {
    const [poll, setPoll] = useState([])

const route = useRoute()
const pollID = route?.params.pollID
console.log("here is the poll id", pollID)
    useEffect(() => {
      const fetchPoll = async () => {
        try {
          const results = await API.graphql(graphqlOperation(listPolls));
          if(!results.data?.listPolls){
            console.log("Error fetching users") 
          }
          console.log("this is the list of the Polls",results.data.listPolls.items)
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


export default PersonalPollDisplayScreen