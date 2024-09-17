import { Text, StyleSheet, Alert, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from "react";
import {  FontAwesome } from "@expo/vector-icons";
import { updateUser } from "../../graphql/mutations";
import { getSquad } from "../../graphql/queries";
import { graphqlOperation, Auth, API } from 'aws-amplify';
import { deleteSquadUser } from "../../graphql/mutations";
//import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";



dayjs.extend(relativeTime);

const SquadJoinedListItem =({ squad, userInfo, onLeaveSquad})=>{
 const navigation = useNavigation()
 const[squadSelected, setSquadSelected] = useState(false)
 const[squadName, setSquadName] = useState("squad name")
 const[squadCreator, setSquadCreator] = useState("squad creator")

 useEffect(() => {
 if (squad && typeof squad === "object" && Object.keys(squad).length > 0) {
  // Safely extract squadName and authUserName
  console.log("here is the squad", squad)
  const { squadName: name, authUserName: creator } = squad;

  if (name) {
    console.log("Squad Name: ", name);
    setSquadName(name);
  } else {
    console.log("Squad name is missing or undefined.");
    setSquadName("Unnamed Squad");
  }

  if (creator) {
    console.log("Squad Creator: ", creator);
    setSquadCreator(creator);
  } else {
    console.log("Squad creator is missing or undefined.");
    setSquadCreator("Unknown Creator");
  }
} else {
  console.log("Squad object or necessary fields are undefined.");
  setSquadName("Unnamed Squad");
  setSquadCreator("Unknown Creator");
}
}, [squad]);


const handleLeaveSquad = async () => {
  Alert.alert(
    "Leave Squad",
    `Are you sure you want to leave ${squad.squadName}?`,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Leave",
        onPress: async () => {
          setSquadSelected(false); // Update UI immediately
          try {
            // Backend update to remove the squad from the user's joined squads
            const updatedSquadJoined = user.squadJoined.filter(sq => sq.id !== squad.id);
            const updatedSquadJoinedID = user.squadJoinedID.filter(sqId => sqId !== squad.id);

            await API.graphql(graphqlOperation(updateUser, {
              input: {
                id: user.id,
                squadJoined: updatedSquadJoined.map(sq => sq.id),
                squadJoinedID: updatedSquadJoinedID
              }
            }));

            // Delete the SquadUser relationship
            await API.graphql(graphqlOperation(deleteSquadUser, {
              input: { userId: user.id, squadId: squad.id }
            }));

            // Update the UI
            onLeaveSquad(squad.id);

            console.log("Successfully left the squad:", squad.squadName);
          } catch (error) {
            console.log("Error leaving squad:", error);
            Alert.alert("Error", "An error occurred while trying to leave the squad. Please try again.");
            setSquadSelected(true);  // Revert UI if there was an error
          }
        }
      }
    ]
  );
};

const handleSquadJoinedListItemPress = () => {
  // Navigate to the screen with the squad
  navigation.navigate('SquadDisplayScreen', { squad });
};
 return (
   <TouchableOpacity
   style={styles.container}
   onPress={handleSquadJoinedListItemPress}
   behavior="padding"
   >
  <View
   style={styles.userImageContainer}
  >
  <FontAwesome name="group" size={34} color="#1145FD" style={{marginTop:-25}}/>
  </View>
  <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
   <View style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}>
       <Text style = {styles.squadNameText}> 
       {squadName}
       </Text>
       <Text style = {styles.squadCreator}>
         Created by {squadCreator}
       </Text>
     </View>
     <TouchableOpacity
          style={[{ justifyContent: "flex-end" },{ alignItems: "center" },squadSelected ? styles.joinedSquadTextContainer : styles.joinSquadTextContainer, // Add this condition
 ]}
        onPress={handleLeaveSquad}
          >
        <Text style={{ color: squadSelected ? "#1145FD" : "white", marginBottom: 10 }}>
            {squadSelected ? "Squad Left!" : "Leave Squad"}
        </Text>

    </TouchableOpacity>
  </View>
   </TouchableOpacity>
 )
 }

 
 const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 20,
    borderColor: "#C2B960",
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 3.5,
    marginRight:30, 
    width:400
  },
  pollCaptionContainer:{
    height: 50,
    width: 180,
  },
  joinSquadTextContainer:{
    height:40,
    width: 125,
    backgroundColor: "#1145FD",
    borderRadius: 15,
    borderColor: "#C2B960",
    borderWidth: 2.5,
    marginLeft:5,
    marginTop:-25
    
  },
  joinedSquadTextContainer:{
    height:40,
    width: 125,
    backgroundColor: "#FFFF",
    borderRadius: 15,
    borderColor:"#1145FD",
    borderWidth: 2.5,
    marginLeft:5,
    marginTop:-25
  },
  
  pollCaptionContainer:{
    height: 50,
    width: 180,
  },
  numOfVotesContainer:{
    height:40,
    width: 95,
    backgroundColor: "#1145FD",
    borderRadius: 10,
    borderColor: "#FFFF",
    borderWidth: 2.5,
    marginLeft:5,
    
  },
  votedText:{
    color: "white",
    fontWeight: "bold",
    marginBottom:7,
    marginLeft:1,
    fontSize: 8.5,
    textAlignVertical:'center'
  }, 
  userImageContainer:{
    marginStart:10,
    marginTop:50
  },
  userImage:{
      width:50,
      height:70
  },
  squadNameText:{
  fontWeight:'500',
  marginLeft:5,
  marginTop:-40
  },
  squadCreator:{
  marginTop: 15,
  marginLeft: 5,
  color: '#545454',
  fontSize:10
  }
  },
  )
export default SquadJoinedListItem;