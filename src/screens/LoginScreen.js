import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth } from '../firebase';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/core';


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
//this is the import to enable the navigation 
const navigation = useNavigation()
//the puropose of the following is to ensure that when the user has logged in and registered they get navigated to the home page and so on 
useEffect(()=>{
const unsubscribe = auth.onAuthStateChanged(user =>{
    if(user){
        navigation.replace("HomeScreen")
    }
})
return unsubscribe //when we leave from this screen it is going to unsubscribe from this listener so that it does not keep pinging when it shouldn't 

}, {})




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
//handle the login functionaility of the app
const handleLogin = () =>{
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials =>{
        const user= userCredentials.user;
        console.log('Log in with ',user.email);
       
     })
    

}

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
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
                <View style={{flexDirection:"row"}}>
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
                <View style={[{flexDirection: 'row'}, styles.horizontalLineContainer]}>
                    <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginLeft:50, flexDirection:"column"}} />
                    <Text style={{ alignSelf:'10', paddingHorizontal:5, fontSize: 10, marginBottom:50, flexDirection:"column" }}>OR</Text>
                    <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginRight:80}} />
            </View>
    </KeyboardAvoidingView>
  )
}





export default LoginScreen

const styles = StyleSheet.create({
container:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor: "#F4F8FB"
},
InputContainer:{
    width: 296,
    right: 16

},
input:{
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:5,
    width:296,
    height:32,
    marginTop:10,
    fontSize: 12,
    fontStyle:"Montserrat",
    color:'#535353'
    

},
buttonContainer:{
width: 296,
height:42,
borderRadius:5,
justifyContent: 'center',
alignItems: 'center',
marginTop: 10,
marginBottom: 60


},
button:{
    backgroundColor: '#1145FD',
    width: 296,
    height: 42,
    padding: 15,
    borderRadius: 5,
    marginTop: 40,
    alignItems: 'center',
    right: 20,
    top: 0


},
buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 10
    
},
buttonOutline:{
 backgroundColor: 'white',
 marginTop: 5,
 borderColor: '#1145FD',
 borderWidth: 2,


},
buttonOutlineText:{
    color: '#1145FD',
    fontWeight: '700',
    fontSize: 16
},
textWrapper:{
    textAlign:'left',
    marginTop:5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start'

},

text:{
fontSize: 10,
textAlign: 'left',
marginTop:10,
marginBottom: 10,
alignItems:'left',
fontStyle: "Montserrat"


},
signUpText:{
    fontSize: 10,
    marginTop: 15,
    marginBottom:10,
    fontStyle:"Montserrat"
},



})