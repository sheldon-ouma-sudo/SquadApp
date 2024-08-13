import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import 'firebase/firestore';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { FontAwesome } from '@expo/vector-icons';

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

    const navigation = useNavigation();

    function checkPassword(str) {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(str);
    }

    async function signUpWithAws() {
        try {
            await Auth.signUp({
                email,
                name,
                username,
                password,
                attributes: { name, email, preferred_username: username },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log('✅ Sign-up Confirmed');

            navigation.navigate('EmailOTPScreen', { username: username });
        } catch (error) {
            console.log('Error signing up, check your network and try again', error);
        }
    }

    const handleSignUp = async () => {
        var emailValid = false;
        if (email.length == 0) {
            setEmailError("Email is required");
        } else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        } else if (email.indexOf(' ') >= 0) {
            setEmailError('Email cannot contain spaces');
        } else if (email.indexOf('@') <= 0) {
            setEmailError('Email is invalid, please key in the valid key');
        } else {
            setEmailError("");
            emailValid = true;
        }

        var userNameValid = false;
        if (username.length == 0) {
            setUserNameError("Username is required");
        } else if (username.length < 5) {
            setUserNameError("Username should be minimum 6 characters");
        } else if (username.indexOf(' ') >= 0) {
            setUserNameError('Username cannot contain spaces');
        } else {
            setUserNameError("");
            userNameValid = true;
        }

        var passwordValid = false;
        if (password.length == 0) {
            setPasswordError("Password is required");
        } else if (password.length < 8) {
            setPasswordError("Password should be minimum 8 characters");
        } else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password cannot contain spaces');
        } else if (password !== confirmPassword) {
            setPasswordError('Password and confirm password do not match');
        } else if (!checkPassword(password)) {
            setPasswordError("The password should contain at least one special character and an uppercase letter");
        } else {
            setPasswordError("");
            passwordValid = true;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Password and confirm password do not match');
        }

        if (emailValid && passwordValid && userNameValid) {
            setEmail("");
            setPassword("");
            setUsername("");

            auth.createUserWithEmailAndPassword(email.trim(), password)
                .then((user) => {
                    const firestore = firebase.firestore;
                    const userRef = firestore().collection('users').doc(user.uid);
                    const snapShot = userRef.get();
                    if (!snapShot.exists) {
                        try {
                            userRef.set({
                                email,
                                username,
                                phoneNumber,
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
                .catch(error => alert(error.message));
        }

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    navigation.replace("PhoneOTPScreen");
                }
            });
            return unsubscribe;
        }, []);
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
                />
            </View>
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    autoCapitalize='none'
                    keyboardType="email-address"
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email Address"
                    value={email}
                    autoCapitalize='none'
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                {emailError.length > 0 && <Text style={[styles.errorText, { color: 'red' }]}>{emailError}</Text>}
                <TextInput
                    placeholder="Username"
                    autoCapitalize='none'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                {userNameError.length > 0 && <Text style={[styles.errorText, { color: 'red' }]}>{userNameError}</Text>}

                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry={passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                {passwordError.length > 0 && <Text style={[styles.errorText, { color: 'red' }]}>{passwordError}</Text>}

                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        style={styles.input}
                        secureTextEntry={confirmPasswordVisible}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <FontAwesome name={confirmPasswordVisible ? 'eye-slash' : 'eye'} size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                {confirmPasswordError.length > 0 && <Text style={[styles.errorText, { color: 'red' }]}>{confirmPasswordError}</Text>}

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={signUpWithAws}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() =>
                navigation.replace('LoginScreen')}
            >
                <Text style={[{ justifyContent: 'center' }, styles.loginText]}> Login </Text>
            </TouchableOpacity>

            <View style={[{ flexDirection: 'row' }, styles.horizontalLineContainer]}>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginLeft: 50 }} />
                <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 12 }}>OR</Text>
                <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center', marginRight: 50 }} />
            </View>

            <View style={[{ flexDirection: "row" }, styles.logo]}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                        style={[{ justifyContent: 'flex-start' }, styles.googleLogo]}
                    />
                </View>
                <View style={{ fex: 1 }}>
                    <Image
                        source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                        style={[{ justifyContent: 'flex-end' }, styles.facebookLogo]}
                    />
                </View>
            </View>
            <View>
                <View style={{ backgroundColor: 'black', height: 1, width: 350, marginTop: 100 }} />
                <Text style={[{ marginTop: 10 }, { marginBottom: -80 }, { alignSelf: 'center' }]}>
                    English (United States)
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F8FB"
    },
    squadLogo: {
        width: 221,
        height: 85
    },
    InputContainer: {
        width: 296,
        right: 16,
        marginLeft: 29,
        marginTop: 20,
        borderRadius: 5
    },
    input: {
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        width: 296,
        height: 42,
        marginTop: 10,
        fontSize: 13,
        fontWeight: '600',
        marginRight: 15,
        marginLeft: 10,
        color: '#535353',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F4F8FB",
        borderRadius: 5,
        width: 296,
        height: 42,
        marginTop: 12,
    },
    // iconContainer: {
    //     padding: 5,
    //     marginRight: 20,
    // },
    errorText: {
        color: '#FFFFF',
        marginLeft: 20,
        fontSize: 12,
        fontWeight: '600'
    },
    buttonContainer: {
        width: 196,
        height: 42,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 23,
        marginBottom: 60
    },
    button: {
        backgroundColor: '#1145FD',
        width: 296,
        height: 42,
        padding: 15,
        borderRadius: 5,
        marginTop: -2,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 15,
        top: 0
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#1145FD',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#1145FD',
        fontWeight: '700',
        fontSize: 16
    },
    textWrapper: {
        textAlign: 'left',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 12,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: '#535353',
    },
    loginText: {
        fontSize: 14,
        marginTop: -40,
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    horizontalLineContainer: {},
    googleLogo: {
        height: 30,
        width: 30,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "red",
        marginLeft: 220,
        marginTop: -5,
        marginRight: 20
    },
    facebookLogo: {
        height: 30,
        width: 30,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "red",
        marginRight: 220,
        marginTop: -5
    },
    logo: {
        marginTop: 37
    }
});

export default SignupScreen;
