import { View, Text } from 'react-native'
import React from 'react'


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
    <View>
      <Text>SignUpScreen</Text>
    </View>
  )
}

export default SignupScreen