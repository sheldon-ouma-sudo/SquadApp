import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import Poll from "../components/PollListItem";
import { listPolls } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { onCreatePoll, onUpdatePoll, onDeletePoll } from '../graphql/subscriptions'; 

const ExplorePollScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listPolls));
        if (!results.data?.listPolls) {
          // console.log('Error fetching polls');
          return;
        }
        //console.log('List of polls:', results.data.listPolls.items);
        setPolls(results.data.listPolls.items);
        setIsLoading(false);
      } catch (error) {
        console.log('Error getting polls', error);
      }
    };
    fetchPolls();
      // // Subscribe to poll creation
      // const createPollSubscription = API.graphql(graphqlOperation(onCreatePoll)).subscribe({
      //   next: (response) => {
      //     const newPoll = response.value.data.onCreatePoll;
      //     setPolls((prevPolls) => [newPoll, ...prevPolls]); // Add new poll to the list
      //   },
      //   error: (error) => console.log('Error on create poll subscription:', error),
      // });
  
      // // Subscribe to poll updates
      // const updatePollSubscription = API.graphql(graphqlOperation(onUpdatePoll)).subscribe({
      //   next: (response) => {
      //     const updatedPoll = response.value.data.onUpdatePoll;
      //     setPolls((prevPolls) =>
      //       prevPolls.map((poll) => (poll.id === updatedPoll.id ? updatedPoll : poll)) // Update poll in the list
      //     );
      //   },
      //   error: (error) => console.log('Error on update poll subscription:', error),
      // });
  
      // // Subscribe to poll deletion
      // const deletePollSubscription = API.graphql(graphqlOperation(onDeletePoll)).subscribe({
      //   next: (response) => {
      //     const deletedPoll = response.value.data.onDeletePoll;
      //     setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== deletedPoll.id)); // Remove poll from the list
      //   },
      //   error: (error) => console.log('Error on delete poll subscription:', error),
      // });
  
      // // Clean up subscriptions on component unmount
      // return () => {
      //   createPollSubscription.unsubscribe();
      //   updatePollSubscription.unsubscribe();
      //   deletePollSubscription.unsubscribe();
     // };
  }, []);

  const filteredPolls = polls.filter((poll) =>
    poll.pollCaption.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={() => {}} // No need for setClicked function here
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <BottomSheetModalProvider>
            <FlatList    
          data={filteredPolls}
          renderItem={({ item }) => (
          <Poll poll={item} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ flexGrow: 1 }}
      />
          </BottomSheetModalProvider>
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
    // marginLeft: 10,
    // width: 400,
  },
  list: {
    padding: 10,
  },
});

export default ExplorePollScreen;


  