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
  //import awsconfig from './src/aws-exports'
  import { Storage } from 'aws-amplify'; 
  //import * as Crypto from 'expo-crypto';
 
 
  


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
  const[currentPosition, setCurrentPositon] = useState(2)
  const[hasGalleryPermissions, setGallerPermissions] = useState(null)
  const[image, setImage]= useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
  const[userImage, setUserImage] =useState('https://squadmaindb55805-staging.s3.us-west-2.amazonaws.com/SquadInAppImages/logos/userProfilePlaceholder.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMSJIMEYCIQCAlMMtLCTHKdfQhT%2FwPQpRyQUzonKKtUaxFaSmcD%2BB%2BgIhAKcJUW120TLC7tb3T6ikcIC%2BRpiV9cnmcc4UNzVHFaSIKu0CCMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNzUzMTk1MzE4NjU3IgyxoVbUq1BmOwDrVg8qwQKIgAXZeGYOL8tNp9np0dCcA%2FrEROmqu4gttbtgpEB5s1ZMNs7w16NNguaeALWV66pmCpGHaYBTzi8rRSK1DyguhF%2FGjRWfUfi08HBq5Ch4f71y%2FtKHcaGJX7zIEJC2hG9DWexPSF3MHS7lHb5PczASaX%2FzPNhmWfo7PVCFPqgfVilmGMcPQKd4TRLDu66g%2BGSePaChAUJMVwWrcIzSxdtXBQ90WMry8%2BlyU3NIIu3HqU7xKU%2FB2uySFEme3LRb6ARk78Uilx0PSh%2BMV%2BdNqytGOzzHMOX14JNaIqEBul6hLANlYEG5uWZOaP8wrWhlh8%2FeHAuMHRsMJzbRXLfe7nsfHpTZbqp%2FuOo21%2B8GOdm6n%2BbMTc5%2ByEhFbwwI7t4X2LwN1loiMzY%2FjRiqSrSRhYPWgvTlFtk8Nm%2FGW0yXiBsOCXQwg5aDrAY6sgKJKv4ykpltW%2FJAMJVZG9Sq18wmqADBuWbuyNPzr47gi8GXAdKoXmDPr%2FmP9DHq3J8ydMn9mPPcSyLKSnn7JqdG7%2BBXp5cS%2FrJPqpZOyv1uyS%2B6gnsyOQ7zWhSfUs3RLI0xxKrEdNUR%2F4XzUG%2FScT22eRn9DnMWt3kDeKYkzMpeNOyMqMlQA%2FC%2BHRKtWy%2BToGTubT1RbGPWPlByKoFRNxCUdjWz0wvqaBhGoUYd3CQ%2F5haoe0yLTKi%2BwPDEYxBG9%2Fy1ukgQA3Ld%2B%2BXc9c2TEYUGgjgXndmHxFL3n9yRQppFthpPZcMRroo9bje4kG6fTL%2FwOMnOmIz7k2lQQvBk2wqCfFNMlO9QiB1sIwRoMWOC2ChQlju5yxXKDinldBFc48%2FEFQCVXiFeIUReokiCfVRijEo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231218T232702Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26XPQPWATK7JSXEC%2F20231218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=76b2e2e063ea528d95c8195b12c7248aab466306fecf5a18805f30e4de9ac2e0')
  const [progressText, setProgressText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const navigation = useNavigation()
  useEffect(()=>{(async()=>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGallerPermissions(galleryStatus === 'granted');
    })()
  },[])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets[0]) {
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
//after getting the photo, we turn it into a blobl
const fetchResourceFromURI = async uri => {
  const response = await fetch(uri);
  //console.log("response from the blob creation",response);
  const blob = await response.blob();
  return blob;
};
// //upload the picture to the specific bucket
// const uploadUserImage = async () => {
//   //alert("uploading the photo attempt")
//     if (isLoading) return;
//     setisLoading(true);
//     try {
      
//     } catch (error) {
//       console.log("error uploading the the image", error)
//     }

//   }

const uploadUserImage = async () => {
  if (isLoading) return;
  setIsLoading(true);

  try {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;
    const filename = `${userId}.jpg`;
    const blob = await fetchResourceFromURI(image);

    // Upload image to S3
    const response = await Storage.put(filename, blob, {
      level: 'public',
      contentType: 'image/jpeg',
      metadata: { userId: userId },
    });

    console.log("✅ Image uploaded to S3:", response);

    // Fetch the image URL from S3
    const userImgUrl = await Storage.get(response.key, { expires: 86400 * 7});
    console.log("✅ Image URL retrieved from S3:");

    // Update the user attribute
    await Auth.updateUserAttributes(user, {
      'picture': userImgUrl,
    });

    console.log("✅ Successfully uploaded and updated user profile picture");

    // Navigate to the Personal Interest screen
    navigation.navigate('PersonalInterestScreen', { userImgUrl: userImgUrl || userImage});

  } catch (error) {
    console.log("❌ Failed to upload the picture or update user attributes:", error);
  } finally {
    setIsLoading(false);
  }
};


  

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
      />
    {/* <Image
    source={{ uri: image ? image : '/Users/sheldonotieno/Squad/assets/squad-logo.png' }}
    resizeMode='contain'
    style={[{ height: 150 }, { width: 350 }, { overflow: 'hidden' }, { marginTop: -13 }, { alignSelf: 'center' }]}
/> */}

     
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
        {/* <Image
        //source={{uri:image}}
        source={{uri:image}}
        resizeMode={'contain'}
        style={[{height:150}, {width:350},{overflow: 'hidden'},{marginTop:-13},{alignSelf:'center'}]}
        /> */}
  <Image
    source={{ uri: image ? image : '/Users/sheldonotieno/Squad/assets/squad-logo.png' }}
    resizeMode='contain'
    style={[{ height: 150 }, { width: 350 }, { overflow: 'hidden' }, { marginTop: -13 }, { alignSelf: 'center' }]}
/> 
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={uploadUserImage}
              //,{username:username}
             // navigation.navigate("ChangeProfilePictureScreen",{userImage:image})}
            style = {styles.profilePictureButton}
                > 
                <Text style={styles.buttonText}>
                  Upload Profile Picture
                </Text>

            </TouchableOpacity>
    </View>

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
    borderWidth:5,
    borderColor: '#8BA1EE',
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