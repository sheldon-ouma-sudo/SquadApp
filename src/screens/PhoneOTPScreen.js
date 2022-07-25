        import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity} from 'react-native'
        import React from 'react'
        import { useNavigation } from '@react-navigation/core';
        import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
        import { initializeApp, getApp } from 'firebase/app';
        import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';



        const app = getApp();
        const auth = getAuth();

        // Double-check that we can run the example
        if (!app?.options || Platform.OS === 'web') {
        throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
        }


        const PhoneOTPScreen = () => {
        const navigation = useNavigation()

        // Ref or state management hooks
        const recaptchaVerifier = React.useRef(null);
        const [verificationId, setVerificationId] = React.useState();
        const [verificationCode, setVerificationCode] = React.useState();

        const firebaseConfig = app ? app.options : undefined;
        const [message, showMessage] = React.useState();
        const attemptInvisibleVerification = false;

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
              <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={app.options}
                  //attemptInvisibleVerification = true
                  />
                <TextInput
                    placeholder ="Enter Confirmtion Code"
                  // value={email}
                    autoCapitalize='none'
                    textAlign = 'center'
                    keyboardType="numeric"
                    //onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                    style={styles.input}
                    onChangeText={setVerificationCode}
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
                 }
                }
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
                    <Text  style={[{justifyContent: 'flex-end'},styles.confirmationText]}> Try with email </Text>
                </TouchableOpacity>
              </View>
        </KeyboardAvoidingView>
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
        fontStyle:"Montserrat",
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
        fontWeight:'500'
        }

        })