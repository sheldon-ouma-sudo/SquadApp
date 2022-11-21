import { View, Text, KeyboardAvoidingView,StyleSheet,Image,TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import React from 'react'

const CompletePasswordResetSCreen = () => {
    const[wrongPassword, setWrongPassword] = useState("")
    const[newPassword, setNewPassword] = useState("")
    const[username, setUserNmae] = useState("")

    const navigation = useNavigation()

    async function completeNewSignUp(){
        try{
            Auth.signIn(username, password)
        .then(user => {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
            user,               // the Cognito User Object
            newPassword,       // the new password
            // OPTIONAL, the required attributes
            {
              email: 'xxxx@example.com',
              phone_number: '1234567890'
            }
        ).then(user => {
            // at this time the user is logged in if no MFA required
            console.log(user);
        }).catch(e => {
          console.log(e);
        });
    } else {
        // other situations
    }
        }).catch(e => {
            console.log(e);
        });

        }catch(e){

        }
    }

  return (
    <KeyboardAvoidingView
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
          
          <View>
          <View>
          <TextInput
              placeholder ="Enter your username"
              value={username}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
             onChangeText={text =>setUserNmae(text)}// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
         
              <TextInput
              placeholder ="Enter the new password"
              value={newPassword}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
              onChangeText={text =>setNewPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
              
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style = {styles.button}
            onPress={() =>
                navigation.navigate('RootNavigation', { screen: 'HomeScreen' })}
                >
                <Text style={styles.buttonText}>
                  Login
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
              
    </KeyboardAvoidingView>
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
    fontSize:17,
    fontWeight:'500'
  },
  resetTextContainer:{
    marginBottom:20,
    alignItems:'center',
    marginEnd:50,
    marginLeft:45
    

  }
  
  })


export default CompletePasswordResetSCreen