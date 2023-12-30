import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import SquadListItem from "../components/SquadListItem"
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listSquads } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';
import {useUserContext} from '../../UserContext';

const ExploreSquadronScreen = () => { 
  //const [search, setSearch] = useState('');
  const [searchPhrase, setSearchPhrase] = useState("");
  const [squads, setSquads] = useState([])
  const[userInfo, setUserInfo] = useState("")
  const {user} = useUserContext();
  
  
  

  // get data from the fake api
  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listSquads));
        if(!results.data?.listSquads){
          console.log("Error fetching users")
        }
        console.log("this is the list of the Squads",results.data.listSquads.items)
          setSquads(results.data?.listSquads?.items)
      } catch (error) {
        console.log(error)
      }
      if (!user) {
        console.log("the user is null for now", user);
      } //else {
      //   setUserInfo(user);
      //   console.log("otherwise this the user info", user);
      //   console.log("here is the userSquadId", user.userSquadId);
      //   setParentSquadID(user.userSquadId);
      // }
    };
    fetchSquads();
  }, []);

 
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
        <SquadListItem
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
export default ExploreSquadronScreen