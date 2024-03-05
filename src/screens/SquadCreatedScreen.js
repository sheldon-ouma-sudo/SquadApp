import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import SquadCreatedListItem from '../components/SquadCreatedListItem'
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listSquads } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';
import SquadListItem from "../components/SquadListItem"
import {useUserContext} from '../../UserContext';
import { getSquad } from '../graphql/queries';



const SquadCreatedScreen = () => {
const [squads, setSquads] = useState([])
const[userInfo, setUserInfo] = useState("")
const {user} = useUserContext();
console.log("this is the user's squads created available locally: ", user.userSquadId)
useEffect(() => {
  const fetchData = async () => {
      try {
          if (user) {
              const userSquadCreated = [];
              const squadCreatedArray = user.userSquadId;
              console.log(squadCreatedArray);
              if (squadCreatedArray.length !== 0) {
                  // Create an array of promises for each async operation
                  const squadPromises = squadCreatedArray.map(async (squadCreatedID) => {
                      console.log("here is the Squad id from the loop: ", squadCreatedID);
                      try {
                          const results = await API.graphql(graphqlOperation(getSquad, { id: squadCreatedID }));
                          console.log("squad from backend: ", results.data?.getSquad);

                          if (!results.data?.getSquad) {
                              console.log("Error fetching Squad");
                          } else {
                              console.log("this is one of the squad created by the user: ", results.data.getSquad);
                              userSquadCreated.push(results.data?.getSquad);
                          }
                      } catch (error) {
                          console.log("error querying Squads: ", error);
                      }
                  });

                  // Wait for all promises to resolve
                  await Promise.all(squadPromises);

                  console.log("here are the extracted Squads: ", userSquadCreated);
                  setSquads(userSquadCreated);
              }
          }
      } catch (error) {
          console.log("there is an error", error);
      }
  };

  fetchData();
}, [user]); // Dependency array to trigger useEffect when user changes


  return (
    <SafeAreaView
    style={styles.container}>
    <View style={styles.searchBarContainer}>
        {/* <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      /> */}
       <FlatList
       data = {squads}
       renderItem={({item})=>(
        <SquadCreatedListItem
         squad={item}
         userInfo={userInfo}
        />
       )} />
    </View>
    </SafeAreaView>
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
searchBarContainer:{
marginTop:10,
marginLeft: 30,
width: 420
},
searchBar:{
  backgroundColor: 'white'
},
itemStyle: {
  padding: 10,
},
})
export default SquadCreatedScreen