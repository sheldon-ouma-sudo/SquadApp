import { View, Text,KeyboardAvoidingView,Image, StyleSheet,StatusBar,Dimensions} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import { Input, Icon } from 'react-native-elements'

 
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
  stepStrokeFinishedColor: '#ffff',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#ffff',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fff',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#1764EF',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fffff'
}
 
 

const ForgotPasswordScreen = () => {
  
const[currentPosition, setCurrentPositon] = useState(0)
const data=[
 {label:"ordered and delivered", 
 status:"your order is on its way", 
 dateTime:"Sat, 4th November 11.34pm"
},
 {label:"ordered and delivered", 
 status:"your order is on its way",
  dateTime:"Sat, 4th November 11.34pm"
},
 {label:"ordered and delivered",
  status:"your order is on its way", 
  dateTime:"Sat, 4th November 11.34pm"
},
 {label:"ordered and delivered",
  status:"your order is on its way", 
  dateTime:"Sat, 4th November 11.34pm"
},



];
  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
        >
        <View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
            style={styles.squadLogo}
            resizeMode='contain'
          ></Image>
        </View>      
        <StatusBar backgroundColor={'black'} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}> Sign Up Progress</Text>
        </View>
        <View style={styles.indicatiorWindow}>
        <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         //labels={labels}
         />
        </View>  
        <View style={styles.InputContainer}>
         <Input
         //style={styles.input}
         
         />


        </View>

  
        </KeyboardAvoidingView>
  )
}


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
    marginTop:-10
    //backgroundColor:'blue'
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
  //fontFamily:"Montserrat-Regular",
  color:'#535353',
  fontWeight:'400'   
},
  
})
export default ForgotPasswordScreen