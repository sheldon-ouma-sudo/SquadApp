import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native'
    import React, { useEffect } from 'react'
    import { useState } from 'react';
    import { auth } from '../firebase';

    import { LinearGradient } from 'expo-linear-gradient';
    import { useNavigation } from '@react-navigation/core';



const SignupScreen = () => {

    //this function handles sign up
    const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email,password)  
    //once this is done, then create the user's credentials
    .then(userCredentials =>{
       const user= userCredentials.user;
       console.log('sign up with ',user.email);
    })
    .catch(error =>alert(error.message))
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

        <View style={styles.InputContainer}>
        <TextInput
            placeholder ="Phone number, email address, or username"
            value={email}
            onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
            style={styles.input}
            />
            <TextInput
            placeholder ="Password"
            value={password}
            onChangeText={text =>setPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
            style={styles.input}
            secureTextEntry
            />
        </View> 
        {/*this view contains our buttons */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleLogin}
            style = {styles.button}
                >
                <Text style={styles.buttonText}>
                    Login
                </Text>

            </TouchableOpacity>

            
                {/* <Text>Item to give cash credit for:</Text>*/}
                    <View style={[{flexDirection:"row"},styles.signUpContanier]}>
                        <View style={[{flex:1},styles.textWrapper]}>
                            <Text style={[{justifyContent: 'flex-start'},styles.text]} >  Don't have an account?</Text>
                        </View>
                        <TouchableOpacity  onPress={() =>
                        navigation.replace('SignupScreen')}
                        style={{flex:1}}>
                            <Text  style={[{justifyContent: 'flex-end'},styles.signUpText]}> SignUp </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    {/*this is the straight line with the text in it*/}
                    <View style={[{flexDirection: 'row'}, styles.horizontalLineContainer]}>
                        <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginLeft:70, flexDirection:"column"}} />
                        <Text style={{ alignSelf:'10', paddingHorizontal:5, fontSize: 10, marginBottom:50, flexDirection:"column" }}>OR</Text>
                        <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginRight:60}} />
                    </View>

                    {/**this is the view with the google and the facebook icons */}
                <View style= {{flexDirection:"row"}}>
                    <View style= {{flex:1}}>
                        <Image
                        source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                        style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
                        ></Image>
                    </View>
                    <View style= {{fex:1}}>
                            <Image
                            source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                            style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                            >
                            </Image>
                    </View>       
                </View>

                {/**this is the forgot password functionality */}
                <View style={styles.forgotPasswordTextContainer}>
                    <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                    </Text>

                </View>




        </KeyboardAvoidingView>
  )
}

export default SignupScreen