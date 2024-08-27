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
      <View>
        <Text>Squad notification goes here</Text>
      </View>
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