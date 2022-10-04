import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';

const PasswordResetScreen = () => {
    const navigation = useNavigation()
    return (
      <View
      style={styles.container}
            behavior="padding"
            >
            <View style={styles.squadLogoContainer}>
            <Image
                source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
                style={styles.squadLogo}
                resizeMode='contain'
            ></Image>
            </View>
          <View style={styles.resetTextContainer}>
            <Text style={styles.resetText}>
              Your Password  reset link has been sent. Please check your email or text messages.    
            </Text> 
          </View>
          <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style = {styles.button}
            onPress={() =>
              navigation.navigate('LoginScreen')}
                >
                <Text style={styles.buttonText}>
                  Retun to Sign in
                </Text>
              </TouchableOpacity>
          </View>
          </View>
  
          
  
  
          <View style={{marginTop:80, marginBottom:-100}}>
              <View style={{backgroundColor: 'black', height: 1, width:350}} />
                  <Text style={[{marginTop:10}, {alignSelf:'center'}]}> 
                              English(United States)
                  </Text>
              </View>
              
    </View>
  )
  }
  
  
  const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#F4F8FB"
    },
    squadLogo:{
        width:221,
        height:85,
        marginBottom:30
  
  
    },
  
    input:{
      backgroundColor: '#EAEAEA',
      paddingHorizontal: 15,
      paddingVertical:10,
      borderRadius:5,
      width:296,
      height:42,
      marginTop:10,
      fontSize: 13,
      marginRight:15,
      marginLeft:10,
      //fontStyle:"Montserrat",
      color:'#535353',
      fontWeight:'400'   
  },
  button:{
    backgroundColor: '#1145FD',
    width: 296,
    height: 42,
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 15,
    marginLeft:10,
    marginBottom:300
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 13.5
    
  },
  textWrapper:{
    textAlign:'left',
    marginTop:5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  
  },
  textContanier:{
    justifyContent:"center",
    marginLeft:80,
    marginRight:20,
    marginTop:-280,
    marginBottom:300
    
    
  },
  navigationText:{
    fontWeight:'500',
    marginRight:50
    
  },
  resetText:{
    fontSize:17
  },
  resetTextContainer:{
    marginBottom:20,
    alignItems:'center',
    marginEnd:40,
    marginLeft:35
    

  }
  
  })
export default PasswordResetScreen