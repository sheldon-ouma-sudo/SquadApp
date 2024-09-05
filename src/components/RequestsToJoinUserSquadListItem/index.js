import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRequestToJoinASquad } from '../graphql/mutations';

const RequestsToJoinUserSquadListItem = ({ item }) => {
  const handleAccept = async () => {
    try {
      // // Update the request status to accepted (you can add an attribute in the model for status if necessary)
      // await API.graphql(
      //   graphqlOperation(updateRequestToJoinASquad, {
      //     input: { id: item.id, status: 'ACCEPTED' }, // Assuming you have a 'status' field
      //   })
      // );
      // console.log('Request accepted');
    } catch (error) {
      console.log('Error accepting the request:', error);
    }
  };

  const handleIgnore = async () => {
    try {
      // Update the request status to ignored
      // await API.graphql(
      //   graphqlOperation(updateRequestToJoinASquad, {
      //     input: { id: item.id, status: 'IGNORED' },
      //   })
      // );
      // console.log('Request ignored');
    } catch (error) {
      console.log('Error ignoring the request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={handleAccept} color="green" />
        <Button title="Ignore" onPress={handleIgnore} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RequestsToJoinUserSquadListItem;
