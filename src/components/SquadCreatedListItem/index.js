    import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
    import { useNavigation } from '@react-navigation/native';
    import { useState, useEffect} from "react";
    import FontAwesome from '@expo/vector-icons/FontAwesome';

    const SquadCreatedListItem = ({ squad})=>{
    const navigation = useNavigation()
    const[squadSelected, setSquadSelected] = useState(false)
    const[userSquadsJoinedArray, setUserSquadsJoinedArray] = useState([])
    const[squadCreatedName, setSquadCreatedName] = useState("Squad Created")


    useEffect(() => {
      const fetchSquad = async () => {
        setSquadCreatedName(squad.squadName) 
        }
        fetchSquad()
    }, []);
    //add the squad selected to the user's joined squad array
    const handleSquadSelected=async() =>{
      navigation.navigate('EditSquadScreen',{squad:squad});
    }
    const handleSquadCreatedListItemPress = () => {
      // Navigate to the screen with the poll
      navigation.navigate('SquadDisplayScreen',{squad:squad});
    };
     
    return (
      <TouchableOpacity
      style={styles.container}  
      behavior="padding"
      onPress={handleSquadCreatedListItemPress}
      >
      <View
      style={styles.userImageContainer}
      >
      <FontAwesome name="group" size={34} color="#1145FD" style={{marginTop:-25}}/>
      </View>
      <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
      <View style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}>
          <Text style = {styles.squadNameText}> 
          {squadCreatedName}
          </Text>
          <Text style = {styles.squadCreator}>
            Created by {squad?.authUserName}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleSquadSelected}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    )
    }

    
    const styles = StyleSheet.create({
      container:{
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 20,
        borderColor: "#C2B960", // Ensure border color is set
        borderRadius: 28, // Adjust radius to match desired shape
        backgroundColor: "white",
        borderWidth: 4, // Ensure proper border width
        padding: 15, // Padding to keep the content away from the edges
        width: '95%', // This makes sure the item doesn't fill the full screen width
        alignSelf: 'center', // Align the squad item at the center horizontally
        shadowColor: '#000', // Optional: Add shadow for visual appeal
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginLeft: -10,
        elevation: 3, // For Android shadow
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
      },
      joinSquadTextContainer:{
        height:40,
        width: 95,
        backgroundColor: "#1145FD",
        borderRadius: 16,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        marginLeft:5,
        marginTop:-15
      },
      joinedSquadTextContainer:{
        height:40,
        width: 95,
        backgroundColor: "#FFFF",
        borderRadius: 15,
        borderColor:"#1145FD",
        borderWidth: 2.5,
        marginLeft:25,
        marginTop:-25
      },
      editButton: {
        height: 40,
        width: 100, // Fixed width for consistency
        backgroundColor: "#1145FD",
        borderRadius: 16,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      editButtonText: {
        color: "white",
        fontWeight: '600',
      },
    });
    
    export default SquadCreatedListItem 