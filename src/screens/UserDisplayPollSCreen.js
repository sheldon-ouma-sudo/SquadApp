import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import PollListItem from '../components/SquadAndUserPollDisplayItem'
import SearchBar from '../components/SearchBar';
import { API, graphqlOperation } from 'aws-amplify';
import { getPoll } from '../graphql/queries';

const UserDisplayPollSCreen = ({polls, user}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [pollsData, setPollsData] = useState([]);


  useEffect(() => {
    const fetchPollDetails = async () => {
      if (polls) {
        console.log("here is the squad polls", polls)
        setLoading(true);
        try {
          // const pollPromises = squadPolls.map(async (pollItem) => {
          //   const pollData = await API.graphql(graphqlOperation(getPoll, { id: pollItem.pollId }));
          //   return pollData?.data?.getPoll;
          // });
          // const polls = await Promise.all(pollPromises);
          // setPollsData(polls);  // Set polls in state
        } catch (error) {
          console.log('Error fetching polls:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No polls found");
      }
    };

    fetchPollDetails();
  }, [polls]);




  return (
    <View>
      <Text>UserDisplayPollSCreen</Text>
    </View>
  )
}

export default UserDisplayPollSCreen