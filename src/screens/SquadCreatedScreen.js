import { View, Text,StyleSheet,FlatList, SafeAreaView, KeyboardAvoidingView, ActivityIndicator,Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SquadCreatedListItem from '../components/SquadCreatedListItem'
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser} from '../graphql/queries';
import { useRoute } from '@react-navigation/native';
import NonPrimarySquadCreatedListItem from '../components/NonPrimarySquadCreatedListItem'
import {useUserContext} from '../../UserContext';
import { getSquad } from '../graphql/queries';




const SquadCreatedScreen = () => {
const [squads, setSquads] = useState([]);
const [primarySquad, setPrimarySquad] = useState(null);
const[userInfo, setUserInfo] = useState("")
const {user} = useUserContext();


useEffect(() => {
  const fetchData = async () => {
    try { 
      if (user && user.id) {
        // Fetch user data from the backend
        const userID = user.id;
        const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
        const userFromBackend = userData.data?.getUser;
        console.log("here is the user from the backend in the squad Created screen", userFromBackend)

        if (userFromBackend) {
          const primarySquadID = userFromBackend.userPrimarySquad?.[0]; // Fetch the first (primary) squad ID
          const nonPrimarySquadIDs = userFromBackend.nonPrimarySquadsCreated || []; // Fetch non-primary squads

          // Fetch the primary squad if it exists
          if (primarySquadID) {
            const primarySquadData = await API.graphql(graphqlOperation(getSquad, { id: primarySquadID }));
            setPrimarySquad(primarySquadData.data?.getSquad);
          }

          // Fetch non-primary squads if they exist
          if (nonPrimarySquadIDs.length > 0) {
            const nonPrimarySquads = [];
            for (const squadID of nonPrimarySquadIDs) {
              const squadData = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
              nonPrimarySquads.push(squadData.data?.getSquad);
            }
            setSquads(nonPrimarySquads);
          }
        }
      }
    } catch (error) {
      console.log('Error fetching squads:', error);
    }
  };

  fetchData();
}, [user]);

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
            <Text style={styles.titleText}>Other Squads</Text>
            <FlatList
              data={squads}
              renderItem={({ item }) => (
                <NonPrimarySquadCreatedListItem
                  squad={item}
                  userInfo = {userInfo}
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