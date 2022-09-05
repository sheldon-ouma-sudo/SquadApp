    import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useNavigation } from '@react-navigation/core';
    import { useRoute } from '@react-navigation/native';
    import RNOtpVerify from 'react-native-otp-verify';
    import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
    
    
    

  const PhoneOTPScreen = (props) => {
    //const navigation = useNavigation()
   // const route = useRoute();
    const [otp, setOtp] = useState("")
   //const verificationId = props.navigation.getParam(verificationId)
    //console.log('route', verificationId)
    //const verificationId = "dummy"
    //route.params.verificationId 
   // console.log(route.params)
    
    useEffect(()=>{
      RNOtpVerify.getHash()
    .then(console.log)
    .catch(console.log);
    startListeningForOtp = () =>

    RNOtpVerify.getOtp()
    .then(p => RNOtpVerify.addListener(otpHandler))
    .catch(p => console.log(p));

    const otpHandler = (message) => {
    const otp = /(\d{4})/g.exec(message)[1];
    setOtp(otp);
      }

  
    //return ()=>RNOtpVerify.removeListener();{
      //effect
    },[])

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
              <View>
                <TextInput
                    placeholder ="Enter Confirmtion Code"
                  // value={email}
                    autoCapitalize='none'
                    textAlign = 'center'
                    keyboardType="numeric"
                    onChangeText={setVerificationCode} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                    style={styles.input}
                    />
              </View>
              <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={async () => {
                  try {
                    const credential = PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                    await signInWithCredential(auth, credential);
                    showMessage({ text: 'Phone authentication successful 👍' });
                  } catch (err) {
                    showMessage({ text: `Error: ${err.message}`, color: 'red' });
                  }
                  navigation.navigate('AgeGenderLocationScreen')
                }}
                style = {styles.button}
                    >
                    <Text style={styles.buttonText}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
              </View>
              </View>

              <View style={[{flexDirection:"row"},styles.textContanier]}>
                <View style={[{flex:1},styles.textWrapper]}>
                    <Text style={[{justifyContent: 'flex-start'},styles.confirmationText]} >  Didn't get the code?</Text>
                </View>
                <TouchableOpacity  onPress={() =>
                navigation.replace('EmailOTPScreen')}
                style={{flex:1}}>
                    <Text  style={[{justifyContent: 'flex-end'},styles.confirmationText, {marginTop:5}]}> Try with email </Text>
                </TouchableOpacity>
              </View>
        </View>
      )
    }

    export default PhoneOTPScreen


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
    confirmationText:{
      fontWeight:'500',
      
    }

    })