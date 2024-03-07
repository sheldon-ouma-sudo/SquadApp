import { View, Text, KeyboardAvoidingView, StyleSheet,  } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'

const ActivityScreen = () => {
  const[requestToJoinUserSquadsData,setRequestToJoinUserSquadData] = useState([])
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState([])


  



  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.pollRequestContainer}>
    <Text
     style={{fontWeight:'bold', fontSize:18}}
    >Requests To Join Squads</Text>
    </View>   

  <View
  style={styles.pollResponseContainer}
  >
    <Text
     style={{fontWeight:'bold',
     fontSize:18
     }}>
      Requests to Join Your Squad</Text>
    </View>     
    </KeyboardAvoidingView>
  )
}

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
export default ActivityScreen