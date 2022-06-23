import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'


const LoginScreen = () => {
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.InputContainer}>
       <TextInput
         placeholder ="Email"
         //value={}
        // onChangeText={text =>} // everytime a text changes in our variable it spits out a text variable which we can then use in our function to change the text variable

        />
        <TextInput
         placeholder ="Password"
         //value={}
        // onChangeText={text =>} // everytime a text changes in our variable it spits out a text variable which we can then use in our function to change the text variable
         style={styles.input}
         secureTextEntry
        />
    </View> 
    {/*this view contains our buttons */}
    <View  style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={()=>{}}
            style = {styles.button}
            >
            <Text style={styles.button}>
                Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{}}
            style = {[styles.button, styles.buttonOutline]}
            >
            <Text style={styles.buttonOutlineText}>
                SignUp
            </Text>
        </TouchableOpacity>


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

 

}



})