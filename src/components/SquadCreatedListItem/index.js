    import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
    import { useNavigation } from '@react-navigation/native';
    import { useState, useEffect} from "react";
    import { AntDesign, FontAwesome } from "@expo/vector-icons";
    import { updateUser } from "../../graphql/mutations";
    import { getSquad } from "../../graphql/queries";
    import { graphqlOperation, Auth, API } from 'aws-amplify';

    const SquadCreatedListItem = ({ squad,
      userInfo,
      onPress = () => {},
      selectable = false,
      isSelected = false,})=>{
    const navigation = useNavigation()
    const[squadSelected, setSquadSelected] = useState(false)
    const[userSquadsJoinedArray, setUserSquadsJoinedArray] = useState([])
    const[squadCreatedName, setSquadCreatedName] = useState("Squad Created")


    useEffect(() => {
      const fetchSquad = async () => {
        setSquadCreatedName(squad.squadName)
      //  try {
      //       //const result = API.graphqlOperation(graphql(getSquad))
      //       const squadData = await API.graphql(graphqlOperation(getSquad, { id: squad }));
      //       console.log("here is the squadData", squadData)
      //       console.log("here is the squad name",squadData.data?.getSquad.squadName)
      //       setSquadJoinedName(squadData.data?.getSquad.squadName)
      //   } catch (error) {
      //      console.log("error quering the squad",error) 
      //   } 
        
        }
        fetchSquad()
    }, []);
    //add the squad selected to the user's joined squad array
    const handleSquadSelected=async() =>{
      navigation.navigate('SquadDisplayScreen',{squad:squad});
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
              style={[{ justifyContent: "flex-end" },{ alignItems: "center" },squadSelected ? styles.joinedSquadTextContainer : styles.joinSquadTextContainer, // Add this condition
    ]}
            onPress={handleSquadSelected}
              >
            <Text style={{ color: "white", marginBottom: 10 }}>
                Edit
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
      //marginVertical: 65,
      borderColor: "#C2B960",
      //height: 100,
      borderRadius: 35,
      backgroundColor: "white",
      borderWidth: 3.5,
      marginRight:30
    },
    pollCaptionContainer:{
      height: 50,
      width: 180,
    },
    joinSquadTextContainer:{
      height:40,
      width: 95,
      backgroundColor: "#1145FD",
      borderRadius: 16,
      borderColor: "#FFFF",
      borderWidth: 2.5,
      marginLeft:25,
      marginTop:-25
      
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
    export default SquadCreatedListItem 