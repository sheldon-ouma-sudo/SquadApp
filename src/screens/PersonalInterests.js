import { View, Text, Image, StyleSheet, StatusBar, Dimensions, SafeAreaView, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createUser, createSquad, updateUser } from '../graphql/mutations';
import { useUserContext } from '../../UserContext';

const { width, height } = Dimensions.get("window");

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ffff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1764EF',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1764EF',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#1764EF',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#1764EF',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelSize: 13,
  currentStepLabelColor: '#fffff'
};

const DATA = [
  { id: '1', title: 'Food', url: 'https://media3.giphy.com/media/26xBzfqV1XqKAlRCw/giphy.gif' },
  { id: '2', title: 'Fashion', url: 'https://media3.giphy.com/media/xjIh4zHDjhjji/giphy.gif' },
  { id: '3', title: 'Travel', url: 'https://media3.giphy.com/media/iBBfBIj1XopJF6WTVI/giphy.gif' },
  { id: '4', title: 'Decor', url: 'https://media3.giphy.com/media/JGdbbSyi3wM9uBKv8p/giphy.gif' },
  { id: '5', title: 'Wellness', url: 'https://media3.giphy.com/media/cAgGLp84BRh4lZumDt/giphy.gif' },
  { id: '6', title: 'Social', url: 'https://media3.giphy.com/media/Swg9cud2W8OKVhz9rt/giphy.gif' },
];

