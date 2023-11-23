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

    useEffect(() => {
      const fetchSquads = async () => {
        // const apiResponse = await fetch(
        //   "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
        // );
        // const data = await apiResponse.json();
        // setFakeData(data);
        try {
          const results = await API.graphql(graphqlOperation(listPolls));
          if(!results.data?.listPolls){
            console.log("Error fetching users")
          }
          console.log("this is the list of the Squads",results.data.listPolls.items)
            setPolls(results.data?.listPolls?.items)
        } catch (error) {
          console.log(error)
        }
      };
      fetchSquads();
    }, []);
  
  
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >   


    <FlatList
       data = {polls}
       //searchPhrase={searchPhrase}
       renderItem={({item})=>(
        <Poll
         poll={item}
        />
       )} 
       
       /> 
    {/* <FlatList
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
        /> */}
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