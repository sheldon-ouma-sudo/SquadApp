    import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Platform,} from 'react-native'
    import React, { useEffect } from 'react'
    import { useState } from 'react';
    import { auth } from '../firebase';
    import 'firebase/firestore';
    import firebase from '../firebase';
    import { useNavigation } from '@react-navigation/core';
    import { text } from '@fortawesome/fontawesome';


    const SignupScreen = () => {
    const [inputs, setInputs] = useState({email: '',username: '', password: '', confirmPassword:''});
    const [errors, setErrors] = useState({})

    //this checks for the uppercase on the password and special character
    function checkPassword(str){
    var re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(str);
    }          
    const validate = () =>{
        //email validation
        let valid = true;
        if(!inputs.email){
            handleError('Please input email', 'email')
            valid = false;
        }else if(!inputs.email.match(/\S+@\S+\.\S+/)){
            valid = false;
            handleError('Please enter a valid email address','email')
        }else if(inputs.email.indexOf(' ') >= 0){    
            valid = false;    
            handleError('Email cannot contain spaces', 'email');                          
        } else if(inputs.email.indexOf('@') <= 0){     
            valid = false;   
            handleError('Email is invald, please key in the valid key', 'email');                          
        } 
        //username validation 
        if(!inputs.username){
            valid = false;
            handleError('Please input username', 'username')
        }
        //password validation
        if(inputs.password.length<8){
            valid = false;
            handleError('the password should contain at least one special character and an uppercase letter', 'password')
        }else if(!checkPassword){
            valid = false;
            handleError("the password should contain at least one special character and an uppercase letter", 'password')
        }else if(!inputs.confirmPassword){
            valid = false;
            handleError("Please confirm the password please")
        }else if(inputs.confirmPassword!==inputs.password){
            valid = false;
            handleError()
        }
        if(valid){
            handleSignUp();
        }

    } 
    const handleOnChange =(text, input) =>{
        setInputs((prevState)=>({...prevState, [input]: text})) }
    const handleError =(errorMessage, input) => {
        setErrors(prevState => ({...prevState, [input]:errorMessage}))
    }

    //this is the import to enable the navigation 
    const navigation = useNavigation()

    //this function handles sign up
    const  handleSignUp=()=> {               
    auth.createUserWithEmailAndPassword(inputs.email.trim(), inputs.password)  
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
                    username
                })
            }catch(error){
                console.log(error)    
            }
        }          
    })
    .catch(error =>alert(error.message))

        //the puropose of the following is to ensure that when the user has logged in and registered they get navigated to the home page and so on 
    useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
            navigation.replace("PhoneOTPScreen")
        }
    })
    return unsubscribe //when we leave from this screen it is going to unsubscribe from this listener so that it does not keep pinging when it shouldn't 

    }, [])
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
        value={inputs.email}
        autoCapitalize='none'
        //textAlign = 'center'
        keyboardType="email-address"
        error={errors.email}
        onFocus={()=>{handleError(null, 'email')}}
        onChangeText={()=>handleOnChange(text, "email")}// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.input}
        />
        
        <TextInput
        placeholder ="Username"
        autoCapitalize='none'
        value={inputs.username}
        //textAlign = 'center'
        error={errors.username}
        onFocus={()=>{handleError(null, 'username')}}
        onChangeText={()=>handleOnChange(text, 'username')}// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
        style={styles.input}
        
        />
        
    <TextInput
        placeholder ="Password"
        value={inputs.password}
        //textAlign = 'center'
        onChangeText={()=>handleOnChange(text, 'password')}/// everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
        style={styles.input}
        secureTextEntry
        />

        <TextInput
        placeholder ="Confirm Password"
        value={inputs.confirmPassword}
        //textAlign = 'center'
        onChangeText={()=>handleOnChange(text, "confirmPassword")} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
        style={styles.input}
        secureTextEntry  
        />
    </View> 
    {/*this view contains our buttons */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={validate}
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
                <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginLeft:50}} />
                <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 12 }}>OR</Text>
                <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginRight:50}}/>
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
            <View >

        <View style={{backgroundColor: 'black', height: 1, width:350, marginTop:100}} />
                <Text style={[{marginTop:10}, {marginBottom:-80},{alignSelf:'center'}]}> 
                            English(United States)
                </Text>
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
    fontWeight:'600',
    marginRight:15,
    marginLeft:10,
    //fontFamily:"Montserrat-Regular",
    color:'#535353',
        
    },
    countryCodeInput:{
    backgroundColor: '#EAEAEA',
    marginTop:10,
    height:42,
    width:40,
    marginLeft:10,
    marginRight:12,
    paddingHorizontal:10    

    },
    phoneNumberInput:{
    backgroundColor: '#EAEAEA',
    marginTop:10,
    height:42,
    marginLeft:-175,
    marginRight:-10,
    paddingVertical:13,
    paddingHorizontal:12,
    width:100,
    color:'#535353',
    fontSize: 13,
    fontWeight:'400',


    },
    errorText:{
    color:'#FFFFF',
    marginLeft:20,
    fontSize:12,
    //textAlign:'center'


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
    fontSize: 12,
    textAlign: 'left',
    marginTop:10,
    marginBottom: 10,
    marginLeft:10,
    // alignItems:'left',
    //fontStyle: "Montserrat"


    },
    loginText:{
    fontSize: 14,
    marginTop: -40,
    marginBottom:10,
    marginLeft: 10,
    fontWeight:'bold',
    // fontStyle:"Montserrat"
    },
    horizontalLineContainer:{},
    googleLogo:{
    height: 30, 
    width:30,
    borderRadius:20,
    overflow:'hidden',
    borderWidth:1,
    borderColor: "red",
    marginLeft:220,
    marginTop:-5,
    marginRight:20

    },
    facebookLogo:{
    height: 30, 
    width:30,
    borderRadius:20,
    overflow:'hidden',
    borderWidth:1,
    borderColor: "red",
    marginRight:220,
    marginTop:-5
    },
    logo:{
    marginTop:37
    }
    })