import { View, Text } from 'react-native'
import React from 'react'

const ProfilePictureUpload = () => {
  return (
    <View>
      <Text>ProfilePictureUpload</Text>
    </View>
  )
}

export default ProfilePictureUpload
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB"

  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:130
      


  },
  header:{
    height: 55, 
    padding:10, 
    width:'50%',
    //backgroundColor:"#000",
    elevation:10,
    justifyContent:"center",
    alignItems:'center',
    marginRight:200,
    marginTop: 20,
  },
  headerText:{
    //color:'red',
    fontSize:22,
    fontWeight:'bold'
  },
  indicatiorWindow:{
    //height:height-170,
    width:width-30,
    padding:20,
    margin:15,
    elevation:10,
    borderRadius:20,
    //backgroundColor:'blue'
  },
  
})