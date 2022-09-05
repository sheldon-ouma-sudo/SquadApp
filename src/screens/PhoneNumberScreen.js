import { width } from '@mui/system';
import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Image,  Platform,} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import PhoneOTPScreen from './PhoneOTPScreen';



// Firebase references
const app = getApp();
const auth = getAuth();
// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
  }
  
function PhoneNumberScreen(props) {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);
    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = React.useState();
    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;
    const buttonPress = async() => {
        Alert.alert(phoneNumber);
        console.log(phoneNumber)
        // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            console.log(verificationId)
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
          props.navigate(PhoneOTPScreen, {"verificationId":verificationId})
      };
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
            <View style={styles.phoneNumText}>
                <Text style={styles.enterNumText}>Enter Your Phone Number</Text>
            </View>
            <View>
            <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={app.options}
                    // attemptInvisibleVerification
                />
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    withShadow
                    autoFocus
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInput}
                    onChangeFormattedText={text => {
                    setphoneNumber(text);
                    }}
                />
            <Pressable style={styles.button} onPress={() => buttonPress()}>
                <Text style={styles.continueText}>Continue</Text>
            </Pressable>
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
        marginBottom:50
    },
    phoneNumText:{
        marginBottom:20,
      
    },
    enterNumText:{
        fontSize:18,
        fontWeight:'600',
        color:'#1145FD'

      
    },
    phoneContainer: {
        width: '75%',
        height: 50,
        marginBottom:210,
        borderRadius:10,
        marginLeft:100
        
    
      },
      button: {
        marginTop: -190,
        width: '75%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1145FD',
        marginLeft:100,
        marginRight:100,
        borderRadius:5 , 
        marginBottom:180,
        width:320,
        
      },
      textInput: {
        paddingVertical: 0,
       
      },  
      continueText:{
        color:"white"
      }
})
export default PhoneNumberScreen