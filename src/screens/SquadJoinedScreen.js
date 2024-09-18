import { View, Text, StyleSheet,FlatList, SafeAreaView, KeyboardAvoidingView, ActivityIndicator,Image } from'react-native'
import React, { useState, useEffect } from 'react';
//import NonPrimarySquadCreatedListItem from '../components/NonPrimarySquadCreatedListItem'
import SquadJoinedListItem from '../components/SquadJoinedListItem'
import { API, graphqlOperation } from 'aws-amplify';
import {useUserContext} from '../../UserContext';
import { getSquad } from '../graphql/queries';

const SquadJoinedScreen = () => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [joinedSquads, setJoinedSquads] = useState(user.squadJoined || []);

  const handleRemoveSquad = (squadId) => {
    setJoinedSquads(prevSquads => prevSquads.filter(squad => squad.id !== squadId));
  };

  useEffect(() => {
    const fetchSquadsUserJoined = async () => {
      if (user && user.squadJoinedID?.length > 0) {
        try {
          const squadIDArray = user.squadJoinedID;
          const fetchedSquads = [];

          for (const squadID of squadIDArray) {
            const squadData = await API.graphql(graphqlOperation(getSquad, { id: squadID }));
            if (squadData?.data?.getSquad) {
              fetchedSquads.push(squadData.data.getSquad);
            }
          }

          // Ensure unique squads by filtering out duplicates based on their ID
          const uniqueSquads = fetchedSquads.filter(
            (squad, index, self) => index === self.findIndex((s) => s.id === squad.id)
          );

          setJoinedSquads(uniqueSquads);
        } catch (error) {
          console.error('Error fetching squads:', error);
        }
      } else {
        setJoinedSquads([]); // Ensure the state is an empty array if no squads are joined
      }
      setLoading(false); // Stop loading
    };

    fetchSquadsUserJoined();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.squadListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#1145FD" />
        ) : joinedSquads.length > 0 ? (
          <FlatList
              data={joinedSquads}
              renderItem={({ item }) => (
                <SquadJoinedListItem
                  squad={item}
                  onLeaveSquad={handleRemoveSquad}
                  userInfo={user}
                />
              )}
              keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          />
        ) : (
          <Text>No squads joined yet.</Text>
        )}
      </View>
    </SafeAreaView>
  );
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