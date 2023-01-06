  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  import SwayingScreen from './SwayingScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import MySquadScreen from './MySquadScreen'
  import React from 'react'
  import { useState, useEffect } from 'react'
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { Auth, API } from 'aws-amplify'; 
  import { graphqlOperation } from 'aws-amplify' 
  import {getUser} from '../graphql/queries'
  

  const Profile =()=> {
    const[profileImage, setProflieImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png')
    const[userName, setUserName] =useState('User Profile Name')
    //const[userProfilePicture, setUserProfilePicture] = useState("")
    const[numOfUserPolls, setNumOfUserPolls] = useState("")
    const[numOfUserSways, setNumOfUserSways] = useState("")
    const Tab = createMaterialTopTabNavigator();
    const insets = useSafeAreaInsets();  
    //query the user from the backend
    //set the values to what is in the backend 
     useEffect(()=>{
      const queryUser = async() =>{
        // get Auth user
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
          console.log(authUser)
        // query the database using Auth user id (sub)
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: authUser.attributes.sub })
        );
        if (userData.data.getUser) {
          console.log("This is the user data is:",userData)
          console.log("This is the user username on the profile top navigation is:",userData.data.getUser.username)
          console.log("This is the user's name the profile top navigation is:",userData.data.getUser.name)
          console.log("This is the user's  squad the profile top navigation is:",userData.data.getUser.squad)
          console.log("This is the user's number of polls the profile top navigation is:",userData.data.getUser.numOfPolls)
          console.log("This is the user's interest the profile top navigation is: ",userData.data.getUser.interests)
          console.log("This is the user's image the profile top navigation is:",userData.data.getUser.imageUrl)
        
        }
    }
    queryUser()
     })
   

    return (
      <>
      <View style={[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>
        <TouchableOpacity>
          <Image
            source={{ uri:profileImage }}
            resizeMode={'contain'}
            style={[{ height: 120 }, { width: 120 }, 
            {overflow:'hidden'},{marginBottom:20}, {marginLeft:30}]} />
        </TouchableOpacity>
        <View
         style={[{marginLeft:40},{marginTop:70}]}>
           <Text
           style={[{fontSize:16},{marginTop:5},{marginLeft:-15},{marginBottom:-5}]}
           >Polls</Text>
           <Text
           style={[{fontSize:16},{marginTop:-15},{marginLeft:50}]}
           >Squad</Text>
         <Text
           style={[{fontSize:16},{marginTop:-20},{marginLeft:125}]}
           >Sways</Text>
        </View>
      </View>
      <Tab.Navigator
        style={[{ marginTop: -10 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
        screenOptions={{
          tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#F4F8FB" },
        }}
      >
          <Tab.Screen
            name="Polls"
            component={PersonalPollScreen} />
          <Tab.Screen
            name="My Squad"
            component={MySquadScreen} />
          <Tab.Screen
            name="Sways"
            component={SwayingScreen} />
        </Tab.Navigator></>
    )
  }

  export default  Profile



  const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB",
    },

    squadLogo:{
        width:100,
        height:35,
        marginRight:250,
        marginTop:70  
    }
  })

