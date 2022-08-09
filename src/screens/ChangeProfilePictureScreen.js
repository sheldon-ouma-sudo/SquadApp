    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,TouchableOpacity} from 'react-native'
    import React, { useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { Icon } from 'react-native-elements';
    import Ionicons from '@expo/vector-icons/Ionicons';
    import { useNavigation } from '@react-navigation/core';

const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
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
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fffff'
}

const ChangeProfilePictureScreen = () => {
 
   const navigation = useNavigation()
   const[currentPosition, setCurrentPositon] = useState(1)
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
     
     <View style={styles.profilePictureContainer}>
         <TouchableOpacity>
         <Ionicons
         name='camera'
         size={100}
         style={[{marginLeft:20},{justifyContent:"center"},{marginTop:20}]}
         />
         </TouchableOpacity>
       </View>
       <View style={styles.buttonContainer}>
             <TouchableOpacity
             //onPress={handleLogin}
             style = {styles.profilePictureButton}
                 > 
                 <Text style={styles.buttonText}>
                  Change Profile Picture
                 </Text>
 
             </TouchableOpacity>
     </View>
 
       <View style={[{ flexDirection:"row" },{marginTop:-10}, {marginBottom:30},{marginLeft:30}]}>
         <TouchableOpacity  onPress={() =>navigation.replace('UploadProfPictureScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
             <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
            </TouchableOpacity>
             <TouchableOpacity  onPress={() =>navigation.replace('PersonalInterestScreen')}style={[{flex:1}, styles.button]}>
             <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
            </TouchableOpacity>
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
     //elevation:10,
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
     //elevation:10,
     borderRadius:20,
     //backgroundColor:'blue'
   },
   profilePictureContainer:{
             height: 150, 
             width:150,
             borderRadius:90,
             overflow:'hidden',
             borderWidth:3,
             borderColor: '#1764EF',
             marginRight:170,
             marginLeft:170,
             marginTop:30
   },
   button:{
     backgroundColor: '#1145FD',
     width: 120,
     height: 42,
     padding: 10,
     borderRadius: 5,
     marginTop: 130,
     alignItems: 'center',
     marginRight: 50,
     marginLeft:20,
 
 },
 
 backButton:{
   backgroundColor: '#EAEAEA',
   width: 120,
   height: 42,
   padding: 10,
   borderRadius: 5,
   marginTop: 130,
   alignItems: 'center',
   marginRight: 5,
   marginLeft:15,
   borderColor:'#1145FD'
 
 
 },
 buttonText:{
   color: 'white',
   fontWeight: '700',
   fontSize: 15,
   alignItems:"center"
   
   
 },
 backText:{
   color: '#1145FD',
   fontWeight: '700',
   fontSize: 15,
   alignItems:"center"
   
   
 },
   
 profilePictureButton:{
   backgroundColor: '#1145FD',
   width: 256,
   height: 42,
   padding: 10,
   borderRadius: 5,
   marginTop: 30,
   alignItems: 'center',
   marginRight: 50,
   marginLeft:50,
 
 },
 })
 export default ChangeProfilePictureScreen
  
