import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const SquadCreationScreen = () => {
  return (
    <View>
      <Text>Create your Squad</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor: "#F4F8FB"
  },
  squadLogo:{
      width:221,
      height:85


  },
  InputContainer:{
      width: 296,
      right: 16,
      marginLeft:29,
      marginTop: 20,
      borderRadius:5

  },

  input:{
      backgroundColor: '#EAEAEA',
      paddingHorizontal: 15,
      paddingVertical:10,
      borderRadius:5,
      width:296,
      height:42,
      marginTop:10,
      fontSize: 13,
      marginRight:15,
      marginLeft:10,
      fontStyle:"Montserrat",
      color:'#535353',
      fontWeight:'400'   
  },
  errorText:{
      color:'#FFFFF',
      marginLeft:20,
      fontSize:12,
      //textAlign:'center'


  },
      buttonContainer:{
      width: 296,
      height:42,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 23,
      marginBottom: 60
  },

  button:{
      backgroundColor: '#1145FD',
      width: 296,
      height: 42,
      padding: 15,
      borderRadius: 5,
      marginTop: -2,
      alignItems: 'center',
      marginRight: 10,
      marginLeft:15,
      top: 0


  },
  buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 12.5
      
  },
  buttonOutline:{
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: '#1145FD',
  borderWidth: 2,


  },
  buttonOutlineText:{
      color: '#1145FD',
      fontWeight: '700',
      fontSize: 16
  },
  textWrapper:{
      textAlign:'left',
      marginTop:5,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'flex-start'

  },

  text:{
  fontSize: 12,
  textAlign: 'left',
  marginTop:10,
  marginBottom: 10,
  marginLeft:10,
  alignItems:'left',
  fontStyle: "Montserrat"


  },
  loginText:{
      fontSize: 14,
      marginTop: -40,
      marginBottom:10,
      marginLeft: 10,
      fontWeight:'bold',
      fontStyle:"Montserrat"
  },
  horizontalLineContainer:{},
  googleLogo:{
  height: 30, 
  width:30,
  borderRadius:20,
  overflow:'hidden',
  borderWidth:1,
  borderColor: "red",
  marginLeft:180,
  marginTop:-5

  },
  facebookLogo:{
      height: 30, 
      width:30,
      borderRadius:20,
      overflow:'hidden',
      borderWidth:1,
      borderColor: "red",
      marginRight:170,
      marginTop:-5
  },
  logo:{
  marginTop:-37
  },
  phoneContainer: {
      width: '75%',
      height: 50,
      marginLeft: 10
  },
  textInput: {
      paddingVertical: 0,
  }
  })
export default SquadCreationScreen