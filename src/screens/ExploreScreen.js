import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'

const ExploreScreen = () => {
    return(
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    > 
     <View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
  </View>     
    </KeyboardAvoidingView>
  )
}

export default ExploreScreen 

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
