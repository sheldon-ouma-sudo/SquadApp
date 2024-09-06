import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; // import useRoute
import { AntDesign } from '@expo/vector-icons';
import { useUserContext } from '../../UserContext';

const EditSquadScreen = () => {
  const [squadName, setSquadName] = useState('');
  const [squadBio, setSquadBio] = useState('');
  const [publicSquad, setPublicSquad] = useState(true);

  const navigation = useNavigation();
  const route = useRoute(); // useRoute to access the passed squad data
  const { squad } = route.params; // Extract squad from route params

  useEffect(() => {
    if (squad) {
      // Pre-fill the form with the squad details
      setSquadName(squad.squadName);
      setSquadBio(squad.bio); // Assuming squad has a 'bio' field
    }
  }, [squad]);

  const handleSquadEdit = () => {
    // Add logic to update the squad details
    console.log("Squad Edited:", { squadName, squadBio, publicSquad });
    // You can add your logic to update the squad using an API call here
    navigation.goBack(); // Go back after editing
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[{ backgroundColor: "#F4F8FB" }, { flexDirection: "row", marginTop: 30 }]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="#1764EF" style={{ flex: 1, marginLeft: 30, justifyContent: 'flex-start' }} />
        <Text style={{ fontWeight: '600', fontSize: 15, flex: 1, marginRight: 150, justifyContent: 'flex-end' }}>
          Edit the basics
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, marginLeft: -310 }}>
        <Text>Squad Bio</Text>
      </View>
      <TextInput
        placeholder="Squad Bio"
        value={squadBio}
        onChangeText={text => setSquadBio(text)}
        style={styles.input}
      />

      <View style={{ marginTop: 20, marginLeft: -310 }}>
        <Text>Squad Name</Text>
      </View>
      <TextInput
        placeholder="Squad Name"
        value={squadName}
        onChangeText={text => setSquadName(text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSquadEdit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F8FB",
  },
  input: {
    backgroundColor: '#FFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width: 356,
    height: 42,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 15,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#1145FD',
    width: 366,
    height: 42,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default EditSquadScreen;