function InterestItem({ id, title, url, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[styles.item, { backgroundColor: selected ? '#1145FD' : '#fff' }]}
    >
      <Image
        source={{ uri: url }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={[styles.title, { color: selected ? '#fff' : '#1145FD' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const PersonalInterests = () => {
  const [selected, setSelected] = useState(new Map());
  const [userInterest, setUserInterest] = useState([]);
  const [userCreated, setUserCreated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [squadID, setSquadID] = useState("");
  const [userID, setUserID] = useState("");
  const { user, updateLocalUser, updateUserProperty } = useUserContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { userImgUrl } = route?.params;

  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected]
  );

  useEffect(() => {
    const getUserInterest = () => {
      const interests = [];
      for (let [key, value] of selected) {
        let obj = DATA.find((obj) => obj.id === key);
        if (value) {
          interests.push(obj.title);
        }
      }
      setUserInterest(interests);
    };
    getUserInterest();
  }, [selected]);

  useEffect(() => {
    const createNewUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const name = authUser.attributes.name;
        const username = authUser.attributes.preferred_username;
        const userProfilePicture = authUser.attributes.picture || userImgUrl;
        const email = authUser.attributes.email;

        setName(name);
        setUserName(username);
        setUserProfilePicture(userProfilePicture);
        setEmail(email);

        if (!userCreated) {
          const createUserInput = {
            name,
            userName: username,
            imageUrl: userProfilePicture,
            userPrimarySquad: [],
            nonPrimarySquadsCreated: [],
            numOfPolls: 0,
            numOfSquadJoined: 0,
            numSquadCreated: 1,
            superUser: false,
            userInterests: userInterest,
            squadJoined: [],
            Bio: "Please Edit Your Bio by Clicking the Edit Button below",
            email
          };

          const response = await API.graphql(
            graphqlOperation(createUser, { input: createUserInput })
          );
          console.log("User created successfully✅", response);

          const userId = response.data.createUser.id;
          setUserID(userId);
          setUserCreated(true);

          updateLocalUser({
            id: userId,
            imageUrl: userProfilePicture,
            name: name,
            userName: username,
            userPrimarySquad: [],
            numOfPolls: 0,
            numOfSquadJoined: 0,
            userInterests: userInterest,
            email: email
          });

          await Auth.updateUserAttributes(authUser, {
            'custom:graphQLUSerID': userId,
          });
        }

        setLoading(false); // Mark loading as done
      } catch (error) {
        console.log('Error creating user:', error);
      }
    };

    createNewUser();
  }, []);

  useEffect(() => {
    const createPrimarySquad = async () => {
      if (!userID) {
        console.log("here is non valid user ID")
        return;
      }else{
        console.log("here is the user ID", userID)
      const squadName = `${username}'s main Squad`;
      const createSquadInput = {
        authUserID: userID,
        authUserName: name,
        bio: "Please Edit Your Bio by Clicking the Edit Button below",
        public: false,
        squadName: squadName,
        numOfPolls: 0,
        numOfUsers: 0,
      };

      try {
        const response = await API.graphql(graphqlOperation(createSquad, { input: createSquadInput }));
        console.log("Successfully created the squad✅", response);

        const newSquadID = response.data?.createSquad.id;
        setSquadID(newSquadID);
      } catch (error) {
        console.error("Error creating the primary squad:", error);
      }
    };
  }
    createPrimarySquad();
  }, [userID]);

  useEffect(() => {
    const updateUserWithSquad = async () => {
      if (userID && squadID) {
        try {
          await API.graphql(graphqlOperation(updateUser, {
            input: { id: userID, userPrimarySquad: [squadID] },
          }));

          updateLocalUser({
            ...user,
            userPrimarySquad: [squadID],
          });
          console.log("Primary squad added to user profile successfully.");
        } catch (error) {
          console.error("Error updating user with the primary squad:", error);
        }
      }
    };

    updateUserWithSquad();
  }, [userID, squadID]);

  useEffect(() => {
    const updateUserInterest = async () => {
      if (userCreated && userID) {
        try {
          await API.graphql(graphqlOperation(updateUser, {
            input: { id: userID, userInterests: userInterest },
          }));
          updateUserProperty('userInterests', userInterest);
        } catch (error) {
          console.log("Error updating the user interests:", error);
        }
      }
    };

    updateUserInterest();
  }, [userID, userInterest]);

  // Conditional rendering with ActivityIndicator spinner
 // Conditional rendering with ActivityIndicator spinner
if (!userID || loading) {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#1145FD" />
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.squadLogoContainer, { flexDirection: 'column' }]}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
          style={styles.squadLogo}
          resizeMode='contain'
        ></Image>
      </View>
      <StatusBar backgroundColor={'black'} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up Progress</Text>
      </View>
      <View style={styles.indicatiorWindow}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={3} // Assuming step 3 is the current step
        />
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.textInterest}>Select themes you are interested in:</Text>
        </View>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <InterestItem
            id={item.id}
            title={item.title}
            url={item.url}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Two columns for the grid layout
        columnWrapperStyle={{ justifyContent: 'space-around' }} // Evenly distribute the items
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.replace('UploadProfPictureScreen')} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SquadCreationScreen', { squadID })} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop: Constants.statusBarHeight,
  },
  squadLogo:{
    width:100,
    height:35,
    marginRight:250,
    marginTop:70
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center', // Center the spinner vertically
    alignItems: 'center', // Center the spinner horizontally
  },
  header:{
  height: 55, 
  width:'50%',
  justifyContent:"center",
  alignItems:'center',
  marginRight:200,
  marginTop: 10,
  marginLeft:35
  },
  headerText:{
  fontSize:22,
  fontWeight:'bold'
  },
  indicatiorWindow:{
  width:width-20,
  padding:20,
  margin:15,
  borderRadius:20,
  marginTop:-20,
  marginLeft:-8
  },
  textInterest:{
  fontSize:15
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal:10,
    height:120,
    width:120,
    borderRadius:3,
    marginRight:-5
  },
  title: {
    fontSize: 12,
    marginTop:5,
    fontWeight:'600'
  },
  itemPhoto: {
    width: 75,
    height: 75,
    alignSelf:'center'
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 50, // Adjust this value based on the layout
    width: '80%' // Make sure this fits both buttons
  },
  button:{
    backgroundColor: '#1145FD',
    width: 150,
    height: 42,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  
  backButton:{
    backgroundColor: '#EAEAEA',
    width: 150,
    height: 42,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
    borderColor:'#1145FD',
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    alignItems:"center",
  },
  backText:{
    color: '#1145FD',
    fontWeight: '700',
    fontSize: 15,
    alignItems:"center"
  },
});

export default PersonalInterests;
