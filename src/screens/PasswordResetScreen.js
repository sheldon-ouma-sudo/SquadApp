import { View, Text, KeyboardAvoidingView,StyleSheet, Image,TouchableOpacity, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';

const PasswordResetScreen = () => {
  const[newPassword, setNewPassowrd]=useState("")
  const[confirmNewPassword, setConfirmNewPassowrd] = useState("")
  const[verificationCode, setVerificationCode] = useState("")


  const navigation = useNavigation()
  const route = useRoute();
   
  const {username} = route?.params.username || {}
  async function resetPassword(){
    try{
      Auth.forgotPasswordSubmit(username, verificationCode, newPassword)
      .then(data => console.log(data))
      console.log('✅ Reset Password Confirmed');
      navigation.navigate()
    }catch(error){
      console.log('❌ Error sending the email...', error);

    }
  }
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
              Your verification code has been sent to your email. Please check and enter your verification code and reset your password below.    
            </Text> 
          </View>
          <View>
          <View>
          <TextInput
              placeholder ="Enter the verification code"
              value={verificationCode}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
             onChangeText={text =>setVerificationCode(text)}// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
              <TextInput
              placeholder ="Enter the new password"
              value={newPassword}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
              onChangeText={text =>setNewPassowrd(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
               <TextInput
              placeholder ="Confirm the new password"
              value={confirmNewPassword}
              autoCapitalize='none'
              textAlign = 'center'
              //keyboardType="numeric"
              onChangeText={text =>setConfirmNewPassowrd(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
              style={styles.input}
              />
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style = {styles.button}
            onPress={() =>
              navigation.navigate('LoginScreen')}
                >
                <Text style={styles.buttonText}>
                  Reset Password
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
export default PasswordResetScreen