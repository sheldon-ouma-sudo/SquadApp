    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions} from 'react-native'
    import React, { useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
     
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
     
     
const PersonalInterests = () => {
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

    </KeyboardAvoidingView>
  )
}

export default PersonalInterests

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