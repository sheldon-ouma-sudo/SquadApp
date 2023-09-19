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
   const [numOfVotes, setNumOfVotes] = useState("")

  const navigation = useNavigation()
  
 
  return (
    <Pressable
    style={styles.container}
    behavior="padding"
    >
   
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
   marginTop:50,
   flex:1,
   marginStart: 190,
   //marginEnd: 80,
   height: 50,
   width: 190,
   backgroundColor: "#1145FD",
   alignItems: 'center',
   borderRadius: 27,
   borderColor: "#C2B960",
   marginRight: 20,
   borderWidth: 3,
  },
  votedText:{
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft:50
    //borderRadius: 10,

  }
 
  },
  )
export default TestWorkScreen