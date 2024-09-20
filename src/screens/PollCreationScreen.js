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