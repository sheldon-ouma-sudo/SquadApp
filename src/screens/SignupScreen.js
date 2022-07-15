        import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image} from 'react-native'
        import React, { useEffect } from 'react'
        import { useState } from 'react';
        import { auth } from '../firebase';
        import 'firebase/firestore';
        import firebase from '../firebase';
        

        import { useNavigation } from '@react-navigation/core';


        const SignupScreen = () => {
            const [name, setName] = useState('')
            const [email, setEmail] = useState('')
            const [password, setPassword] = useState('')
            const [username, setUsername] = useState('')
            const [phoneNumber, setPhone] = useState('')
            //const [confirmPassword, setConfirmPassword] = useState('')
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

        }, [])

        //this function handles sign up
        const handleSignUp = () => {
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
                        name,
                        email,
                        username,
                        phoneNumber,
                    })
                }catch(error){
                    console.log(error)
                    
                }
            
            }
            
            //let's check if there is the user document already 
            

        })
       // .then(userCredentials =>{  const user= userCredentials.user;
          //  console.log('sign up with ',user.email);})
        



        .catch(error =>alert(error.message))
    // createUserDocument(user, {username, phone,})
        }
        //handle the login functionaility of the app
        {/** 
        const handleLogin = () =>{
            auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials =>{
                const user= userCredentials.user;
                console.log('Log in with ',user.email);
            
            })   

        }
        */}
        //function that handles the phone number part of the app
        //handle the formatPhoneNumber and error that props from the setState
        this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
        formatPhoneNumber = (phoneNumber) => {
            let newText = '';
            let clear= (''+phoneNumber).replace(/\D/g, '');
            for(var i= 0; i<clear.length; i++){
                if(i==0){
                    newText= '('

                }else if(i==3){
                    newText= newText + ') '
                }else{
                    newText=newText + '-'
                }
                newText = newText + clear[i];
            }

            this.setState({phoneNumber:newText})

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
                placeholder ="name"
                value={name}
                onChangeText={text => setName(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                style={styles.input}
                />
            <TextInput
                placeholder ="email address"
                value={email}
                onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                style={styles.input}
                />
                <TextInput
                placeholder ="username"
                value={username}
                onChangeText={text =>setUsername(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                //secureTextEntry
                />

            <TextInput
                placeholder ="phone number"
                value={phoneNumber}
                onChangeText={Number => this.formatPhoneNumber(Number)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
            // secureTextEntry
                />

            <TextInput
                placeholder ="Password"
                value={password}
                onChangeText={text =>setPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                secureTextEntry
                />
                {/** 
             <TextInput
                placeholder ="confirm password"
                value={confirmPassword}
                onChangeText={text =>setConfirmPassword(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                secureTextEntry
                />
    */}

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
            height:32,
            marginTop:10,
            fontSize: 12,
            marginRight:15,
            marginLeft:10,
            fontStyle:"Montserrat",
            color:'#535353',
            fontWeight:'600'
            

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
            marginTop: 20,
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
        fontSize: 10,
        textAlign: 'left',
        marginTop:10,
        marginBottom: 10,
        marginLeft:10,
        alignItems:'left',
        fontStyle: "Montserrat"


        },
        loginText:{
            fontSize: 10,
            marginTop: -30,
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
        marginLeft:180

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