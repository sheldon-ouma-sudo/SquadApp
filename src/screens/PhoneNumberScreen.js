import { width } from '@mui/system';
import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Image} from 'react-native';
import PhoneInput from 'react-native-phone-number-input'
import auth from '@react-native-firebase/auth';

function PhoneNumberScreen(props) {
    const [phoneNumber, setphoneNumber] = useState('');
    const [confirmationCode, setConfirmationCode]= useState(null)
    const phoneInput = useRef(null);
    
    const sendConfirmation = async() =>{
        props.navigation.navigate()
    }

    const buttonPress = () => {
        Alert.alert(phoneNumber);
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