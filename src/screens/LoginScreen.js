import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


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
        style={styles.input}
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
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
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
},
InputContainer:{
    width: '80%'
},
input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:10,
    marginTop: 5,
    

},
buttonContainer:{
width: '60%',
justifyContent: 'center',
alignItems: 'center',
marginTop: 40

},
button:{
    backgroundColor: '#1145FD',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'


},
buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16
    
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
}



})