import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, Pressable, Button} from 'react-native'
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
  const{width,height} = Dimensions.get("window")
  //const[currentPosition, setCurrentPositon]=useState(0)
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2, 
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#ffff',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1764EF',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1764EF',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor:  '#1764EF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#1764EF',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    //labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fffff'
  }
 
const TestWorkScreen =() => {
   const [numOfVotes, setNumOfVotes] = useState("0")
   const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
   const [pollCaption, setPollCaption] = useState("CLB or Views?")

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
   <View
   style = {styles.votedTextContainer}
   >
    
   <Text
    style = {styles.votedText}
   >
    Voted
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
  //height: 10,
  borderRadius: 15,
  //width:120,
  backgroundColor: "white",
  borderWidth: 5


  },
  votedTextContainer:{
   marginTop:0,
   flex:1,
   //marginStart: 10,
   marginEnd: 10,
   height: 50,
   width: 100,
   backgroundColor: "#1145FD",
   alignItems: 'center',
   borderRadius: 27,
   borderColor: "#C2B960",
   //marginRight: 20,
   borderWidth: 3,
   marginTop:150,
   marginLeft:120
  },
  votedText:{
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft:50
    

  }, 
  userImageContainer:{
   marginStart:-10,
   marginTop:120
  },
  userImage:{
      width:140,
      height:100
  },
 
  },
  )
export default TestWorkScreen