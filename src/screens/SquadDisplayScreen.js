import React, {useState , useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import SquadPollScreen from './SquadPollScreen';
import SquadUserScreen from './SquadUserScreen';
import { API, graphqlOperation } from 'aws-amplify';
// import { listSquadUsers } from '../graphql/queries';
import { squadUsersBySquadId } from '../graphql/queries';
import { squadPollsBySquadId } from '../graphql/queries';
import { onCreateSquadPoll, onCreateSquadUser } from '../graphql/subscriptions';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from "dayjs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


const SquadDisplayScreen = () => {
const[squadName, setSquadName] = useState("Squad Name")
const [numOfSqudPolls, setNumOfSquadPolls] = useState(0)
const [numOfSquadMembers, setNumOfSquadMembers] = useState(0)
const [squadCreator, setSquadCreator] = useState("Squad Creator")
const [squadCreationTime, setSquadCreationTime] = useState("")
const [squadUsers, setSquadUsers] = useState([]);
const [squadPolls, setSquadPolls] = useState([]);
  const route = useRoute()
  const navigation = useNavigation()
  const Tab = createMaterialTopTabNavigator();
  const { squad } = route?.params;  // Destructure squad from route params

  // Fetch squad users when the component mounts
// Fetch squad users when the component mounts
useEffect(() => {
  const fetchSquadUsers = async () => {
    try {
      if (squad) {
        const squadID = squad.id;
        const result = await API.graphql(graphqlOperation(squadUsersBySquadId, { squadId: squadID }));
        const users = result?.data?.squadUsersBySquadId?.items || [];
         console.log("here are the users",users)
        // Deduplicate users by filtering out identical user IDs
        const uniqueUsers = users.reduce((acc, currentUser) => {
          if (!acc.find(user => user.userId === currentUser.userId)) {
            acc.push(currentUser);
          }
          return acc;
        }, []);
       console.log("here are the unique users", uniqueUsers)
        // Update squad users and squad member count
        setSquadUsers(uniqueUsers);
        setNumOfSquadMembers(uniqueUsers.length); // Update the member count
      }
    } catch (error) {
      console.error('Error fetching squad users:', error);
    }
  };

  fetchSquadUsers();
}, [squad]);

useEffect(() => {
  if (squad) {
    // Fetch polls for the squad
    const fetchSquadPolls = async () => {
      try {
        const result = await API.graphql(graphqlOperation(squadPollsBySquadId, { squadId: squad.id }));
        console.log("here are the results", result)
        const polls = result?.data?.squadPollsBySquadId?.items 
        // Log the entire result, expanded to see the contents of the polls array
       console.log('Squad Polls:', result.data?.squadPollsBySquadId.items);
        console.log("here are the squad polls", polls)
        setSquadPolls(polls);  // Set polls in the state
        setNumOfSquadPolls(polls.length);  // Update number of polls
      } catch (error) {
        console.error("Error fetching squad polls:", error);
      }
    };

    fetchSquadPolls();
  }
}, [squad]);

useEffect(() => {
  if (squad) {
    const squadId = squad.id;
    
    // Set up subscription to listen for new polls specific to this squad
    const subscription = API.graphql(
      graphqlOperation(onCreateSquadPoll, { squadId })  // Pass the squadId as a filter
    ).subscribe({
      next: ({ value }) => {
        const newPoll = value.data.onCreateSquadPoll;

        // Ensure the new poll belongs to the current squad
        if (newPoll.squadId === squadId) {
          console.log("New poll created for this squad:", newPoll);
          setSquadPolls((prevPolls) => [...prevPolls, newPoll]); // Add new poll to the state
          setNumOfSquadPolls((prevCount) => prevCount + 1); // Increment the number of polls
        }
      },
      error: (error) => {
        console.error("Error with squad poll subscription:", error);
      },
    });

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }
}, [squad]);

 // Subscription for new squad users
 useEffect(() => {
  if (squad) {
    const squadId = squad.id;

    // Set up subscription to listen for new squad users specific to this squad
    const subscription = API.graphql(
      graphqlOperation(onCreateSquadUser, { squadId }) // Assuming this subscription exists
    ).subscribe({
      next: ({ value }) => {
        const newUser = value.data.onCreateSquadUser;

        // Ensure the new user belongs to the current squad
        if (newUser.squadId === squadId) {
          console.log('New user added to this squad:', newUser);
          setSquadUsers(prevUsers => [...prevUsers, newUser]); // Add new user to the state
          setNumOfSquadMembers(prevCount => prevCount + 1); // Increment the number of members
        }
      },
      error: error => {
        console.error('Error with squad user subscription:', error);
      },
    });

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }
}, [squad]);

  useEffect(() => {
    if (squad) {
      console.log("here is the squad details", squad);
      const squad_name = squad.squadName;
      const squad_creator = squad.authUserName;
      const squad_creationTime = dayjs(squad.createdAt).format('MMMM D, YYYY');
      setSquadName(squad_name);
      setSquadCreator(squad_creator);
      setSquadCreationTime(squad_creationTime);
    }
  }, [squad]);


  return (
    <>
      <TouchableOpacity
        style={{ marginTop: 10, backgroundColor: "#F4F8FB" }}
      >
        <TouchableOpacity
          style={{ marginLeft: 10, marginStart: 30, marginTop: 50 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#1764EF" />
        </TouchableOpacity>

        <View style={styles.userImageContainer}>
          <FontAwesome name="group" size={64} color="#1145FD" style={{ marginTop: -25 }} />
        </View>

        <View style={{ backgroundColor: "#F4F8FB" }}>
          <View style={{ marginTop: -70 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 130, marginBottom: 20 }}>
              {squadName}
            </Text>
          </View>

          <View style={{ marginLeft: 140 }}>
            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '800', marginBottom: 10 }}>
              {numOfSqudPolls}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '400' }}>
              Polls
            </Text>
          </View>

          <View style={{ marginLeft: 300, marginTop: -36 }}>
            <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: '800' }}>
              {numOfSquadMembers}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '400' }}>
              Members
            </Text>
          </View>

          <View style={{ marginLeft: 100, marginTop: 16 }}>
            <Text style={{ marginLeft: 30, fontSize: 15, fontWeight: '800' }}>
              Created by @{squadCreator}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '400', marginLeft: 30 }}>
              {squadCreationTime}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, marginTop: 20, backgroundColor: "#F4F8FB" }}>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Text style={{ color: '#ffff', fontSize: 12, marginTop: 10, alignSelf: 'center', fontWeight: 'bold' }}>
              Join Squad
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('RootNavigation', { screen: 'Poll Creation' })}
            style={styles.createSquadButton}
          >
            <Text style={{ color: '#ffff', fontSize: 12, marginTop: 10, alignSelf: 'center', fontWeight: 'bold' }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Tab.Navigator
        style={[{ marginBottom: 40 }, { marginEnd: 5 }, { marginStart: 5 }, { borderRadius: 9 }]}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Polls') {
              iconName = 'poll';
            } else if (route.name === 'Members') {
              iconName = 'groups';
            }
            const iconColor = focused ? '#1145FD' : '#707070';
            return <MaterialIcons name={iconName} size={25} color={iconColor} />;
          },
        })}
      >
          <Tab.Screen
        name="Polls"
        children={() => <SquadPollScreen squadPolls={squadPolls} />}  // Pass polls to SquadPollScreen
      />
        <Tab.Screen
          name="Members"
          children={() => <SquadUserScreen squadUsers={squadUsers} />}  // Pass squad users to SquadUserScreen
        />
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",
  },
  userImageContainer:{
    marginStart:40,
    marginTop:70
    },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70  
  },
  button:{
    backgroundColor: '#1764EF',
    width: 200,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
    marginBottom:10
  },
  createSquadButton:{
    backgroundColor: '#1764EF',
    width: 180,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
    marginBottom:10
  },
  editProfileButton:{
    backgroundColor: '#1764EF',
    width: 180,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:5,
    marginBottom:10
  },
})

export default SquadDisplayScreen;
