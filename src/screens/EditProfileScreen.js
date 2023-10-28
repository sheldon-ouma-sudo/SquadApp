import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity, SafeAreaView} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import { MaterialIcons } from '@expo/vector-icons';
  import { Ionicons } from '@expo/vector-icons'; 
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  //import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';

  const{width,height} = Dimensions.get("window")


const EditProfileScreen = () => {
  const[username, setUserName] = useState("User Name")
  const navigation = useNavigation()

  return (
    <SafeAreaView
    style={styles.container}
        behavior="padding">
          <View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
            style={styles.squadLogo}
            resizeMode='contain'
          ></Image>
          </View>

      <TouchableOpacity style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row", marginTop:30}]}
      onPress={()=>navigation.goBack()}
      >
      <AntDesign name="arrowleft" size={24} color="#1764EF" style={{flex:1, marginLeft:30, justifyContent:'flex-start'}}/>
      <Text
      style = {{fontWeight: '600', fontSize:15, flex:1, marginRight:150, justifyContent:'flex-end'}}
      >Edit the basics</Text>
   

    </TouchableOpacity>
    <View style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>
      <View style={{flex:1, justifyContent:'center', marginLeft:130, marginTop:-20}}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode={'contain'}
            style={[{ height: 80 }, { width: 80 }, 
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:50}, {borderRadius:50}, {borderWidth:5}, {borderColor:'#7399DE'}]} />
        </View> 
    </View>
    
    </SafeAreaView>
  )}












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
      marginTop:20
  },
  })

export default EditProfileScreen