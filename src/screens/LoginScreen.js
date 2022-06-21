import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'


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

        />
    </View>
    
    <Text>LoginScreen</Text>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})