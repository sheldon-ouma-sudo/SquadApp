import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';
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
  const[currentPosition, setCurrentPositon] = useState(1)
  const[hasGalleryPermissions, setGallerPermissions] = useState(null)
  const[image, setImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMSJIMEYCIQCjD%2FeDZeWBvKjwxs0o7Sco0i0V0exADdssOQdzmf88uwIhANoQfeA2PlqNWVgunp8gus5xCYg7vocFsYvN6iIJObBSKuQCCGwQABoMNzUzMTk1MzE4NjU3Igw60jKYyTkYDHvnppYqwQIhEj2y0H98PS9V%2FcsK60UBMjfTo677%2BbkVMNmY0LEdg3Arq9lgG6Ow4Fcn1hKcR9ybHB2nJgagSbORcH6mf1GI0ADkcB1QkM85xiYcklxLH8sK%2F2rSRX%2F6mZ0mv4JnHbZCXiaebPThJ8RHYluFfZnixG6DOpnRT%2Fex9z7SvVhYCKOr07Q4DjKpXsRI9vZIAN53FykgX5thCP19mNYeyxw7bEPNKCJgctlhXrZXxeQHavptUYWV09ldklV0PnjdTDo6aXGyFGITArpp6KYjjD%2FIgNuvr2r66hjbnJv0atZf5ptfSdqTv%2FnoVb19KEYObq1LSQLPgen1ZNt%2FgLC1nJ%2BjbLQrFs1Qlt1oEiL07Uod1aEq3kDM7OClEXeK78zf0oilLXlEUwsJVEgHk4X%2B9PstA4YqfPDO2BCqbxkky81vVuEwm4ubnAY6sgKUCZf2XyXmGjIhhu49JVzCspxmlIT2%2Bstv1nYxU4Jf3aIRROSZqJtWY0Q5Cwof18Fv%2FaQD58hvEY2Lw26ZpnQDshdP6n%2BB7oNcX6DAfQNw5FgJakNe%2FmgrGgYvMdvIAqosXydHLD3DskQFGQO1Qraig0b9fKin65ZUhahjvaMa5Elm3tPSCTr2vhQoU2z7zG2x%2BewRMy70vqIY3%2BYcrjPWygokSmkMc%2BWqD37MyxxrQRp2LdNBcGneOHz19MZTdPGicJZ8qT1CAh%2FwswjBHemYP6U8J6l%2B3LiaDtLXar9YVJdOw0VMVal%2FBAcSKI7BVskLigVyr1JZTTpLg2hF%2FETJUU2XgLT4jNaaOcxk7CV7ZrrPLcuEOVRXwgN7tAGGJIgcm9uW0aytsC0Tjo4YSzTI4Ho%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221130T040108Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26XPQPWAZA7LZYVP%2F20221130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=baf38f18fc1392954bd961ec2b4c7e3be938f90859ed5d5b2fbfd801753c9c5c')
 
  const navigation = useNavigation()
  useEffect(()=>{(async()=>{
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

const takePhotoFromCamera = () =>{
ImagePicker.launchCameraAsync({
  width:300,
  height:300,
  cropping:true
}).then(image=>{
  console.log(image)
  //upload picture and then 
  setImage(image.path)
})

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
        <Image
        //source={{uri:image}}
        source={{uri:image}}
        resizeMode={'contain'}
        style={[{height:150}, {width:350},{overflow: 'hidden'}]}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={ ()=>
              navigation.navigate("ChangeProfilePictureScreen")}
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
                    onPress={pickImage} 
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
                    onPress={takePhotoFromCamera}
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
    alignContent:'center',
    alignItems:'center',
    overflow:'hidden',
    borderWidth:0,
    //borderColor: '#1764EF',
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
height:300,

},

cameraUploadStyle:{
 padding:5,
 backgroundColor:'#EAEAEA',
 borderRadius:20,
 width:130,
 height:100,
 marginTop:30,
 marginLeft:20,
 alignItems:'center',
 
 

},
photoUploadStyle:{
  padding:5,
  backgroundColor:'#EAEAEA',
  borderRadius:20,
  width:130,
  height:100,
  marginTop:30,
  marginRight:40,
  alignItems:"center",
  

 },
 cameraIcons:{
  marginBottom:30,
  marginTop:10,
},
photoIcons:{
  marginTop:15
},

captureText:{
  marginLeft:54,
  marginTop:10
},
uploadText:{
 marginLeft:60,
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