    import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native'
    import React, { useEffect } from 'react'
    import { useState } from 'react';
    import { auth } from '../firebase';
   // import auth from '@react-native-firebase/auth';
    import { useNavigation } from '@react-navigation/core';
    import { async } from '@firebase/util';
    import  * as Google from 'expo-auth-session/providers/google'
    import * as WebBrowswer from 'expo-web-browser'
    import * as Facebook from 'expo-facebook'
    //import  UserInfo  from 'firebase-admin/lib/auth/user-record';
    //import { GoogleSignin } from 'expo-google-sign-in';
   

    WebBrowswer.maybeCompleteAuthSession

    const LoginScreen = () => {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [initializing, setInitializing] = useState(true);
        const [user, setUser] = useState();
        const [accessToken, setAccessToken] = useState()
        const [userInfo, setUserInfo] = useState()
        const [isLoggedIn, setLoggedInStatus] = useState(false)
        const [userData, setUserData] = useState(null)
        const [isImageLoading, setImageLoadingStatus] = useState(false)
        const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '32488750865-mnucqr85cr6eca31439758a0rbggludq.apps.googleusercontent.com',
        iosClientId: '32488750865-fgokfk5e5lprc9uu2fd595iga5p79lp5.apps.googleusercontent.com', 
        expoClientId: "32488750865-uqnbfbv424n1feumrc3lrtu0q42q4140.apps.googleusercontent.com",           
        //scopes: ['profile', 'email']

        })

        useEffect(()=>{
            if(response?.type ==='success'){
                setAccessToken(response.authentication.accessToken)
            }

        }, [response]);
        async function getUserData(){
            let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers:{Authorization: `Bearer ${accessToken}`}
            })
            userInfoResponse.json().then(data =>{
                setUserInfo(data)
            });
        }


        function showUserInfo(){
            if(userInfo){
                return(
                <View style ={styles.userInfo}>
                    <Image source={{uri: userInfo.picture}}style = {styles.profilePic}/>
                    <Text>Welcome {userInfo.name}</Text>
                    <Text>Welcome {userInfo.email}</Text>
                </View>
                );
            }
        }
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

            const signWithFacebook =async () => {
            try{
                await Facebook.initializeAsync({
                    appId:'546453377226490',
                })
                const{ type, token } = await Facebook.logInWithReadPermissionsAsync({permissions:['public_profile'], })
             if(type === 'success'){
                //we are using the facebook graph api
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name, email, picture.height(500)`)
                .then(response=>response.json)
                .then(data =>{
                    setLoggedInStatus(true)
                    setUserData(data)
                })
                .catch(e=>console.log(e))
             }else{
             }

            }catch({message}){
                alert(`Facebook Login Error': ${message}`);
            }
            
            }
            logout = () =>{
                setLoggedInStatus(false)
                setUserData(null)
                setImageLoadingStatus(false)
            }


    //handle the login functionaility of the app
    const handleLogin = () =>{
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials =>{
            const user= userCredentials.user;
            console.log('Log in with ',user.email);
        
        })
        

    }
{/** GoogleSignin.configure({
    webClientId: "32488750865-3e277uia0ioeikisftl953t22fcsoqmg.apps.googleusercontent.com",
    });*/}
    
    {/**
    const  signInWithGoogleAsync = () => {
    alert('Signing in with Google!');
        const config = {
        //behavior: 'web',
        androidClientId: '32488750865-mnucqr85cr6eca31439758a0rbggludq.apps.googleusercontent.com',
        iosClientId: '32488750865-fgokfk5e5lprc9uu2fd595iga5p79lp5.apps.googleusercontent.com',            
        scopes: ['profile', 'email'],
        };    
    }
    */}





    
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
            placeholder ="Email address"
            value={email}
            //autoComplete='none'
            autoCapitalize='none'
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
                        <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginLeft:50}} />
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 12 }}>OR</Text>
                        <View style={{backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginRight:50}}/>
                    </View>

                    {/**this is the view with the google and the facebook icons */}
                <TouchableOpacity style= {[{flexDirection:"row"}, styles.logo]}>
                    {showUserInfo()}
                    <TouchableOpacity 
                    style= {{flex:1}}
                    title = {accessToken?"Get User Data": "Login"}
                    onPress={accessToken? getUserData:()  =>{promptAsync({showInRecents: true})}}
                    >
                        <Image
                        source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                        style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
                        //onPress={signInWithGoogleAsync}
                    
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style= {{fex:1}}
                    onPress={signWithFacebook}
                    >
                            <Image
                            source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                            style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                            >
                            </Image>
                    </TouchableOpacity>       
                </TouchableOpacity>

                {/**this is the forgot password functionality */}
                <TouchableOpacity style={{marginTop:20}}>
                    <Text 
                    onPress={() =>
                        navigation.navigate("AgeGenderLocationScreen")}
                    style={styles.forgotPasswordText}>
                        Forgot Password?
                    </Text> 
                </TouchableOpacity>
                
                    
                    
            {/**horizontal line at the botton of the page*/}
            <View style={{marginTop:140, marginBottom:-130}}>
            <View style={{backgroundColor: 'black', height: 1, width:350}} />
                <Text style={[{marginTop:10}, {alignSelf:'center'}]}> 
                            English(United States)
                </Text>
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
    squadLogo:{
        width:221,
        height:85


    },
    InputContainer:{
        width: 296,
        right: 16,
        marginLeft:29,
        marginTop: 20

    },
    input:{
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:5,
        width:296,
        height:32,
        marginTop:10,
        fontSize: 13,
        marginRight:15,
        marginLeft:10,
    // fontStyle:"Montserrat-Regular",
        color:'#535353',
        fontWeight:'400'
        

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
        marginTop: 40,
        alignItems: 'center',
        marginRight: 10,
        marginLeft:15,



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
    alignItems:'flex-start',
    //Style: "Montserrat-Regular",
    fontWeight:'600'


    },
    signUpText:{
        fontSize: 12.5,
        marginTop: 15,
        marginBottom:10,
        marginLeft: 10,
    // fontFamily:"Montserrat-Regular",
        fontWeight:"800"
    },
    horizontalLineContainer:{},
    googleLogo:{
    height: 30, 
    width:30,
    borderRadius:20,
    overflow:'hidden',
    borderWidth:1,
    borderColor: "red",
    marginLeft:160


    },
    facebookLogo:{
        height: 30, 
        width:30,
        borderRadius:20,
        overflow:'hidden',
        borderWidth:1,
        borderColor: "red",
        marginRight:160
    },
    forgotPasswordText:{

        marginTop:30,
        marginRight:150,
        marginLeft:120,
        marginRight:120,
        fontSize:12,
        fontWeight:"600"
    },
    logo:{
        marginTop:37
    }


    })