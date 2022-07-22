import { View, Text } from 'react-native'
import React from 'react'

const EmailOTPScreen = () => {
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
          <View>
            <TextInput
                placeholder ="Enter Confirmtion Code"
              // value={email}
                autoCapitalize='none'
                textAlign = 'center'
                keyboardType="numeric"
                //onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                style={styles.input}
                />
          </View>
          <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            ///onPress={handleSignUp}
            style = {styles.button}
                >
                <Text style={styles.buttonText}>
                  Confirm
                </Text>
              </TouchableOpacity>
          </View>
          </View>

          <View style={[{flexDirection:"row"},styles.textContanier]}>
            <View style={[{flex:1},styles.textWrapper]}>
                <Text style={[{justifyContent: 'flex-start'},styles.confirmationText]} >  Didn't get the code?</Text>
            </View>
            <TouchableOpacity  onPress={() =>
            navigation.replace('EmailOTPScreen')}
            style={{flex:1}}>
                <Text  style={[{justifyContent: 'flex-end'},styles.confirmationText]}> Try with email </Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
)}

export default EmailOTPScreen