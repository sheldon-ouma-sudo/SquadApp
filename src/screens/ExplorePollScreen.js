import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import PollListItem from '../components/PollListItem';
import { listPolls } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const ExplorePollScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listPolls));
        if (!results.data?.listPolls) {
          console.log('Error fetching polls');
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
              renderItem={({ item }) => <PollListItem poll={item} />}
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


  