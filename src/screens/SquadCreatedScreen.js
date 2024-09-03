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
import { getUser, listSquads } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';
import {useUserContext} from '../../UserContext';
import { getSquad } from '../graphql/queries';




const SquadCreatedScreen = () => {
const [squads, setSquads] = useState([]);
const [primarySquad, setPrimarySquad] = useState(null);
const[userInfo, setUserInfo] = useState("")
const {user} = useUserContext();
console.log("this is the user's primarsy squad: ", user.userPrimarySquad)
useEffect(() => {
  const fetchData = async () => {
      try {
          if (user) {
              console.log("here is the local user", user)
              setUserInfo(user);
              const primaryUserSquadID = user.userPrimarySquad[0]
              console.log("here is the primaryUserSquadID", primaryUserSquadID )
              if(primaryUserSquadID){
                try {
                  const results = await API.graphql(graphqlOperation(getSquad, { id: primaryUserSquadID }));
                  console.log("squad from backend: ", results.data?.getSquad);
                  const primary_user_squad = results.data?.getSquad;
                  setPrimarySquad(primary_user_squad)
                } catch (error) {
                  console.log("error gettting user primary squad",error)
                }

              }
              // get nonPrimary squad from user real time data
              const userID = user.id
              const results = await API.graphql(graphqlOperation(getUser, {id:userID }))
              console.log("squad from backend: ", results.data?.getUser);
              const userRealTimeData = results.data?.getUser
              const nonPrimarySquadArr = userRealTimeData.nonPrimarySquadsCreated;
              const userSquadCreated = []
              if (nonPrimarySquadArr.length !== 0) {
                  // Create an array of promises for each async operation
                  const squadPromises = nonPrimarySquadArr.map(async (squadCreatedID) => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {primarySquad && (
          <>
            <Text style={styles.titleText}>Personal Squad</Text>
            <SquadCreatedListItem
              squad={primarySquad}
              userInfo={userInfo}
            />
          </>
        )}

        {squads.length > 0 && (
          <>
            <Text style={styles.titleText}>Personal Squads</Text>
            <FlatList
              data={squads}
              renderItem={({ item }) => (
                <SquadCreatedListItem
                  squad={item}
                  userInfo={userInfo}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
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
  listContainer: {
    marginTop: 10,
    marginLeft: 30,
    width: 420,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
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