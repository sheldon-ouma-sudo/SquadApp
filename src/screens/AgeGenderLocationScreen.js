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
  const[dateOfBirth, setDateOfBirth] = useState("MM-DD-YY")
  const [selectedGender, setGenderSelected] =useState("");
  const[location, setLocation]=useState("Enter your location")



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

        {/* handling the date of birth functionality  */}
        <View style={[{marginLeft:-10},{marginTop:2},{marginRight:210}]}>
           <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Date of Birth</Text>
          </View>
        <View style={[{ flexDirection:"row" },{marginTop:10}, {marginLeft:30}]}>
        <TouchableOpacity style={[{flex:1},{borderColor:'#1145FD'},]}>
          <TouchableOpacity style={[{justifyContent: 'flex-start'},styles.ageInputContainer]}>  
            <TextInput 
              style={[{justifyContent: 'flex-end'},{textAlign:'center'},{fontWeight:'600'}]}
              textAlign='left'
              value={dateOfBirth}
              
                  />
            </TouchableOpacity>
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


         {/* handling the gender funcionality */}
        <View style={[{marginLeft:-10},{marginTop:10},{marginRight:250}]}>
           <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Gender</Text>
        </View>
        <TouchableOpacity >
          <SelectList
          onSelect={() => (selectedGender)}
           placeholder="Select your gender"
           label="Gender"
           data={dataGender}  
           setSelected={setGenderSelected} 
           search={true} 
           textAlign= 'left' 
           boxStyles={[{marginLeft:8},{marginTop:10} ,{width:320},
            {marginBottom:15},{backgroundColor: '#EAEAEA'},{color:'#535353'}, 
            ,{borderColor: '#000'},{height:52}]} 
          />
        </TouchableOpacity>

          {/* handling the location funcionality */}
          <View style={[{marginLeft:10},{marginTop:5},{marginRight:250}]}>
            <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Location</Text>
           </View>
           <View style={[{ flexDirection:"row" },{marginTop:10}, {marginLeft:30}]}>
            <TouchableOpacity style={[{flex:1},{borderColor:'#1145FD'},]}>
              <TouchableOpacity style={[{justifyContent: 'flex-start'},styles.ageInputContainer]}>  
                <TextInput 
                  style={[{justifyContent: 'flex-end'},{textAlign:'center'},{fontWeight:'600'}]}
                  textAlign='left'
                  value={location}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            <TouchableOpacity style={[{flex:1},]}>
              <TouchableOpacity onPress={()=>navigation.navigate("MapMarkerScreen")} 
              style={[{justifyContent:'flex-end'},styles.calendarIcon]}> 
                <Ionicons
                name='location'
                size={30}
                color='#000'
                style={[{alignSelf:'center'},,{marginRight:15},{marginLeft:5}]}
                />
              </TouchableOpacity>
            </TouchableOpacity>
        </View>
   
        <View style={[{ flexDirection:"row" },{marginTop:20}, {marginLeft:25}]}>
              <TouchableOpacity  onPress={() =>navigation.replace('SignupScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
                  <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
                </TouchableOpacity>
                  <TouchableOpacity  style={[{flex:1}, styles.button]}>
                  <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
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
  width:'50%',
  justifyContent:"center",
  alignItems:'center',
  marginRight:200,
  marginTop: 10,
  marginLeft:35
},
  headerText:{
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
    marginLeft:90,
    marginBottom:10,
    overflow:'hidden',
    borderRadius:10,
    backgroundColor: '#EAEAEA',
    paddingBottom: -3,
    paddingLeft:10
  },
 ageInputContainer:{
    marginRight:160,
      flexDirection: 'row',
      width:260,
      height:50,
      borderWidth: 1,
      borderColor: '#000',
      marginLeft:25,
      marginBottom:10,
      overflow:'hidden',
      borderRadius:10,
      backgroundColor: '#EAEAEA',
     marginRight:50,
      paddingBottom: -3,
      paddingLeft:10
   },
   genderInputContaner:{
        width:320,
        height:50,
        borderWidth: 1,
        borderColor: '#000',
        marginTop:10,
        marginBottom:10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor: '#EAEAEA',
        paddingBottom: -3,
        paddingLeft:10
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
    marginLeft:15,

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

})
export default AgeGenderLocationScreen