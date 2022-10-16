import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/core';
  import { async } from '@firebase/util';
  import * as ImagePicker from 'expo-image-picker'

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

const UploadProfPicture = () => {
  const navigation = useNavigation()
  const[currentPosition, setCurrentPositon] = useState(1)
  const[hasGalleryPermissions, setGallerPermissions] = useState(null)
  const[image, setImage]= useState(null )

useEffect(()=>{
  (async()=>{
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGallerPermissions(galleryStatus === 'granted');
  })()
},[])


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    meadiaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, 
    aspect:[4,3],
    quality:1,
  });
  console.log(result)
  if(!result.cancelled){
    setImage(result.uri)
  }
  if(hasGalleryPermissions===false){
    return<Text>No access to photo gallery</Text>
  }
}

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
        name='person-circle'
        size={172}
        color='#808080'
        style={[{marginLeft:-8},{justifyContent:"center"},{marginTop:-18},]}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity
            //onPress={handleLogin}
            style = {styles.profilePictureButton}
                > 
                <Text style={styles.buttonText}>
                  Upload Profile Picture
                </Text>

            </TouchableOpacity>
    </View>

           {/**this is the view with the google and the facebook icons */}
           <TouchableOpacity style= {[{flexDirection:"row"}, styles.profPictureUpload]}>
                    <TouchableOpacity 
                    style= {{flex:1}}
                    >
                      <View
                        style= {[{justifyContent:'flex-start'},styles.cameraUploadStyle]}
                        >
                          <FontAwesome name="photo" size={50} style={styles.photoIcons} color='#1764EF' />
                        </View>
                        <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style= {{fex:1}}
                    >
                           <View
                            style={[{justifyContent:'flex-end'},styles.photoUploadStyle]}
                            >
                               <Entypo name="camera" size={55} style={styles.cameraIcons}color='#1764EF'/>
                            </View>
                            <Text style={styles.captureText}>Capture</Text>
                    </TouchableOpacity>       
                </TouchableOpacity>




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
    marginTop:70
    

 
},
header:{
  height: 55, 
  //padding:10, 
  width:'50%',
  //backgroundColor:"#000",
  //elevation:10,
  justifyContent:"center",
  alignItems:'center',
  marginRight:200,
  marginTop: 10,
  marginLeft:35
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
    width: 180,
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
  width: 180,
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
profPictureUpload:{
backgroundColor:'white',
marginTop:140,
borderRadius:20,
marginLeft:20,
marginRight:20,
height:300
},

cameraUploadStyle:{
 padding:15,
 backgroundColor:'#EAEAEA',
 borderRadius:20,
 width:150,
 height:120,
 marginTop:60,
 marginLeft:40,
 alignItems:'center'

},
photoUploadStyle:{
  padding:15,
  backgroundColor:'#EAEAEA',
  borderRadius:20,
  width:150,
  height:120,
  marginTop:60,
  marginRight:40,
  alignItems:"center",
  

 },
 cameraIcons:{
  marginBottom:30,
  marginTop:10
},
photoIcons:{
  marginTop:10
},

captureText:{
  marginLeft:54,
  marginTop:10
},
uploadText:{
 marginLeft:80,
 marginTop:10
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

export default UploadProfPicture