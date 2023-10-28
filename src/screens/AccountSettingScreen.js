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

const AccountSettingScreen = () => {
  const[userName, setUserName] =useState('User Name')
  const[userEmail, setUserEmail] = useState('john01@gmail.com')
  const navigation = useNavigation();
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
      <Text
      style = {{fontWeight: '600'}}
      >Account</Text>
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
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:50}, {borderRadius:50}, {borderWidth:5}, {borderColor:'#7399DE'}]} />
        </View> 
    </View>
    <View style={{marginTop:40}}>
      <View
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
      }}
      >
      <Text
      style={{marginRight:270, fontWeight: '300', fontSize:11,marginBottom:10}}
      >SETTINGS</Text>
      </View>
      
      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
      }}
      //onPress={()=>}
      >
      {/* <Ionicons name="person-circle-outline" size={24} color="#1764EF" /> */}
      <Text
      style={{marginRight:270, marginBottom:10}}
      >Edit the basics</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
      }}
      >
          <Text
      style={{marginRight:270, marginBottom:10}}
      >Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
      }}
      >
          <Text
      style={{marginRight:270, marginBottom:10}}
      >Edit Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom: 10,
        flex:1
      }}
      >
      <AntDesign name="delete" size={24} color="black" style={{justifyContent:'flex-start'}} />
      <Text
      style={{marginRight:270, marginBottom:10, justifyContent:'flex-end'}}
      >Delete Account</Text>
      </TouchableOpacity>

    </View>
    <View style = {[{flexDirection:"row"}, {marginTop:250}]}>
      <View style={{flex:1, justifyContent:'flex-start', marginLeft:30}}>
       <Text
       style={{fontWeight:'600'}}
       >Logout</Text>
      </View>
      <TouchableOpacity style={{flex:1, justifyContent:'flex-end', marginEnd:-200}}>
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