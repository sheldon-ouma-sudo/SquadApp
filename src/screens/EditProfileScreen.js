import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity, SafeAreaView} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  //import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';

  const{width,height} = Dimensions.get("window")

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2, 
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#ffff',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#ffff',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#ffff',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fff',
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


const EditProfileScreen = () => {
  return (
    <SafeAreaView
    style={styles.container}
        behavior="padding">
      <Text>EditProfile</Text>
    </SafeAreaView>
  )}
  const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB"
  
    },
  })

export default EditProfileScreen