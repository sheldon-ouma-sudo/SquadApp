  import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity} from 'react-native'
  import React from 'react'
  import { useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import { useRoute } from '@react-navigation/native';
  import { Auth, API, graphqlOperation } from 'aws-amplify';
  import { createSquad } from '../graphql/mutations';
  import { Hub } from 'aws-amplify';

  const EmailOTPScreen = () => {
  //const [userName, setUserName] = useState('');
  const [authCode, setAuthCode] = useState('');

  const navigation = useNavigation()
  const route = useRoute();
   
  const username = route?.params.username 
  //If authentication was successful, the event will contain CognitoUser in data object. If auto sign in failed, it will dispatch autoSignIn_failure event.
  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
        const { event } = payload;
        if (event === 'autoSignIn') {
            const user = payload.data;
            // assign user
        } else if (event === 'autoSignIn_failure') {
            // redirect to sign in page
        }
    })
}

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode)
      //await Auth.confirmSignUp(username, authCode);
      navigation.navigate("AgeGenderLocationScreen");
      listenToAutoSignInEvent() 
      navigation.navigate("AgeGenderLocationScreen");
    }catch(error){
      console.log('unsuccessful verification',error)
    }
  }

  async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}
    //const navigation = useNavigation()
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
                  placeholder ="Enter the confirmation code"
                  value={authCode}
                  autoCapitalize='none'
                  textAlign = 'center'
                  keyboardType="numeric"
                  onChangeText={text => setAuthCode(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                  style={styles.input}
                  />

                  {/**<Text>username:{route.params.username}</Text> */}
            </View>
            <View>
              <View style={styles.buttonContainer}>
              <TouchableOpacity
              onPress={confirmSignUp}
              style = {styles.button}
                  >
                  <Text style={styles.buttonText}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[{flexDirection:"row"},styles.textContanier]}>
              <TouchableOpacity 
              onPress={() =>
                navigation.replace('SignupScreen')}
              style={[{flex:1},styles.textWrapper]}>
                  <Text style={[{justifyContent: 'flex-start'},styles.confirmationText]} >  Wrong Email?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1}}>
                  <Text 
                   style={[{justifyContent: 'flex-end'},styles.confirmationText,{marginTop:5}]}
                   onPress={resendConfirmationCode}
                  >
                     Re-send confimation 
                  </Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
  )}

  export default EmailOTPScreen

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
    marginLeft:90,
    marginRight:20,
    marginTop:-280,
    marginBottom:300   
  },
  confirmationText:{
    fontWeight:'500',
    marginRight:40,
    marginLeft:-20,
  }

  })