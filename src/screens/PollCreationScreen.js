import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Camera, CameraType } from 'expo-camera'
import { async } from '@firebase/util'
import { Octicons } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 


const PollCreation = () => {
  const[hasCameraPermissions, setHasCameraPermissions] = useState(null)
  const[image, setImage]= useState(null)
  const[type, setType]= useState(Camera.Constants.Type.back)
  const[flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef=useRef(null)
  

  useEffect (()=>{(
    async() => {
      MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermissions(cameraStatus.status === 'granted')
    })();
   
  },[])
  return (
    <View style={styles.container}>
   
    <Camera
    style={styles.camera}
    type= {type}
    flashMode={flash}
    ref={cameraRef}
    >
       <Entypo name="circle" size={100} color='#1145FD' style={[{marginTop:600},{ marginLeft:170}]} />
      <TouchableOpacity  style={[styles.cameraButtonContainer, {height:70},{backgroundColor:'#1145FD'},{borderRadius:50}]}>
      <Octicons name="screen-full" size={34} color="white" style={[{marginTop:15}]} />
    </TouchableOpacity>
    </Camera>
    <View  >
  
    
    </View>
    </View>
  )
}

export default PollCreation
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"center",
 // alignItems:"center",
  backgroundColor: "#F4F8FB",


  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70  
  },
  camera:{
    flex:1,
    borderRadius:1,
    marginBottom:-420

  },
  cameraButtonContainer:{
    marginTop:-85,
    //marginRight:180,
    alignItems:'center',
    marginBottom:120,
    //height:40,
    width:70,
    marginLeft:185


  
  },
  button:{
  //height:120,
   width:120,
   borderRadius:20
   //marginLeft:100,
  // marginRight:120,
   //marginBottom:50,
   
  }

})