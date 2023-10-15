import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, ActivityIndicator,  ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";


const TrendingPollScreen = () => {
  const [numOfVotes, setNumOfVotes] = useState("32")
  const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')//remember to use uri instead of the require when quering from the backend
  const [pollCaption, setPollCaption] = useState("dining hall with best food today")
  const [pollCreator, setPollCreator] = useState("Drake")
  const [polls, setPolls] = useState([])

    // fetch Polls
    useEffect(() => {
      API.graphql(
        graphqlOperation(listPolls)
      ).then((result) => {
        setPolls(result.data?.listPolls?.items);
      });})
  
  
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >    
    <FlatList
          data={polls}
          scrollEnabled={true}
          // renderItem={({ item }) => (
          //   <Item
          //     id={item.id}
          //     title={item.title}
          //     url = {item.url}
          //     selected={!!selected.get(item.id)}
          //     onSelect={onSelect}
          //   />
          // )}
          renderItem={ ({ item }) => 
          <Poll 
          poll={item} />}
          style={styles.list}
          inverted
        />
    </KeyboardAvoidingView>
  )
}

export default TrendingPollScreen

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