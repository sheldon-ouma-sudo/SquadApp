import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import UserListItem from "../components/UserListItem"
import { useRoute } from '@react-navigation/native';
import {useUserContext} from '../../UserContext';

const ExploreUserScreen = () => {
  //const [search, setSearch] = useState('');
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  //const [fakeData, setFakeData] = useState();
  const [users, setUsers] = useState([]);
  const[userInfo, setUserInfo] = useState("")
  const [parent_squadID, setParentSquadID] = useState("")
  const {user} = useUserContext();
  
  
useEffect(() => {
  const fetchUsers = async () => {
    const results = await API.graphql(graphqlOperation(listUsers));
    if (!results.data?.listUsers) {
      console.log("Error fetching users");
    }
    setUsers(results.data?.listUsers?.items);
    if (!user) {
      console.log("the user is null for now", user);
    } else {
      setUserInfo(user);
      console.log("otherwise this the user info", user);
      console.log("here is the userSquadId", user.userSquadId);
      setParentSquadID(user.userSquadId);
    }
  };
  fetchUsers();
}, [user]);

  
  return (
    <SafeAreaView
    style={styles.container}>
    <View style={styles.searchBarContainer}>
        <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {/* {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
      )} */}
       <FlatList
       data = {users}
       searchPhrase={searchPhrase}
       renderItem={({item})=>(
        <UserListItem
         user={item}
        userInfo={userInfo}
        />
       )} 
       
       />
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
export default ExploreUserScreen