        import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image} from 'react-native'
        import React, { useEffect } from 'react'
        import PhoneInput from 'react-native-phone-input';
        import { useState } from 'react';
        import { auth } from '../firebase';
        import 'firebase/firestore';
        import firebase from '../firebase';


        import { useNavigation } from '@react-navigation/core';


        const SignupScreen = () => {
        //const [name, setName] = useState('')
        // const [nameError, setNameError] = useState("")
            const [email, setEmail] = useState('')
            const [emailError, setEmailError] = useState("")
            const [password, setPassword] = useState('')
            const [username, setUsername] = useState('')
            const [userNameError, setUserNameError] = useState('')
            const [phoneNumber, setPhone] = useState('')
            const [phoneNumberError, setPhoneNumberError] = useState('')
            const [passwordError, setPasswordError] = useState("")
            const [confirmPassword, setConfirmPassword] = useState('')
            const [confirmPasswordError, setConfirmPasswordError]= useState("")
        
        //this is the import to enable the navigation 
        const navigation = useNavigation()
        //the puropose of the following is to ensure that when the user has logged in and registered they get navigated to the home page and so on 
        useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace("SquadCreationScreen")
            }
        })
        return unsubscribe //when we leave from this screen it is going to unsubscribe from this listener so that it does not keep pinging when it shouldn't 

        }, [])

        //check the string if has a uppercase letter
        const isUpperCase = (string) => /^[A-Z]*$/.test(string)

        //check if the the string has is a valid number 
        function isNumeric(num){
            if(num.indexOf(" ")!=5 ||num.indexOf('-') !=9){
                return isNaNuN(num)
            }
            return !isNaN(num)
        }

        //this function handles sign up
        const handleSignUp = () => {
            //email address validation 
            var emailValid = false;
            if(email.length == 0){
                setEmailError("Email is required");
            }        
            else if(email.length < 6){
                setEmailError("Email should be minimum 6 characters");
            }      
            else if(email.indexOf(' ') >= 0){        
                setEmailError('Email cannot contain spaces');                          
            } else if(email.indexOf('@') <= 0){        
                setEmailError('Email is invald, please key in the valid key');                          
            }      
            else{
                setEmailError("")
                emailValid = true
            }
            //username validation 
            var userNameValid = false;
            if(email.length == 0){
                setUserNameError("Username is required");
            }        
            else if(username.length < 5){
                setUserNameError("username should be minimum 6 characters");
            }      
            else if(username.indexOf(' ') >= 0){        
                setUserNameError('username cannot contain spaces');                          
            }  
            else{
                setUserNameError("")
                userNameValid = true
            }
            
        
            //phone number validation
            var phoneNumberValid = false;
            if(phoneNumber.length == 0){
                setPhoneNumberError("Phone Number is required");
            }        
            else if(phoneNumber.length < 13){
                setPhoneNumberError("Incorrect phone number");
            }      
            else if(!isNumeric){        
                setPhoneNumberError('Please enter a valid phone number');                          
            }  
            else{
                setPhoneNumberError("")
                phoneNumberValid= true
            }
            //password validation 
            var passwordValid = false;
            if(password.length == 0){
                setPasswordError("Password is required");
            }        
            else if(password.length < 8){
                setPasswordError("Password should be minimum 8 characters");
            }      
            else if(password.indexOf(' ') >= 0){        
                setPasswordError('Password cannot contain spaces');                          
            }
            else if(password!=confirmPassword){
                setPasswordError('Password and confirm password do not match')

            }else if(password.indexOf('!')==-1|| password.indexOf('@')==-1||password.indexOf('#')==-1||password.indexOf('$')==-1||
            password.indexOf('%')==-1||password.indexOf('^')==-1||password.indexOf('&')==-1||
            password.indexOf('*')==-1||password.indexOf('(')==-1||password.indexOf(')')==-1||
            password.indexOf('-')==-1||password.indexOf('_')==-1||password.indexOf('+')==-1||
            password.indexOf('=')==-1||password.indexOf('{')==-1||password.indexOf('}')==-1||
            password.indexOf('|')==-1||password.indexOf('?')==-1||password.indexOf('<')==-1||
            password.indexOf('>')==-1||password.indexOf('.')==-1||password.indexOf('/')==-1||
            password.indexOf(',')==-1){
                setPasswordError('password should contain at least 1 special character')
            }else if(!isUpperCase(password)){
                setPasswordError('password must contain at least 1 uppercase letter')
            }
            
            else{
                setPasswordError("")
                passwordValid = true
            }        
            //confirm password validation 
            if(password!=confirmPassword){
                setConfirmPasswordError('Password and confirm password do not match')

            }
            if(emailValid && passwordValid&&userNameValid&&phoneNumberValid){            
                alert('Email: ' + email + '\nPassword: ' + password+ '\nPhone: ' + phoneNumber+ '\nusername: ' + username)
                setEmail("");
                setPassword("");
                setUsername("")
                setPhone("")
                

        auth
        .createUserWithEmailAndPassword(email.trim(), password)  
        //  .then((res) => {firebase.database().ref('users/' + res.user.uid).set({email: email,username: username, phoneNumber:phone,})})
        //once this is done, then create the user's credentials
        .then((user) =>{
            const firestore = firebase.firestore;
            const userRef = firestore().collection('users').doc(user.uid)
            //let's get the snapshot of the document 
            const snapShot = userRef.get()
            //if there is no snapshot or such document, then let's create one
            if(!snapShot.exists){
                try{
                    userRef.set({
                        email,
                        username,
                        phoneNumber,
                    })
                }catch(error){
                    console.log(error)
                    
                }
            
            }          

        })
        .catch(error =>alert(error.message))

        }

    }
        //function that handles the phone number part of the app
        const phoneFormat = (number) => {
            var match = number.match(/(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                let num = ['(', match[1], ') ', match[2], '-', match[3]].join('');
                setPhone(num);
                return;
            }
            setPhone(number);
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
                placeholder ="Email Address"
                value={email}
                autoCapitalize='none'
                keyboardType="email-address"
                onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                style={styles.input}
                />
                {emailError.length > 0 &&<Text style={styles.errorText}>{emailError} 
                </Text>}
                <TextInput
                placeholder ="Username"
                autoCapitalize='none'
                value={username}
                onChangeText={text =>setUsername(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                //secureTextEntry
                />
                {userNameError.length > 0 && <Text style={styles.errorText}>{userNameError}</Text>}
            <TextInput       
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={number => phoneFormat(number)}
                placeholder="Phone Number"
                style={styles.input}
                value={phoneNumber}
            />
                {userNameError.length > 0 && <Text style={styles.errorText}>{phoneNumberError}</Text>}
            <TextInput
                placeholder ="Password"
                value={password}
                onChangeText={text =>setPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                secureTextEntry
                />
                {passwordError.length > 0 && <Text style={styles.errorText}>{passwordError}</Text>}
                <TextInput
                placeholder ="Confirm Password"
                value={confirmPassword}
                onChangeText={text =>setConfirmPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                secureTextEntry
                />


            </View> 
            {/*this view contains our buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleSignUp}
                style = {styles.button}
                    >
                    <Text style={styles.buttonText}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
                    </View>
                    <TouchableOpacity  onPress={() =>
                            navigation.replace('LoginScreen')}
                            >
                                <Text  style={[{justifyContent: 'center'},styles.loginText]}> Login </Text>
                            </TouchableOpacity>
                        
                        {/*this is the straight line with the text in it*/}
                        <View style={[{flexDirection: 'row'}, styles.horizontalLineContainer]}>
                            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginLeft:70, flexDirection:"column"}} />
                            <Text style={{ alignSelf:'10', paddingHorizontal:5, fontSize: 10, marginBottom:50, flexDirection:"column" }}>OR</Text>
                            <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: '10', marginRight:60}} />
                        </View>

                        {/**this is the view with the google and the facebook icons */}
                        <View style= {[{flexDirection:"row"}, styles.logo]}>
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
            </KeyboardAvoidingView>
        )
        }
        export default SignupScreen

        const styles = StyleSheet.create({
        container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#F4F8FB"
        },
        squadLogo:{
            width:221,
            height:85


        },
        InputContainer:{
            width: 296,
            right: 16,
            marginLeft:29,
            marginTop: 20,
            borderRadius:5

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
        errorText:{
            color:'#FFFFF',
            marginLeft:20,
            fontSize:12,


        },
            buttonContainer:{
            width: 296,
            height:42,
            borderRadius:5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 23,
            marginBottom: 60
        },

        button:{
            backgroundColor: '#1145FD',
            width: 296,
            height: 42,
            padding: 15,
            borderRadius: 5,
            marginTop: -2,
            alignItems: 'center',
            marginRight: 10,
            marginLeft:15,
            top: 0


        },
        buttonText:{
            color: 'white',
            fontWeight: '700',
            fontSize: 12.5
            
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
        fontSize: 12,
        textAlign: 'left',
        marginTop:10,
        marginBottom: 10,
        marginLeft:10,
        alignItems:'left',
        fontStyle: "Montserrat"


        },
        loginText:{
            fontSize: 14,
            marginTop: -40,
            marginBottom:10,
            marginLeft: 10,
            fontWeight:'bold',
            fontStyle:"Montserrat"
        },
        horizontalLineContainer:{},
        googleLogo:{
        height: 30, 
        width:30,
        borderRadius:20,
        overflow:'hidden',
        borderWidth:1,
        borderColor: "red",
        marginLeft:180,
        marginTop:-5

        },
        facebookLogo:{
            height: 30, 
            width:30,
            borderRadius:20,
            overflow:'hidden',
            borderWidth:1,
            borderColor: "red",
            marginRight:170
        },
        logo:{
        marginTop:-37
        }
        })