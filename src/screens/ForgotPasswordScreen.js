import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { getAuth } from 'firebase/auth';


const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const[emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("")
  const[confirmationEmailOrPhone, setConfirmationEmairOrPhone] = useState("")

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/checkout?cartId=1234',
    // This must be true for email link sign-in.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.Squad',
    },
    android: {
      packageName: 'com.Squad',
      installApp: true,
      minimumVersion: '12',
    },
    // FDL custom domain.
    dynamicLinkDomain: 'coolapp.page.link',
  };

  const handleSendResetEmail =()=>{
  getAuth()
  .generatePasswordResetLink(emailOrPhoneNumber, actionCodeSettings)
  .then((link) => {
    // Construct password reset email template, embed the link and send
    // using custom SMTP server.
    return sendCustomPasswordResetEmail(userEmail, displayName, link);
  })
  .catch((error) => {
    // Some error occurred.
  });
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
          <TextInput
              placeholder ="Enter Email or Phone Number"
              value={emailOrPhoneNumber}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
             onChangeText={text =>setEmailOrPhoneNumber(text)}// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
              <TextInput
              placeholder ="Confirm Email or Phone Number"
              value={confirmationEmailOrPhone}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
              onChangeText={text =>setConfirmationEmairOrPhone(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
        </View>
        <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style = {styles.button}
          onPress={() =>
            navigation.navigate('PasswordResetScreen')}
              >
              <Text style={styles.buttonText}>
                Send Link
              </Text>
            </TouchableOpacity>
        </View>
        </View>

        <View style={[{flexDirection:"row"},styles.textContanier]}>
          <TouchableOpacity style={[styles.textWrapper]}
          onPress={() =>navigation.navigate('LoginScreen')}
          >
              <Text style={[{justifyContent: 'center'},styles.navigationText]} >  Return to Sign In</Text>
          </TouchableOpacity>
          
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
  padding: 15,
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
  fontSize: 12.5
  
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
  
}

})
export default ForgotPasswordScreen