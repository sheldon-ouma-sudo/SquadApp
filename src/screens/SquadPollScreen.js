import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import PollListItem from '../components/SquadAndUserPollDisplayItem';
import SearchBar from '../components/SearchBar';
import { API, graphqlOperation } from 'aws-amplify';
import { getPoll } from '../graphql/queries';

const SquadPollScreen = ({ squadPolls }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [squadPollsData, setSquadPollsData] = useState([]);

  useEffect(() => {
    const fetchPollDetails = async () => {
      if (squadPolls && squadPolls.length > 0) {
        console.log("Here are the squad polls:", squadPolls);
        setLoading(true);
        try {
          const pollPromises = squadPolls.map(async (pollItem) => {
            // Check if pollId exists before attempting to fetch it
            if (!pollItem.pollId) {
              console.warn(`Poll item is missing pollId:`, pollItem);
              return null; // Skip this item
            }
            const pollData = await API.graphql(graphqlOperation(getPoll, { id: pollItem.pollId }));
            return pollData?.data?.getPoll;
          });

          const polls = await Promise.all(pollPromises);
          // Filter out any null or undefined polls
          const validPolls = polls.filter(poll => poll !== null);
          setSquadPollsData(validPolls); // Set only valid polls in state
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
          <Text>No polls found</Text>
        ) : (
          <FlatList
            data={squadPollsData}
            renderItem={({ item }) => {
              if (!item || !item.id) {
                console.warn("Poll item missing or invalid:", item);
                return null; // Skip invalid item
              }
              return <PollListItem poll={item} />;
            }}
            keyExtractor={(item, index) => item?.id ? item.id.toString() : `poll-${index}`}
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

export default SquadPollScreen;
