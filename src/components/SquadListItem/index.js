import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from "@expo/vector-icons";
//import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const SquadListItem =({ squad,
  onPress = () => {},
  selectable = false,
  isSelected = false,})=>{
  // const [numOfVotes, setNumOfVotes] = useState("32000000")
  // const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
  // const [squadCreator, setSquadCreator] = useState("Oseas")
  // const [squadName, setSquadName] = useState("Oseas's Squad")

 const navigation = useNavigation()
 //fetch the poll
 //fetch the Squad by the SquadID
 //fetch the user from the squad 
 //fetch the user profile picture
 //

 return (
   <Pressable
   style={styles.container}
   behavior="padding"
   >
  <View
   style={styles.userImageContainer}
  >
  <FontAwesome name="group" size={34} color="#1145FD" style={{marginTop:-25}}/>
  </View>
  <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
   <View
   style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
   >
       <Text
        style = {styles.pollCaption}
       > 
       squadName
       </Text>
       <Text
       style = {styles.pollCreator}
       >
         Created by SquadCreator
       </Text>
     </View>
     <TouchableOpacity
       style = {[styles.joinSquadTextContainer, {justifyContent:'flex-end'},{alignItems:'center'},]}
       > 
       <Text
       style={{color:'white', marginBottom:10}}
       >Join Squad</Text>
       </TouchableOpacity>
  </View>
   </Pressable>
 )
 }

 
 const styles = StyleSheet.create({
 container:{
 flex:1,
 flexDirection: "row",
 marginHorizontal: 10,
 marginTop: 20,
 //marginVertical: 65,
 borderColor: "#FFFF",
 //height: 100,
 borderRadius: 15,
 backgroundColor: "white",
 borderWidth: 5,
 marginRight:30


//  flex:1,
//  flexDirection: "row",
//  //marginHorizontal: 10,
//  marginTop: 20,
//  marginVertical: 65,
//  borderColor: "#FFFF",
//  height: 5,
//  width: 600,
//  borderRadius: 5,
//  //marginBottom:5,
//  //backgroundColor: "white",
//  borderWidth: 5,
//  //shadowColor: '#000',
// shadowOffset: {width: 0, height: 0},
// elevation: 1.5,
// shadowOpacity: 0.1,
// borderColor:'#F4F8FB',
// shadowRadius: 5,
// backgroundColor: "#F4F8FB"
 
},


 pollCaptionContainer:{
   height: 50,
   width: 180,
 },
 joinSquadTextContainer:{
  height:40,
  width: 95,
  backgroundColor: "#1145FD",
  borderRadius: 10,
  borderColor: "#FFFF",
  borderWidth: 2.5,
  marginLeft:25,
  marginTop:-25
  
 },
 votedText:{
   color: "white",
   fontWeight: "bold",
   marginBottom:7,
   marginLeft:1,
   fontSize: 8.5,
   textAlignVertical:'center'








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
pollCaption:{
 fontWeight:'500',
 marginLeft:5,
 marginTop:-40
},
pollCreator:{
 marginTop: 5,
 marginLeft: 5,
 color: '#545454',
}
 },
 )
export default SquadListItem;