  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity, TextInput, Alert} from 'react-native'
  import React, { useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  import { Input } from 'react-native-elements'
  import { useNavigation } from '@react-navigation/core';
  import SelectList from 'react-native-dropdown-select-list';
  import { useEffect } from 'react';
  import * as Location from 'expo-location'; 
  import { Ionicons } from '@expo/vector-icons';


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
  const dataGender  = [
    {key:'1', value:"Agender"},
    {key:'2', value:"Androgyne"},
    {key:'3', value:"Androgynous"},
    {key:'4', value:"Bigender"},
    {key:'5', value:"Cis"},
    {key:'6', value:"Cisgender"},
    {key:'7', value:"Cis Female"},
    {key:'8', value:"Cis Male"},
    {key:'9', value:"Cis Man"},
    {key:'10', value:"Cis Woman"},
    {key:'11', value:"Cisgender Female"},
    {key:'12', value: " Cisgender Male"},
    { key:'13', value: "Cisgender Man"},
    {key:'14', value: "Cisgender Woman"},
    {key:'15', value:" Female to Male"},
    {key:'16', value:"FTM"},
    {key:'17', value:"Gender Fluid"},
    {key:'18', value: "Gender Nonconforming"},
    {key:'19', value: "Gender Questioning"},
    {key:'20', value: "Gender Variant"},
    { key:'21', value: "Genderqueer"},
    {key:'22', value: "Intersex"},
    {key:'23', value:"Male to Female"},
    {key:'24', value: "MTF"},
    {key:'25', value: "Neither"},
    {key:'26', value: "Neutrois"},
    {key:'27', value: "Non-binary"},
    {key:'28', value: "Other"},
    {key:'29', value:"Pangender"},
    { key:'30', value:"Trans"},
    {key:'31', value: "Trans*"},
    {key:'32', value:  "Trans Female"},
    {key:'33', value: "Trans* Female"},
    {key:'34', value:"Trans Male"},
    {key:'35', value:"Trans* Male"},
    {key:'36', value:"Trans Man"},
    {key:'37', value:"Trans* Man"},
    {key:'38', value: "Trans Person"},
    {key:'39', value: "Trans* Person"},
    {key:'40', value:"Trans Woman"},
    {key:'41', value: "Trans* Woman"},
    {key:'42', value: "Transfeminine"},
    {key:'43', value: "Transgender"},
    {key:'44', value:"Transgender Female"},
    {key:'45', value:"Transgender Male"},
    { key:'46', value:"Transgender Man"},
    {key:'47', value:"Transgender Person"},
    {key:'48', value: "Transgender Woman"},
    {key:'49', value:"Transmasculine"},
    {key:'50', value: "Transsexual"},
    {key:'51', value: "Transsexual Female"},
    {key:'52', value:"Transsexual Male"},
    {key:'53', value: "Transsexual Man"},
    {key:'54', value:"Transsexual Person"},
    {key:'55', value:"Transsexual Woman"},
    {key:'56', value:"Two-Spirit"}
  ]

const AgeGenderLocationScreen = () => {
  const[currentPosition, setCurrentPositon] = useState(0)



  const navigation = useNavigation()
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
        <View style={[{ flexDirection:"row" },{marginTop:20}, {marginLeft:25}]}>
        <TouchableOpacity style={[{flex:1}]}>
           <TextInput 
           style={[{justifyContent: 'flex-end'},styles.backText]}
           />
        </TouchableOpacity>
        <TouchableOpacity style={[{flex:1},]}>
          <TouchableOpacity onPress={()=>navigation.navigate("CalendarScreen")} 
          style={[{justifyContent:'flex-end'},styles.calendarIcon]}> 
            <Ionicons
             name='calendar'
             size={30}
             color='#000'
            style={[{alignSelf:'center'},,{marginRight:15},{marginLeft:5}]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        </View>
     
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
    width:width-30,
    padding:20,
    margin:15,
    borderRadius:20,
    marginTop:-10
  },
  calendarIcon:{
    marginRight:50,
    flexDirection: 'row',
    width:60,
    height:50,
    borderWidth: 1,
    borderColor: '#000',
    marginTop:20,
    marginLeft:70,
    marginBottom:10,
    overflow:'hidden',
    borderRadius:10,
    backgroundColor: '#EAEAEA',
    //borderColor: "red",
    paddingBottom: -3,
    paddingLeft:10
  }
})
export default AgeGenderLocationScreen