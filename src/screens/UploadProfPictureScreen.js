 import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  //import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';
  //import { async } from '@firebase/util';
  import * as ImagePicker from 'expo-image-picker'
  import { Auth } from 'aws-amplify';
  import { Storage } from 'aws-amplify';   

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
  const[image, setImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png')
  //const[userImage, setUserImage] =useState('')
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
 
  const navigation = useNavigation()
  useEffect(()=>{(async()=>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGallerPermissions(galleryStatus === 'granted');
    })()
  },[])


  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };
  //squad-file-storage235821-staging/private/userProfilePictures/
  //squad-file-storage235821-staging/protected/userProfilePictures/
  const uploadUserImage = async () => {
    if (isLoading) return;
    setisLoading(true);
   const user = await Auth.currentAuthenticatedUser()
   const userId = user.attributes.sub;
   const ref = `squad-file-storage235821-staging/protected/userProfilePictures/${userId}`
   const blob = fetchResourceFromURI(image);
   const response = await Storage.put(ref, blob, {
    contentType: "image/jpeg",
    metadata: {userId: userId},
    level: "protected",
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );
      },
    })
      .then(res => {
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then(result => console.log(result))
          .catch(err => {
            setProgressText('Upload Error');
            console.log(err);
          });
      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log(err);
      });
      console.log("this is the response",response)
       //update the user attributes with added picture
       try {
        await Auth.updateUserAttributes(user, {
          'picture': response
        });
         console.log('✅ Success');
        //navigation.navigate('RootNavigation', { screen: 'HomeScreen' })
        } catch (error) {
        console.log('❌ Error uploading the picture...', error); 
        }  
    };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

const takePhotoFromCamera = async () =>{
const result = await ImagePicker.launchCameraAsync();
// Explore the result
console.log(result);
if (!result.canceled) {
  setImage(result.assets[0].uri);
  console.log(result.assets[0].uri);
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
        <Image
        //source={{uri:image}}
        source={{uri:image}}
        resizeMode={'contain'}
        style={[{height:150}, {width:350},{overflow: 'hidden'},{marginTop:-13},{alignSelf:'center'}]}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={ ()=>
              //,{username:username}
              navigation.navigate("ChangeProfilePictureScreen",{userImage:image})}
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
    height: 130, 
    width:130,
    borderRadius:80,
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