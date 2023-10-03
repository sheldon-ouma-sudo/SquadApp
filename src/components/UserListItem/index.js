import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const UserListItem =() => {
    const [numOfVotes, setNumOfVotes] = useState("32000000")
    const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
    const [squadCreator, setSquadCreator] = useState("Oseas")
    const [squadName, setSquadName] = useState("Oseas's Squad")
 
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
    <Image
    //source={{uri: userImage}}
    source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
    resizeMode='contain'
    style={styles.userImage}
    />
    </View>
    <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
     <View
     style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
     >
         <Text
          style = {styles.pollCaption}
         > {squadName}
         </Text>
         <Text
         style = {styles.pollCreator}
         >
           Created by {squadCreator}
         </Text>
       </View>
       <TouchableOpacity
         style = {[styles.numOfVotesContainer, {justifyContent:'flex-end'},{alignItems:'center'},]}
         > 
            <Entypo name="add-user" size={24} color="black" />
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
   marginTop: 80,
   marginVertical: 85,
   borderColor: "#FFFF",
   height: 100,
   borderRadius: 15,
   backgroundColor: "white",
   borderWidth: 5
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
   marginLeft:5
  },
  pollCreator:{
   marginTop: 5,
   marginLeft: 5,
   color: '#545454',
  }
   },
   )
export default UserListItem