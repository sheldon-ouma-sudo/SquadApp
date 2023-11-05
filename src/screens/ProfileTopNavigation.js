  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  import SwayingScreen from './SwayingScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import { useNavigation } from '@react-navigation/native'
  import MySquadScreen from './MySquadScreen'
  import { AntDesign } from '@expo/vector-icons';
  import React from 'react'
  import { useState, useEffect } from 'react'
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { Auth, API } from 'aws-amplify'; 
  import { graphqlOperation } from 'aws-amplify' 
  import {getUser} from '../graphql/queries'

  

  const Profile =()=> {
    const[profileImage, setProflieImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png')
    const[userName, setUserName] =useState('User Name')
    const[numOfUserPolls, setNumOfUserPolls] = useState("1060")
    const[numOfUserSquadron, setNumOfSquadron] = useState("1060")
    const[numOfUsersInSquad, setNumOfSquadUsers] = useState("1060")
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();  
    //query the user from the backend
    //set the values to what is in the backend 
    //  useEffect(()=>{
    //   const queryUser = async() =>{
    //     // get Auth user
    //     const authUser = await Auth.currentAuthenticatedUser({
    //       bypassCache: true,
    //     });
    //       console.log(authUser)
    //     // query the database using Auth user id (sub)
    //     const userData = await API.graphql(
    //       graphqlOperation(getUser, { id: authUser.attributes.sub })
    //     );
    //     if (userData.data.getUser) {
    //       setUserName(userData.data.getUser.name)
    //       setNumOfUserPolls(userData.data.getUser.numOfPolls)
    //       console.log("This is the user data is:",userData)
    //       console.log("This is the user username on the profile top navigation is:",userData.data.getUser.username)
    //       console.log("This is the user's name the profile top navigation is:",userData.data.getUser.name)
    //       console.log("This is the user's  squad the profile top navigation is:",userData.data.getUser.squad)
    //       console.log("This is the user's number of polls the profile top navigation is:",userData.data.getUser.numOfPolls)
    //       console.log("This is the user's number of sways the profile top navigation is:",userData.data.getUser.numOfUserSways)
    //       console.log("This is the user's interest the profile top navigation is: ",userData.data.getUser.interests)
    //       console.log("This is the user's image the profile top navigation is:",userData.data.getUser.imageUrl)
        
    //     }
    // }
    // queryUser()
    //  })
   

    return (
      <>
      <View style={[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>

        <View style={{flex:1, justifyContent:'flex-start'}}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode={'contain'}
            style={[{ height: 80 }, { width: 80 }, 
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:50}, {borderRadius:50}, {borderWidth:5}, {borderColor:'#7399DE'}]} />
        </View> 
        <View
        style={{flex:1, justifyContent:'flex-end', marginBottom:25, marginEnd:30,marginLeft:-55}}
        >
        <TouchableOpacity
        style={{marginStart:150,marginBottom:15}}
        onPress={() =>navigation.navigate('AccountSettingScreen')}
        >
        <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>

        <View
        style={{marginLeft:-10,marginBottom:12.5}}
        >
          <Text
          style={{fontWeight:'bold'}}
          >{userName}</Text>
        </View>
       {/**this view here is for the numbers */}
         <View>
           <Text
           style={{marginBottom:-15,marginLeft:-15,fontWeight:'bold'}}
           >{numOfUserPolls}</Text> 
           <Text
           style={{marginLeft:50,fontWeight:'bold'}}
           >{numOfUsersInSquad}</Text>  
          <Text
          style={{marginLeft:120,marginTop:-15,fontWeight:'bold'}}
          >{numOfUserSquadron}</Text>
         </View>
          {/**this view here is for the labelling */}
         <View
         style={{marginLeft:-20}}
         >
           <Text
           style={{marginBottom:-15,marginLeft:7,color:'#707070',fontWeight:'400'}}
           >Polls</Text> 
           <Text
           style={{marginLeft:60,marginBottom:-15,color:'#707070',fontWeight:'400'}}
           >Squad</Text>  
          <Text
          style={{marginLeft:125,color:'#707070',fontWeight:'400'}}
          >Squadron</Text>
         </View>
        </View>
        {/* 
        <View 
         style = {[{marginTop: 30}, {marginLeft:10}]}
        >
         <Text
           style={[{fontSize:'15'}, {fontWeight:'700'}]}
          >
           {userName}
         </Text>
        </View>
       
        <View
         style={[{marginLeft:0},{marginTop:70, marginBottom:50}, {marginEnd:10}]}>
          <Text
          style={[{marginBottom:5}, {fontSize:18}, {fontWeight:'600'}, {marginLeft:-5}]}
          >{numOfUserPolls}</Text>
           <Text
           style={[{fontSize:16},{marginTop:5},{marginLeft:-85},{marginBottom:-5}]}
           >Polls </Text> 
           <Text
           style={[{marginLeft:-70}, {marginTop:-46}, {marginBottom:26}, {fontWeight:'600'}, {fontSize:18}]}
           >
            0
           </Text>
           <Text
           style={[{fontSize:16},{marginTop:-15},{marginLeft:-15}]}
           >Squad</Text>
            <Text
           style={[{marginLeft:10},{marginTop:-48}, {marginBottom:29}, {fontWeight:'600'}, {fontSize:18}]}
           >
            0
           </Text>
           <Text
           style={[{marginLeft:80},{marginTop:-48}, {marginBottom:29}, {fontWeight:'600'}, {fontSize:18}]}
           >
            0
           </Text>
         <Text
           style={[{fontSize:16},{marginTop:-23.5},{marginLeft:65}]}
           >Squadron
           </Text>
        </View> */}
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
            name="Squadron"
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

