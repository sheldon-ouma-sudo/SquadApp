import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, Pressable, Button,TextInput} from 'react-native'
  import React, { useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  import { TouchableOpacity } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { Icon } from 'react-native-elements';
  import { fontSize } from '@mui/system';
  import { Entypo } from '@expo/vector-icons'; //contacts
  import { Ionicons } from '@expo/vector-icons'; 
  import { FontAwesome5 } from '@expo/vector-icons';//instagram and tiktok 
  import { FontAwesome } from '@expo/vector-icons'; //snapchat
  import { AntDesign } from '@expo/vector-icons'; //twitter\
  import Share from 'expo-sharing' ;
  
  //const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
  //const[currentPosition, setCurrentPositon]=useState(0)
  
 
const TestWorkScreen =() => {
   const [numOfVotes, setNumOfVotes] = useState("1,000,000")
   const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
   const [pollCaption, setPollCaption] = useState("dining hall with best food today")
   const [pollCreator, setPollCreator] = useState("Drake")

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
   
   <View>
      <Text
      style = {styles.pollCaption}
      >{pollCaption}</Text>
      <Text
      style = {styles.pollCreator}
      >
        Created by {pollCreator}
      </Text>
    </View>
  
   <View
   style = {styles.votedTextContainer}
   > 
   <Text
    style = {styles.votedText}>
    {numOfVotes} Voted
   </Text>
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
  borderColor: "#C2B960",
  height: 100,
  borderRadius: 15,
  backgroundColor: "white",
  borderWidth: 5


  },
  votedTextContainer:{
   //marginTop:0,
   flex:1,
   marginStart: 50,
   marginEnd: 10,
   height: 25,
   width: 50,
   backgroundColor: "#1145FD",
   alignItems: 'center',
   borderRadius: 40,
   borderColor: "#C2B960",
   //marginRight: 20,
   borderWidth: 2.5,
   marginTop:60,
   //marginLeft:-105
  },
  votedText:{
    color: "white",
    fontWeight: "bold",
    marginTop: 6,
    //marginLeft:1,
    fontSize: 7
    

  }, 
  userImageContainer:{
   marginStart:10,
   marginTop:45
  },
  userImage:{
      width:50,
      height:50
  },
 pollCaption:{
  marginTop:45,
  fontWeight:'500',
  fontSize:10,
  marginLeft:5
 },
 pollCreator:{
  marginTop: 15,
  marginLeft: 5,
  fontSize: 9,
  color: '#545454'
 }
  },
  )
export default TestWorkScreen