  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  import SwayingScreen from './SwayingScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import MySquadScreen from './MySquadScreen'
  import React from 'react'
  import { useState } from 'react'
  import { useSafeAreaInsets } from 'react-native-safe-area-context';

  const Profile =()=> {
    const[profileImage, setProflieImage]= useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
    const[userName, setUserName] =useState('User Profile Name')
    const Tab = createMaterialTopTabNavigator();
    const insets = useSafeAreaInsets();
    const ProfileName=userName
    return (
      <>
      <View style={[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>
        <TouchableOpacity>
          <Image
            source={{ uri:profileImage }}
            resizeMode={'contain'}
            style={[{ height: 150 }, { width: 150 }, 
            {overflow:'hidden'}]} />
        </TouchableOpacity>
        <View>
         
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

