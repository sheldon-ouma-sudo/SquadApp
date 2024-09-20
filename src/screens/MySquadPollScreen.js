import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPoll, getUser, squadPollsBySquadId } from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/SquadPollListItem/index";
import { useUserContext } from '../../UserContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { onCreateSquadPoll, onUpdateSquadPoll, onDeleteSquadPoll } from '../graphql/subscriptions';

const MySquadPollScreen = () => {
  const [squadPollData, setSquadPollData] = useState([]);
  const [pollIDArray, setPollIDArray] = useState([]);
  const [userArray, setUserArray] = useState([]);
  const [squadID, setSquadID] = useState();
  const { user } = useUserContext();

  // Get all the squads the user has joined
  useEffect(() => {
    const userQuery = async () => {
      if (user) {
        const userID = user.id;
        // console.log("here is the user id", userID)
        const userQuery = await API.graphql(graphqlOperation(getUser, { id: userID }));
        // console.log("here is the user real-time query", userQuery.data?.getUser);
        
        const userSquadJoinedID = userQuery.data?.getUser.squadJoinedID || [];
        const userPrimarySquad = userQuery.data?.getUser.userPrimarySquad ? [userQuery.data?.getUser.userPrimarySquad] : [];
        const userNonPrimarySquads = userQuery.data?.getUser.nonPrimarySquadsCreated || [];

        // Combine all three arrays into one
        const combinedSquads = [...userSquadJoinedID, ...userPrimarySquad, ...userNonPrimarySquads].flat();
        // console.log("here is the combined squads", combinedSquads);
        setUserArray(combinedSquads);
      }
    };
    userQuery();
  }, [user]);

  // Fetch squad polls associated with the squads
  useEffect(() => {
    const handleSquadPollDataQuery = async () => {
      let validPollIds = [];
  
      if (userArray.length > 0) {
        for (const squadID of userArray) {
          if (squadID && typeof squadID === 'string') {  // Ensure squadID is valid
            setSquadID(squadID);  // Storing the current squadID for later use
            try {
              // console.log("Fetching polls for squadID:", squadID);  // Log the squadID being used for querying
              const results = await API.graphql(graphqlOperation(squadPollsBySquadId, { squadId: squadID }));
              if (results.data?.squadPollsBySquadId?.items) {
                //  console.log("Query results for squadID:", squadID, results.data.squadPollsBySquadId.items);
                const pollIds = results.data.squadPollsBySquadId.items.map(item => item.pollId);
                validPollIds = [...validPollIds, ...pollIds];
              } else {
                console.log(`No polls found for squadID: ${squadID}`);
              }
            } catch (error) {
              console.log(`Error querying for squad polls with squadID: ${squadID}`, error);
            }
          } else {
            console.log(`Invalid squadID: ${squadID}`);
          }
        }
        setPollIDArray(validPollIds);
      } else {
        console.log("No squads found in userArray");
      }
    };
  
    handleSquadPollDataQuery();
  }, [userArray]);
  

  // Fetch the polls based on poll ID array
  useEffect(() => {
    const handleSquadPollData = async () => {
      let pollArray = [];
      // console.log("here is the poll ID array", pollIDArray)
      for (const pollID of pollIDArray) {
        // console.log("query for poll Id", pollID)
        try {
          const queryResults = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
          // console.log("here is the poll query", queryResults)
          const pollData = queryResults.data?.getPoll;
          //console.log("here is the poll data", queryResults)
          if (pollData) { 
            pollArray.push(pollData);
          }
        } catch (error) {
          console.error("Error querying for poll", error);
        }
      }
      console.log("here is available polls", pollArray)
      setSquadPollData(pollArray.filter(Boolean)); // Ensure no null or undefined poll data is set
    };

    if (pollIDArray.length > 0) {
      handleSquadPollData();
    }
  }, [pollIDArray]);

  // // Set up subscriptions for squad poll updates
  useEffect(() => {
    const createSquadPollSubscription = API.graphql(graphqlOperation(onCreateSquadPoll)).subscribe({
      next: (response) => {
        const newSquadPoll = response.value.data.onCreateSquadPoll;
        setPollIDArray((prevPolls) => [newSquadPoll.pollId, ...prevPolls]);
      },
      error: (error) => console.error('Error on create squad poll subscription:', error),
    });

    const updateSquadPollSubscription = API.graphql(graphqlOperation(onUpdateSquadPoll)).subscribe({
      next: (response) => {
        const updatedSquadPoll = response.value.data.onUpdateSquadPoll;
        setSquadPollData((prevPolls) =>
          prevPolls.map((poll) => (poll.id === updatedSquadPoll.pollId ? updatedSquadPoll.poll : poll))
        );
      },
      error: (error) => console.error('Error on update squad poll subscription:', error),
    });

    const deleteSquadPollSubscription = API.graphql(graphqlOperation(onDeleteSquadPoll)).subscribe({
      next: (response) => {
        const deletedSquadPoll = response.value.data.onDeleteSquadPoll;
        setPollIDArray((prevPolls) => prevPolls.filter((pollId) => pollId !== deletedSquadPoll.pollId));
      },
      error: (error) => console.error('Error on delete squad poll subscription:', error),
    });

    // Clean up subscriptions on component unmount
    return () => {
      createSquadPollSubscription.unsubscribe();
      updateSquadPollSubscription.unsubscribe();
      deleteSquadPollSubscription.unsubscribe();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BottomSheetModalProvider>
        <FlatList
          data={squadPollData}
          renderItem={({ item }) => {
            // Check if the item is valid before rendering the component
            if (!item || !item.id) return null;

            return (
              <Poll
                poll={item}
                squadID={squadID}
              />
            );
          }}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          style={styles.list}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </BottomSheetModalProvider>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F8FB",
  },
  squadLogo: {
    width: 100,
    height: 35,
    marginRight: 250,
    marginTop: 70,
  }
});

export default MySquadPollScreen;
