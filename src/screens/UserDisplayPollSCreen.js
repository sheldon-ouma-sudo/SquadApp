import { View, Text, KeyboardAvoidingView, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Poll from '../components/PersonalPollPostListItem/index'
import { API, graphqlOperation } from 'aws-amplify'
import SearchBar from '../components/SearchBar';
import { onCreatePoll } from '../graphql/subscriptions';


const UserDisplayPollSCreen = ({polls, user}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [pollsData, setPollsData] = useState([]);


  useEffect(() => {
    const fetchPollDetails = async () => {
       setLoading(true);
      if (polls) {
        console.log("here is the polls by the user", polls)
        setPollsData(polls)
        setLoading(false);
      } else {
        console.log("No polls found");
      }
    };

    fetchPollDetails();
  }, [polls]);

  useEffect(() => {
    const userID = user.id;
    const subscription = API.graphql(graphqlOperation(onCreatePoll)).subscribe({
      next: (pollData) => {
        const newPoll = pollData.value.data.onCreatePoll;
        // console.log('New poll created:', newPoll);

        // Check if the poll belongs to the current user
        if (newPoll.userID === userID) {
          setPollsData((prevPolls) => [newPoll, ...prevPolls]); // Prepend new poll to the list
        }
      },
      error: (error) => {
        console.error('Error with poll subscription:', error);
      },
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, [user.id]);

  const handleSearchBarClick = () => {
    console.log('Search bar clicked');
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.searchBarContainer}>
      <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick}
        />
      {loading ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : pollsData.length === 0 ? (
          <Text>No polls found at this moment</Text>
        ) : (
          <FlatList
            data={pollsData}
            renderItem={({ item }) => (
              <Poll poll={item} />
            )}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={{ flexGrow: 1 }}
      />
        )}
    </View>
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
searchBarContainer: {
  marginTop: 10,
  marginLeft: 10,
  width: 420,
},
})
export default UserDisplayPollSCreen