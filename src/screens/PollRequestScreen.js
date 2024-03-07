import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'

const PollRequest = () => {
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.pollRequestContainer}>
    <Text
     style={{fontWeight:'bold', fontSize:18}}
    >Poll Requests</Text>
    </View>   

  <View
  style={styles.pollResponseContainer}
  >
    <Text
     style={{fontWeight:'bold',
     fontSize:18
     }}>
      Poll Responses</Text>
    </View>     
    </KeyboardAvoidingView>
  )
}

export default PollRequest
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",


  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70  
  },
  pollRequestContainer:{},
  pollResponseContainer:{}
})