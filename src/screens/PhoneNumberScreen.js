import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneNumberScreen = () => {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);
    const buttonPress = () => {
        Alert.alert(phoneNumber);
      };
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
            <View style={styles.container}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    layout="first"
                    withShadow
                    autoFocus
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInput}
                    onChangeFormattedText={text => {
                    setphoneNumber(text);
                    }}
                />
            <Pressable style={styles.button} onPress={() => buttonPress()}>
                <Text style={styles.continueText}>Get Phone Number</Text>
            </Pressable>
    </View>
      </KeyboardAvoidingView>
    
  )
}


const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#F4F8FB"
    },
    squadLogo:{
        width:221,
        height:85,
        marginBottom:30
    },
    phoneContainer: {
        width: '75%',
        height: 50,
      },
      button: {
        marginTop: 30,
        width: '75%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      },
      textInput: {
        paddingVertical: 0,
      },  
})
export default PhoneNumberScreen