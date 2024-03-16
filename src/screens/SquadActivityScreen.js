import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { useState } from 'react'
//import {useUserContext} from '../../UserContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RequestToBeAddedToSquadScreen from './RequestToBeAddedScreen'
import RequestToJoinSquads from './RequestToJoinSquadScreen'



const SquadActivityScreen = () => {
const Tab = createMaterialTopTabNavigator()
    return (
      <Tab.Navigator 
      style={[{ marginTop:20 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, {borderRadius:9}]}   
      screenOptions={{
      tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
      tabBarStyle: { backgroundColor: "#F4F8FB" },
    }}
      >
          <Tab.Screen name="Squad Addition Requests" 
          component={RequestToBeAddedToSquadScreen} />
          <Tab.Screen name="Requests To Join Your Squads" 
          component={RequestToJoinSquads} />
        </Tab.Navigator>
  )
  }



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
export default SquadActivityScreen