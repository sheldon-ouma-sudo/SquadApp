import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import SquadJoinedListItem from '../components/SquadJoinedListItem'
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listSquads } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';
import {useUserContext} from '../../UserContext';

const SquadJoinedScreen = () => {
  const [squads, setSquads] = useState([])
  const[userInfo, setUserInfo] = useState("")
  const {user} = useUserContext();
  
  useEffect(() => {
    const fetchSquadsUserJoined = async () => {
      //console.log("here is the user info",user)
      console.log("here is the squad joined", user.squadJoined)
      setSquads(user.squadJoined)
      if (!user) {
        console.log("the user is null for now", user);
      }else {
       setUserInfo(user);
       console.log("otherwise this the user info in the explore squad screen", user);
       }
    }
    fetchSquadsUserJoined();

  }, []);


  return (
    <SafeAreaView
    style={styles.container}>
    <View style={styles.searchBarContainer}>
       <FlatList
       data = {squads}
       renderItem={({item})=>(
        <SquadJoinedListItem
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
export default SquadJoinedScreen