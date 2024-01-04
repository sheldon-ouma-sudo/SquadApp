  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity, SafeAreaView} from 'react-native'
  import React, { useContext, useEffect, useState } from 'react'
  import { MaterialIcons } from '@expo/vector-icons';
  import { Ionicons } from '@expo/vector-icons'; 
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  //import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import {Auth} from 'aws-amplify'

  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useUserContext } from '../../UserContext';


  

  const{width,height} = Dimensions.get("window")

const AccountSettingScreen = () => {
  const[userName, setUserName] =useState('User Name')
  const[userEmail, setUserEmail] = useState('john01@gmail.com')
  const navigation = useNavigation();
  const{user} = useUserContext();
  

  useEffect(()=>{
   console.log("here is the user: ",user)
   //setUserName(user.userName)
   const updateUser = async () => {
    console.log("here is the userName",user)
    setUserName(user.userName);
    setUserEmail(user.email)
   }
   updateUser()
  },[])

  async function handleLogout() {
    try {
     await Auth.signOut();
      console.log('✅ Success');
     //updateAuthState('loggedIn');
     await AsyncStorage.clear();
     navigation.navigate('LoginScreen')
    //navigation.navigate('TestWorkScreen')
    } catch (error) {
      console.log('❌ Error signing in...', error); 
    }
  }

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
      style = {{fontWeight: '600', fontSize:20, flex:1, marginRight:150, justifyContent:'flex-end'}}
      >Account</Text>
   

    </TouchableOpacity>

    <View style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>
        <View
        style={{flex:1, justifyContent:'flex-start', marginTop:60, marginEnd:30,marginLeft:25}}
        >
          <Text
          style={{fontSize:24, fontWeight:'600'}}
          >{userName}</Text>
          <Text
          style={{fontWeight:'200'}}
          >
            {userEmail}
          </Text>
    </View>
    <View style={{flex:1, justifyContent:'flex-end'}}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode={'contain'}
            style={[{ height: 80 }, { width: 80 }, 
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:50}, {borderRadius:50}, {borderWidth:4}, {borderColor:'#7399DE'}]} />
        </View> 
    </View>

      <View
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
      }}
      >
      <Text
      style={{marginRight:320, fontWeight: '300', fontSize:11,marginBottom:10}}
      >SETTINGS</Text>
      </View>
      
      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        flexDirection:'row'
      }}
      onPress={()=>navigation.navigate("EditProfileScreen")}
      >
      {/* <Ionicons name="person-circle-outline" size={24} color="#1764EF" /> */}
      <Ionicons name="person-circle-outline" size={24} color="#1764EF" style={{justifyContent:'flex-start', flex:1, marginBottom:10, marginLeft:5, marginRight:10}} />
      <Text
      style={{marginStart:-320, justifyContent:'flex-end', flex:1, marginTop:5}}
      >Edit the basics</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom: 10,
        flexDirection:'row'
      }}
      onPress={()=>navigation.navigate("ChangePasswordScreen")}
      >
      <MaterialIcons name="lock" size={24} color="#1764EF" style={{justifyContent:'flex-start', flex:1, marginBottom:10, marginLeft:5, marginRight:10}} />
      <Text
      style={{marginStart:-320, justifyContent:'flex-end', flex:1, marginTop:5}}
      >Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom: 10,
        flexDirection:'row'
      }}
      >
      <Ionicons name="md-checkmark-circle" size={24} color="#1764EF" style={{justifyContent:'flex-start', flex:1, marginBottom:10, marginLeft:5, marginRight: 10}} />
      <Text
      style={{marginStart:-320, justifyContent:'flex-end', flex:1, marginTop:5}}
      >Edit Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom: 10,
        flexDirection:'row'
      }}
      >
      <AntDesign name="delete" size={24} color="#1764EF" style={{justifyContent:'flex-start', flex:1, marginBottom:10, marginLeft:5, marginRight:10}} />
      <Text
      style={{marginStart:-320, justifyContent:'flex-end', flex:1, marginTop:5}}
      >Delete Account</Text>
      </TouchableOpacity>

    <View style = {[{flexDirection:"row"}, {marginTop:150}]}>
      <View style={{flex:1, justifyContent:'flex-start', marginLeft:30}}>
       <Text
       style={{fontWeight:'600'}}
       >Logout</Text>
      </View>
      <TouchableOpacity style={{flex:1, justifyContent:'flex-end', marginEnd:-200}}
      onPress={handleLogout}
      >
      <MaterialIcons name="logout" size={24} color="#1764EF" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
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
    marginTop:20
  }
})
export default AccountSettingScreen