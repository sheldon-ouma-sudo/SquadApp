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
  const [pollIDArray, setPollIDArray] = useState(new Set()); // Use a Set to ensure unique IDs
  const [userArray, setUserArray] = useState([]);
  const [squadID, setSquadID] = useState();
  const { user } = useUserContext();

  // Get all the squads the user has joined
  useEffect(() => {
    const userQuery = async () => {
      if (user) {
        const userID = user.id;
        const userQuery = await API.graphql(graphqlOperation(getUser, { id: userID }));
        const userSquadJoinedID = userQuery.data?.getUser.squadJoinedID || [];
        const userPrimarySquad = userQuery.data?.getUser.userPrimarySquad ? [userQuery.data?.getUser.userPrimarySquad] : [];
        const userNonPrimarySquads = userQuery.data?.getUser.nonPrimarySquadsCreated || [];

        // Combine all three arrays into one
        const combinedSquads = [...userSquadJoinedID, ...userPrimarySquad, ...userNonPrimarySquads].flat();
        setUserArray(combinedSquads);
      }
    };
    userQuery();
  }, [user]);

  // Fetch squad polls associated with the squads
  useEffect(() => {
    const handleSquadPollDataQuery = async () => {
      if (userArray.length > 0) {
        for (const squadID of userArray) {
          if (squadID && typeof squadID === 'string') {  // Ensure squadID is valid
            setSquadID(squadID);  // Storing the current squadID for later use
            try {
              const results = await API.graphql(graphqlOperation(squadPollsBySquadId, { squadId: squadID }));
              if (results.data?.squadPollsBySquadId?.items) {
                const pollIds = results.data.squadPollsBySquadId.items.map(item => item.pollId);
                // Add unique poll IDs to the set
                setPollIDArray((prevPolls) => new Set([...prevPolls, ...pollIds]));
              }
            } catch (error) {
              console.log(`Error querying for squad polls with squadID: ${squadID}`, error);
            }
          }
        }
      }
    };
    handleSquadPollDataQuery();
  }, [userArray]);

  // Fetch the polls based on poll ID array
  useEffect(() => {
    const handleSquadPollData = async () => {
      let pollArray = [];
      for (const pollID of pollIDArray) {
        try {
          const queryResults = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
          const pollData = queryResults.data?.getPoll;
          if (pollData) {
            pollArray.push(pollData);
          }
        } catch (error) {
          console.error("Error querying for poll", error);
        }
      }

      // Ensure uniqueness by filtering out duplicate polls
      const uniquePolls = pollArray.filter((poll, index, self) => 
        index === self.findIndex((p) => p.id === poll.id)
      );
      
      setSquadPollData(uniquePolls); // Set only unique polls
    };

    if (pollIDArray.size > 0) {
      handleSquadPollData();
    }
  }, [pollIDArray]);

  // Set up subscriptions for squad poll updates
  useEffect(() => {
    const createSquadPollSubscription = API.graphql(graphqlOperation(onCreateSquadPoll)).subscribe({
      next: (response) => {
        const newSquadPoll = response.value.data.onCreateSquadPoll;
        setPollIDArray((prevPolls) => new Set([newSquadPoll.pollId, ...prevPolls]));
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
        setPollIDArray((prevPolls) => {
          const updatedSet = new Set(prevPolls);
          updatedSet.delete(deletedSquadPoll.pollId);
          return updatedSet;
        });
      },
      error: (error) => console.error('Error on delete squad poll subscription:', error),
    });

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
