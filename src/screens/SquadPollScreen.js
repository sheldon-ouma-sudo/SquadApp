import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import PollListItem from '../components/SquadAndUserPollDisplayItem'
import SearchBar from '../components/SearchBar';
import { API, graphqlOperation } from 'aws-amplify';
import { getPoll } from '../graphql/queries';

const SquadPollScreen = ({ squadPolls })=> {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [squadPollsData, setSquadPollsData] = useState([]);

  useEffect(() => {
    const fetchPollDetails = async () => {
      if (squadPolls) {
        setLoading(true);
        try {
          const pollPromises = squadPolls.map(async (pollItem) => {
            const pollData = await API.graphql(graphqlOperation(getPoll, { id: pollItem.pollId }));
            return pollData?.data?.getPoll;
          });

          const polls = await Promise.all(pollPromises);
          setSquadPollsData(polls);  // Set polls in state
        } catch (error) {
          console.error('Error fetching polls:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No polls found");
      }
    };

    fetchPollDetails();
  }, [squadPolls]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#1145FD" />
        ) : squadPollsData.length === 0 ? (
          <Text>No users found</Text>
        ) : (
          <FlatList
            data={squadPollsData}
            renderItem={({ item }) => <PollListItem poll={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>No polls found for this squad.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F8FB',
  },
  searchBarContainer: {
    marginTop: 10,
    marginLeft: 30,
    width: 420,
  },
});

export default SquadPollScreen