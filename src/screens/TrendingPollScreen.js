import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const TrendingPollScreen = () => {
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
        
    </KeyboardAvoidingView>
  )
}

export default TrendingPollScreen

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
})