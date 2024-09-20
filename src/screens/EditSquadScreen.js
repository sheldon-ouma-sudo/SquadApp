import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useUserContext } from '../../UserContext';
import { API, graphqlOperation } from 'aws-amplify';
import { updateSquad } from '../graphql/mutations';

const EditSquadScreen = () => {
  const [squadName, setSquadName] = useState('');
  const [squadBio, setSquadBio] = useState('');
  const [publicSquad, setPublicSquad] = useState(true);

  const navigation = useNavigation();
  const route = useRoute(); // useRoute to access the passed squad data
  const { squad } = route.params; // Extract squad from route params
  const { user } = useUserContext(); // You can get user context if needed

  useEffect(() => {
    if (squad) {
      // Pre-fill the form with the squad details
      setSquadName(squad.squadName);
      setSquadBio(squad.bio); // Assuming squad has a 'bio' field
    }
  }, [squad]);

  const handleSquadEdit = async () => {
    try {
      // Prepare the input for updateSquad mutation
      const updateInput = {
        id: squad.id, // The ID of the squad being updated
        squadName: squadName,
        bio: squadBio,
        public: publicSquad,
      };

      // Perform the mutation to update the squad
      const response = await API.graphql(graphqlOperation(updateSquad, { input: updateInput }));
      
      // console.log("Squad updated successfully:", response);

      // Navigate back or provide feedback to the user
      navigation.goBack(); // Go back after editing
    } catch (error) {
      console.log("Error updating squad:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#1764EF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Edit Squad Basics</Text>

        <View>
          <View style={styles.squadImageContainer}>
            <FontAwesome name="group" size={74} color="#1145FD" style={{ marginTop: -25 }} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Squad Bio</Text>
          <TextInput
            placeholder="Squad Bio"
            value={squadBio}
            onChangeText={text => setSquadBio(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Squad Name</Text>
          <TextInput
            placeholder="Squad Name"
            value={squadName}
            onChangeText={text => setSquadName(text)}
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={handleSquadEdit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: -320,
    marginLeft: 10,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  squadImageContainer:{
    marginTop: 60, 
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 45,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width: '80%',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 40,
  },
  button: {
    backgroundColor: '#1145FD',
    width: '80%',
    height: 50,
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default EditSquadScreen;
