    import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity, Keyboard} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useNavigation } from '@react-navigation/core';
    import { useRoute } from '@react-navigation/native';
    import { initializeApp, getApp } from 'firebase/app';
    import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
    
    
const app = getApp();
const auth = getAuth();

  const PhoneOTPScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [verificationCode, setVerificationCode] = useState("")
    const [verificationId, setVerificationId] = useState("")
   //const verificationId = props.navigation.getParam(verificationId)
    //console.log('route', verificationId)
    //const verificationId = "dummy"
    //route.params.verificationId 
   // 
   
//whenever it changes it to is not null
      useEffect(()=>{ 
        const verificationId = route.params?.verificationId
        console.log(route.params)
        //console.log(verificationId)
      if(verificationId!==null){
        setVerificationCode(verificationId)
        setVerificationId(verificationId)
      }

      },
      [route.params?.verificationId])
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
                    value={verificationId}
                    autoCapitalize='none'
                    textAlign = 'center'
                    keyboardType="numeric"
                   // onChangeText={setVerificationCode} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                    style={styles.input}
                    />
              </View>
              <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                //onPress={async () => {
                //  try {
                  //  const credential = PhoneAuthProvider.credential(
                   //   verificationId,
                    //</View>  verificationCode
                   // );
                   // await signInWithCredential(auth, credential);
                    //console.log('Phone authentication successful 👍')
                   //navigation.navigate('AgeGenderLocationScreen')
                   // showMessage({ text: 'Phone authentication successful 👍' });
                 // } catch (err) {
                 //   console.log(err.message)
                    //showMessage({ text: `Error: ${err.message}`, color: 'red' });
                 // }
                  
               // }}
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