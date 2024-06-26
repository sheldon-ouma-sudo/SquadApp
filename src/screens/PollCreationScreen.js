import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
// import { Camera, CameraType } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { Octicons } from '@expo/vector-icons';  
// import { AntDesign } from '@expo/vector-icons'; 
 import { useNavigation } from '@react-navigation/native';
// import Button from '../components/Button';
// import * as ImagePicker from 'expo-image-picker'
import WordPollCreationScreen from './WordPollCreationScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateSquadScreen from './CreateSquadScreen'

const Tab = createMaterialTopTabNavigator()

const PollCreation = () => {

  return(
    <Tab.Navigator
    style={[{ marginTop: -4 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, {borderRadius:9}]}   
    screenOptions={{
      tabBarLabelStyle: { color: '#1145FD', fontWeight:'600' },
      //tabBarItemStyle: { width: 100 },
      tabBarStyle: { backgroundColor: "#F4F8FB" },
    }}
  >
      <Tab.Screen 
      name="Create Poll" 
      component={WordPollCreationScreen} />
      <Tab.Screen 
      name="Create Squads" 
      component={CreateSquadScreen} />
    </Tab.Navigator>
  
    
  )
}
    //   const [hasCameraPermission, setHasCameraPermission] = useState(null);
    //   const[hasGalleryPermissions, setGallerPermissions] = useState(null)
    //   const [image, setImage] = useState(null);
    //   const [type, setType] = useState(Camera.Constants.Type.back);
    //   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    //   const cameraRef = useRef(null);

    //   useEffect(() => {
    //     (async () => {
    //       MediaLibrary.requestPermissionsAsync();
    //       const cameraStatus = await Camera.requestCameraPermissionsAsync();
    //       setHasCameraPermission(cameraStatus.status === 'granted');
    //       //setting up the gallery permission useEffetct
    //       const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //       setGallerPermissions(galleryStatus === 'granted');  
    //     })();
    //   }, []);
    // const navigation= useNavigation()

    // const takePicture = async () => {
    //     if (cameraRef) {
    //       try {
    //         const data = await cameraRef.current.takePictureAsync();
    //         console.log(data);
    //         setImage(data.uri);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
      
    //   };

    //   const savePicture = async () => {
    //     if (image) {
    //       try {
    //         const asset = await MediaLibrary.createAssetAsync(image);
    //         alert('Picture saved! 🎉');
    //         setImage(null);
    //         console.log('saved successfully');
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //     console.log(image)
    //     navigation.navigate('PollContentScreen',{image:image})
    //   };

    //   const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       meadiaTypes:ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true, 
    //       aspect:[4,3],
    //       quality:1,
    //     });
    //     console.log(result)
    //     if(!result.cancelled){
    //       setImage(result.uri)
    //     }
    //     if(hasGalleryPermissions===false){
    //       return<Text>No access to photo gallery</Text>
    //     }
    //     savePicture();
    //     navigation.navigate('PollContentScreen',{image:image})
    //     //navigation.navigate('EmailOTPScreen',{username:username});
    //   }
   

    //   if (hasCameraPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   }

      
        // <View style={styles.container}>
        //   {!image ? (
        //     <Camera
        //       style={styles.camera}
        //       type={type}
        //       ref={cameraRef}
        //       flashMode={flash}
        //     >
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //           paddingHorizontal: 30,
        //           marginTop:10
        //         }}
        //       >
        //       <TouchableOpacity
        //           style={[{marginTop:-10},{ marginLeft: 10 }, { alignItems: 'center' }, { height: 70 }, { backgroundColor: '#1145FD' }, { borderRadius: 50 }, { width: 70 }]}
        //           onPress={() => {
        //             setType(
        //               type === CameraType.back ? CameraType.front : CameraType.back
        //             );
        //           } }>
        //           <AntDesign name="retweet" size={34} color="white" style={[{ marginTop: 15 }]} />
        //         </TouchableOpacity>
        //         <Button
        //         style={[{marginRight:100},{}]}
        //           onPress={() =>
        //             setFlash(
        //               flash === Camera.Constants.FlashMode.off
        //                 ? Camera.Constants.FlashMode.on
        //                 : Camera.Constants.FlashMode.off
        //             )
        //           }
        //           icon="flash"
        //           color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
        //         />
        //       </View>
        //     </Camera>
        //   ) : (
        //     <Image source={{ uri: image }} style={styles.camera} />
        //   )}

        //   <View style={styles.controls}>
        //     {image ? (
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //           paddingHorizontal: 50,
        //         }}
        //       >
        //         <Button
        //           title="Re-take"
        //           onPress={() => setImage(null)}
        //           icon="retweet"
        //         />
        //         <Button title="Save" onPress={savePicture} icon="check" />
        //       </View>
        //     ) : (
        //       <><TouchableOpacity style={[styles.photosMedia,
        //          { height: 70 }, {backgroundColor: '#1145FD' }, 
        //          {borderRadius: 50},
        //           {width:70}]}
        //           onPress={pickImage}
        //         >
        //           <MaterialIcons name="perm-media" size={34} color="white" style={[{ marginTop: 15 }]} />
        //         </TouchableOpacity><>

        //             <TouchableOpacity style={[styles.cameraIconButtonContainer, { height: 70 }, { backgroundColor: '#1145FD' }, { borderRadius: 50 }]}
        //               onPress={takePicture}>
        //               <Octicons name="screen-full" size={34} color="white" style={[{ marginTop: 15 }]} />
        //             </TouchableOpacity>
                  
        //             <TouchableOpacity style={[styles.pollAddButton, { height: 70 }, { backgroundColor: '#1145FD' }, { borderRadius: 50 }]}
        //              onPress={() =>
        //               navigation.navigate("WordPollCreationScreen")}>
        //               <Octicons name="plus" size={34} color="white" style={[{ marginTop: 15 }]} />
        //             </TouchableOpacity>
        //             </></> 
        //     ) 
        //     }
        //   </View>
        // </View>
      
    


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
      },
      controls: {
        flex: 0.5,
        marginBottom:150
      },
      button: {
        height: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E9730F',
        marginLeft: 10,
      },
      camera: {
        flex: 5,
        borderRadius: 20,
      },
      cameraIconButtonContainer:{
        marginTop:-80,
        //marginRight:180,
        alignItems:'center',
        marginBottom:120,
        //height:40,
        width:70,
        marginLeft:170,
        //marginBottom:50
      },
      photosMedia:{
        marginTop:80,
        //marginRight:180,
        alignItems:'center',
        //marginBottom:120,
        //height:40,
        //width:70,
        marginLeft:10
      },
      pollAddButton:{
        marginTop:-180,
        //marginRight:180,
        alignItems:'center',
        marginBottom:120,
        //height:40,
        width:70,
        marginLeft:300,
        //marginBottom:50
      },
      topControls: {
        flex: 1,
      },
    });

export default PollCreation